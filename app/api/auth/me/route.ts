import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  return NextResponse.json({
    isLoggedIn: !!session?.user,
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: (session.user as any).role,
      image: session.user.image,
    } : null,
  });
}
