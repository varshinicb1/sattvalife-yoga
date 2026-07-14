import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { db } from '@/lib/db';
import { schema } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(
      new URL('/login?error=google_auth_failed', req.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=missing_code', req.url)
    );
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      console.warn('No refresh_token returned - user may have already authorized');
    }

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;

    if (email && tokens.refresh_token) {
      await db
        .update(schema.users)
        .set({
          googleTokens: {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
            expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
          },
          googleCalendarConnected: true,
        })
        .where(eq(schema.users.email, email));
    }

    const redirectUrl = new URL('/dashboard', req.url);
    if (state) {
      const parsed = JSON.parse(decodeURIComponent(state));
      redirectUrl.searchParams.set('bookingId', parsed.bookingId || '');
    }

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Google OAuth token exchange failed:', err);
    return NextResponse.redirect(
      new URL('/login?error=token_exchange_failed', req.url)
    );
  }
}
