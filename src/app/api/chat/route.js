import { NextResponse } from 'next/server';

// Global variable to store chat history in memory
// NOTE: This clears when the server restarts. For production, use a database (Redis/Postgres).
let chatHistory = [
  {
    id: 'system-1',
    user: 'System',
    text: 'Welcome to the Japanese Conversation Room! (ようこそ！)',
    timestamp: Date.now(),
    isSystem: true,
  }
];

export async function GET() {
  // Return the last 100 messages
  return NextResponse.json(chatHistory.slice(-100));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user, text } = body;

    if (!user || !text) {
      return NextResponse.json({ error: 'Missing user or text' }, { status: 400 });
    }

    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user: user,
      text: text,
      timestamp: Date.now(),
      isSystem: false,
    };

    chatHistory.push(newMessage);

    // Keep memory usage check
    if (chatHistory.length > 500) {
      chatHistory = chatHistory.slice(-100);
    }

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
