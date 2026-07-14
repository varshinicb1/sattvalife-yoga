import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import QRCode from 'qrcode';
import pino from 'pino';
import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers,
  type WAMessage,
  type WASocket,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

const PORT = parseInt(process.env.WHATSAPP_SERVICE_PORT || '3001', 10);

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});

const app = express();
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

let sock: WASocket | null = null;
let connectionStatus: ConnectionStatus = 'disconnected';
let qrBase64: string | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

async function startSocket() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: Browsers.windows('Sattvalife'),
    printQRInTerminal: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,
  });

  connectionStatus = 'connecting';
  updateStatus();

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      try {
        qrBase64 = await QRCode.toDataURL(qr);
        io.emit('qr', { qr: qrBase64 });
      } catch (err) {
        logger.error('Failed to generate QR code image');
      }
    }

    if (connection === 'open') {
      connectionStatus = 'connected';
      reconnectAttempts = 0;
      qrBase64 = null;
      logger.info('WhatsApp connected successfully');
      updateStatus();
    }

    if (connection === 'close') {
      connectionStatus = 'disconnected';
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;

      logger.info(
        `Connection closed. Reconnect: ${shouldReconnect}`,
      );

      if (shouldReconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        logger.info(
          `Reconnecting in 5s (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`,
        );
        setTimeout(startSocket, 5000);
      } else if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        logger.error('Max reconnection attempts reached');
      }

      updateStatus();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type === 'notify') {
      for (const msg of messages) {
        if (msg.key.fromMe) continue;
        io.emit('message', {
          from: msg.key.remoteJid,
          text: getMessageText(msg),
          timestamp: msg.messageTimestamp,
        });
      }
    }
  });
}

function getMessageText(msg: WAMessage): string {
  const msgType = msg.message?.conversation;
  const extendedMsg = msg.message?.extendedTextMessage?.text;
  const imageMsg = msg.message?.imageMessage?.caption;
  const videoMsg = msg.message?.videoMessage?.caption;
  const docMsg = msg.message?.documentMessage?.caption;
  return msgType || extendedMsg || imageMsg || videoMsg || docMsg || '';
}

function updateStatus() {
  io.emit('status', { status: connectionStatus });
}

app.get('/qr', async (_req, res) => {
  try {
    res.json({
      qr: qrBase64,
      status: connectionStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.get('/status', (_req, res) => {
  res.json({ status: connectionStatus });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    connection: connectionStatus,
    uptime: process.uptime(),
    reconnectAttempts,
  });
});

app.post('/send-text', async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      res.status(400).json({ error: 'Missing required fields: to, message' });
      return;
    }

    if (!sock) {
      res.status(503).json({ error: 'Socket not initialized' });
      return;
    }

    const jid = to.includes('@s.whatsapp.net') ? to : `${to}@s.whatsapp.net`;

    const result = await sock.sendMessage(jid, { text: message });
    logger.info(`Text message sent to ${jid}`);
    res.json({ success: true, result });
  } catch (err: any) {
    logger.error('Send text error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/send-template', async (req, res) => {
  try {
    const { to, templateName, languageCode, components } = req.body;

    if (!to || !templateName) {
      res
        .status(400)
        .json({ error: 'Missing required fields: to, templateName' });
      return;
    }

    if (!sock) {
      res.status(503).json({ error: 'Socket not initialized' });
      return;
    }

    const jid = to.includes('@s.whatsapp.net') ? to : `${to}@s.whatsapp.net`;

    const result = await sock.sendMessage(jid, {
      templateMessage: {
        hydratedTemplate: {
          hydratedContent: {
            hydratedButtons: [],
          },
          templateId: templateName,
          templateVersion: 1,
          templateComponents: components || [],
        },
      },
    });

    logger.info(`Template message sent to ${jid}`);
    res.json({ success: true, result });
  } catch (err: any) {
    logger.error('Send template error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.emit('status', { status: connectionStatus });
  if (qrBase64) {
    socket.emit('qr', { qr: qrBase64 });
  }

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

function gracefulShutdown() {
  logger.info('Shutting down gracefully...');
  if (sock) {
    sock.end(new Error('Service shutting down'));
  }
  io.close();
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

httpServer.listen(PORT, () => {
  logger.info(`WhatsApp service listening on port ${PORT}`);
  startSocket();
});
