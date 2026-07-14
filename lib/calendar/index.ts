import { google } from 'googleapis';
import { getDb } from '../db';
import { schema } from '../db/schema';
import { eq } from 'drizzle-orm';
import { encrypt, decrypt } from '../crypto';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`
);

export async function getGoogleAuthUrl(userId: string): Promise<string> {
  const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.events.owned',
    ],
    state,
    prompt: 'consent',
  });
}

export async function handleGoogleCallback(code: string, state: string) {
  const { userId } = JSON.parse(Buffer.from(state, 'base64').toString());
  
  const { tokens } = await oauth2Client.getToken(code);
  
  const encryptedTokens = encrypt(JSON.stringify(tokens));
  const db = await getDb();
  
  await db.update(schema.users)
    .set({
      googleTokens: encryptedTokens,
      googleCalendarConnected: true,
    })
    .where(eq(schema.users.id, userId));
  
  return { success: true };
}

export async function getCalendarClient(userId: string) {
  const db = await getDb();
  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
    columns: { googleTokens: true, googleCalendarConnected: true },
  });

  if (!user?.googleCalendarConnected || !user.googleTokens) {
    throw new Error('Google Calendar not connected');
  }

  const tokens = JSON.parse(decrypt(user.googleTokens as string));
  
  oauth2Client.setCredentials(tokens);
  
  // Check if token needs refresh
  if (tokens.expiry_date && tokens.expiry_date < Date.now() + 5 * 60 * 1000) {
    const { credentials } = await oauth2Client.refreshAccessToken();
    const encrypted = encrypt(JSON.stringify(credentials));
    
    await db.update(schema.users)
      .set({ googleTokens: encrypted })
      .where(eq(schema.users.id, userId));
    
    oauth2Client.setCredentials(credentials);
  }

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export interface CalendarEventData {
  summary: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  attendees?: Array<{ email: string }>;
  reminders?: {
    useDefault: boolean;
    overrides: Array<{ method: 'email' | 'popup'; minutes: number }>;
  };
  conferenceData?: boolean;
}

export async function createCalendarEvent(
  userId: string,
  eventData: CalendarEventData
): Promise<string | null> {
  try {
    const calendar = await getCalendarClient(userId);
    
    const event = {
      summary: eventData.summary,
      description: eventData.description,
      location: eventData.location,
      start: {
        dateTime: eventData.startTime.toISOString(),
        timeZone: eventData.timezone,
      },
      end: {
        dateTime: eventData.endTime.toISOString(),
        timeZone: eventData.timezone,
      },
      attendees: eventData.attendees,
      reminders: eventData.reminders || {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 },
          { method: 'email', minutes: 1440 }, // 24 hours
        ],
      },
      conferenceData: eventData.conferenceData ? {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      } : undefined,
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: eventData.conferenceData ? 1 : 0,
      sendUpdates: 'all',
    });

    return response.data.id || null;
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    return null;
  }
}

export async function updateCalendarEvent(
  userId: string,
  eventId: string,
  eventData: Partial<CalendarEventData>
): Promise<boolean> {
  try {
    const calendar = await getCalendarClient(userId);
    
    const event: any = {};
    if (eventData.summary) event.summary = eventData.summary;
    if (eventData.description) event.description = eventData.description;
    if (eventData.location) event.location = eventData.location;
    if (eventData.startTime) event.start = { dateTime: eventData.startTime.toISOString(), timeZone: eventData.timezone };
    if (eventData.endTime) event.end = { dateTime: eventData.endTime.toISOString(), timeZone: eventData.timezone };
    if (eventData.attendees) event.attendees = eventData.attendees;

    await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      requestBody: event,
      sendUpdates: 'all',
    });

    return true;
  } catch (error) {
    console.error('Failed to update calendar event:', error);
    return false;
  }
}

export async function deleteCalendarEvent(userId: string, eventId: string): Promise<boolean> {
  try {
    const calendar = await getCalendarClient(userId);
    
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all',
    });

    return true;
  } catch (error) {
    console.error('Failed to delete calendar event:', error);
    return false;
  }
}

export async function getCalendarEvents(
  userId: string,
  timeMin: Date,
  timeMax: Date
) {
  try {
    const calendar = await getCalendarClient(userId);
    
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
    return [];
  }
}

export async function disconnectCalendar(userId: string): Promise<void> {
  const db = await getDb();
  await db.update(schema.users)
    .set({
      googleTokens: null,
      googleCalendarConnected: false,
    })
    .where(eq(schema.users.id, userId));
}

export function generateICS(eventData: CalendarEventData): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const uid = `booking-${Date.now()}@sattvalife.yoga`;
  const dtStamp = formatDate(new Date());
  const dtStart = formatDate(eventData.startTime);
  const dtEnd = formatDate(eventData.endTime);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sattvalife Yoga//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${eventData.summary}`,
    `DESCRIPTION:${eventData.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${eventData.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'TRIGGER:-PT30M',
    'END:VALARM',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}