import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

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
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData();
      const userValue = formData.get('user');
      const textValue = formData.get('text');
      const user = typeof userValue === 'string' ? userValue : '';
      const text = typeof textValue === 'string' ? textValue : '';
      const file = formData.get('file');
      
      if (!user) {
        return NextResponse.json({ error: 'Missing user' }, { status: 400 });
      }

      let fileUrl = null;
      let fileType = null;
      let fileKind = null;

      const isFileLike =
        file &&
        typeof file === 'object' &&
        typeof file.arrayBuffer === 'function' &&
        typeof file.type === 'string';

      if (isFileLike) {
        const MAX_BYTES = 3 * 1024 * 1024;

        // Validate file size
        if (typeof file.size === 'number' && file.size > MAX_BYTES) {
          return NextResponse.json({ error: 'File too large. Max size is 3MB.' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json({ error: 'Invalid file type. Only images, PDFs, and text files are allowed.' }, { status: 400 });
        }

        // IMPORTANT: Don’t write files to disk. Many deploy targets are serverless/readonly.
        // Store as a data URL in memory (chatHistory) for demo purposes.
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        if (buffer.length > MAX_BYTES) {
          return NextResponse.json({ error: 'File too large. Max size is 3MB.' }, { status: 400 });
        }

        const base64 = buffer.toString('base64');
        fileUrl = `data:${file.type};base64,${base64}`;
        fileType = file.type;
        fileKind = file.type.startsWith('image/') ? 'image' : 'file';
      }

      const newMessage = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        user: user,
        text: text,
        timestamp: Date.now(),
        isSystem: false,
        fileUrl: fileUrl,
        fileType: fileType,
        fileKind: fileKind,
        fileName: isFileLike && typeof file.name === 'string' ? file.name : null,
      };

      chatHistory.push(newMessage);

      // Keep memory usage check
      if (chatHistory.length > 500) {
        chatHistory = chatHistory.slice(-100);
      }

      return NextResponse.json({ success: true, message: newMessage });
    } else {
      // Handle text-only message
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
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
