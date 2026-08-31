import { NextRequest } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/ai';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: unknown[] };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const validMessages = messages
      .filter((m: any) => m.role && m.content)
      .map((m: any) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      }))
      .slice(-10);

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemma-4-31b-it',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...validMessages,
        ],
        temperature: 0.3,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('NVIDIA API error:', response.status, error);
      return Response.json({ error: 'AI service error' }, { status: 502 });
    }

    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content || 'I apologize, but I am unable to respond at this moment.';

    return Response.json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
