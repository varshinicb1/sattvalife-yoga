import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  image?: string | null;
}

export interface SessionData {
  isLoggedIn: boolean;
  user?: User;
}

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD || 'sattvalife-yoga-session-password-2024-min-32-chars-long!!',
  cookieName: 'sattvalife-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

export { getIronSession };
