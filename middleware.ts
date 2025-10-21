import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting
const requests = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  // Only rate limit the feed API
  if (request.nextUrl.pathname === '/api/feed') {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const now = Date.now();

    // Get request timestamps for this IP
    const timestamps = requests.get(ip) || [];

    // Remove timestamps older than 1 minute
    const recentRequests = timestamps.filter(time => now - time < 60000);

    // Allow max 30 requests per minute (generous, prevents spam)
    if (recentRequests.length >= 30) {
      return new NextResponse('Too many requests', { status: 429 });
    }

    // Add current request
    recentRequests.push(now);
    requests.set(ip, recentRequests);

    // Cleanup old entries every 100 requests to prevent memory bloat
    if (requests.size > 100) {
      for (const [key, times] of requests.entries()) {
        if (times.every(t => now - t > 60000)) {
          requests.delete(key);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/feed',
};
