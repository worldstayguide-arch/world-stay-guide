import { NextResponse } from 'next/server';

import { turso } from '@/lib/turso';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await turso.execute('SELECT 1 AS connected');
    const connected = result.rows[0]?.connected === 1;

    return NextResponse.json({
      connected,
      database: 'turso',
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        database: 'turso',
        error: error instanceof Error ? error.message : 'Unknown database error',
      },
      { status: 500 }
    );
  }
}
