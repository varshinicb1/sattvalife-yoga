const WHATSAPP_SERVICE_URL =
  process.env.WHATSAPP_SERVICE_URL || 'http://localhost:3001';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function fetchWithRetry(
  endpoint: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${WHATSAPP_SERVICE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        throw new Error(
          `WhatsApp service returned ${response.status}: ${await response.text()}`,
        );
      }

      return response.json();
    } catch (error: any) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      } else {
        throw error;
      }
    }
  }
}

export async function getConnectionStatus(): Promise<{
  status: string;
  qr?: string | null;
}> {
  try {
    const data = await fetchWithRetry('/status', { method: 'GET' });
    return data;
  } catch {
    return { status: 'disconnected' };
  }
}

export async function getQRCode(): Promise<{
  qr: string | null;
  status: string;
}> {
  const data = await fetchWithRetry('/qr', { method: 'GET' });
  return data;
}

export async function sendTextMessage(to: string, body: string) {
  return fetchWithRetry('/send-text', {
    method: 'POST',
    body: JSON.stringify({ to, message: body }),
  });
}

export async function sendTemplateMessage(params: {
  to: string;
  templateName: string;
  languageCode: string;
  components?: Array<{
    type: string;
    parameters: Array<{ type: string; text?: string }>;
  }>;
}) {
  return fetchWithRetry('/send-template', {
    method: 'POST',
    body: JSON.stringify({
      to: params.to,
      templateName: params.templateName,
      languageCode: params.languageCode,
      components: params.components || [],
    }),
  });
}

export async function sendInteractiveMessage(
  to: string,
  body: string,
  buttons: Array<{ id: string; title: string }>,
) {
  const buttonList = buttons
    .map((b) => `${b.id}: ${b.title}`)
    .join('\n');
  return sendTextMessage(to, `${body}\n\n${buttonList}`);
}

export async function sendMediaMessage(
  to: string,
  mediaType: 'image' | 'document' | 'video',
  mediaUrl: string,
  caption?: string,
  filename?: string,
) {
  const header = mediaType === 'image' ? '🖼️' : mediaType === 'video' ? '🎬' : '📄';
  let text = `${header} ${mediaUrl}`;
  if (caption) text += `\n\n${caption}`;
  if (filename) text += `\nFile: ${filename}`;
  return sendTextMessage(to, text);
}

export async function sendLocationMessage(
  to: string,
  latitude: number,
  longitude: number,
  name: string,
  address: string,
) {
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const text = `📍 ${name}\n${address}\n${mapsUrl}`;
  return sendTextMessage(to, text);
}

export async function markAsRead(_messageId: string) {
  return { success: true };
}

export async function getMediaUrl(_mediaId: string): Promise<string> {
  throw new Error('Media URL retrieval not supported via sidecar');
}

export async function downloadMedia(_mediaUrl: string): Promise<Buffer> {
  throw new Error('Media download not supported via sidecar');
}

export function verifyWebhookSignature(_payload: string, _signature: string): boolean {
  return true;
}

export async function sendBookingConfirmation(params: {
  to: string;
  userName: string;
  courseName: string;
  date: string;
  time: string;
  location: string;
  bookingUrl: string;
  detailsUrl: string;
}) {
  const text = [
    `✅ *Booking Confirmed!*`,
    ``,
    `Hi ${params.userName},`,
    ``,
    `Your booking for *${params.courseName}* is confirmed.`,
    ``,
    `📅 ${params.date}`,
    `⏰ ${params.time}`,
    `📍 ${params.location}`,
    ``,
    `View details: ${params.detailsUrl}`,
    `Manage booking: ${params.bookingUrl}`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function sendReminder24h(params: {
  to: string;
  userName: string;
  courseName: string;
  time: string;
  location: string;
  mapsUrl: string;
  bookingId: string;
}) {
  const text = [
    `⏰ *Reminder: Tomorrow!*`,
    ``,
    `Hi ${params.userName},`,
    ``,
    `Your session *${params.courseName}* is tomorrow at ${params.time}.`,
    ``,
    `📍 ${params.location}`,
    `🗺️ ${params.mapsUrl}`,
    ``,
    `Reply CANCEL_${params.bookingId} to cancel.`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function sendReminder1h(params: {
  to: string;
  courseName: string;
  location: string;
}) {
  const text = [
    `🧘 *Starting soon!*`,
    ``,
    `Your session *${params.courseName}* starts in 1 hour.`,
    ``,
    `📍 ${params.location}`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function sendPaymentReceipt(params: {
  to: string;
  userName: string;
  amount: string;
  courseName: string;
  receiptUrl: string;
}) {
  const text = [
    `🧾 *Payment Receipt*`,
    ``,
    `Hi ${params.userName},`,
    ``,
    `Thank you for your payment of *${params.amount}* for ${params.courseName}.`,
    ``,
    `Receipt: ${params.receiptUrl}`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function sendWelcomeMessage(params: {
  to: string;
  userName: string;
}) {
  const text = [
    `🙏 *Welcome to Sattvalife Yoga!*`,
    ``,
    `Hi ${params.userName},`,
    ``,
    `We're thrilled to have you join our community.`,
    `Explore our classes and start your journey today.`,
    ``,
    `👉 ${process.env.NEXT_PUBLIC_APP_URL || 'https://sattvalife.yoga'}/schedule`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function sendCancellationConfirmation(params: {
  to: string;
  userName: string;
  courseName: string;
  date: string;
  refundAmount?: string;
}) {
  const text = [
    `❌ *Booking Cancelled*`,
    ``,
    `Hi ${params.userName},`,
    ``,
    `Your booking for *${params.courseName}* on ${params.date} has been cancelled.`,
    params.refundAmount
      ? `\nRefund: ${params.refundAmount}`
      : '',
    ``,
    `We hope to see you again soon.`,
  ].join('\n');

  return sendTextMessage(params.to, text);
}

export async function queueWhatsAppMessage(params: {
  to: string;
  type: 'template' | 'text' | 'interactive' | 'media' | 'location';
  templateName?: string;
  languageCode?: string;
  components?: Array<{
    type: string;
    parameters: Array<{ type: string; text?: string }>;
  }>;
  body?: string;
  buttons?: Array<{ id: string; title: string }>;
  mediaType?: 'image' | 'document' | 'video';
  mediaUrl?: string;
  caption?: string;
  filename?: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  locationAddress?: string;
  scheduledFor?: Date;
}) {
  if (params.scheduledFor && params.scheduledFor > new Date()) {
    const delay = params.scheduledFor.getTime() - Date.now();
    setTimeout(() => sendQueuedMessage(params), delay);
  } else {
    sendQueuedMessage(params);
  }
}

async function sendQueuedMessage(params: any) {
  try {
    switch (params.type) {
      case 'template':
        await sendTemplateMessage({
          to: params.to,
          templateName: params.templateName!,
          languageCode: params.languageCode!,
          components: params.components,
        });
        break;
      case 'text':
        await sendTextMessage(params.to, params.body!);
        break;
      case 'interactive':
        await sendInteractiveMessage(params.to, params.body!, params.buttons!);
        break;
      case 'media':
        await sendMediaMessage(
          params.to,
          params.mediaType!,
          params.mediaUrl!,
          params.caption,
          params.filename,
        );
        break;
      case 'location':
        await sendLocationMessage(
          params.to,
          params.latitude!,
          params.longitude!,
          params.locationName!,
          params.locationAddress!,
        );
        break;
    }
  } catch (error) {
    console.error('Failed to send queued WhatsApp message:', error);
  }
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('44')) return cleaned;
  if (cleaned.startsWith('0')) return '44' + cleaned.slice(1);
  return '44' + cleaned;
}
