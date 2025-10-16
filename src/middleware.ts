// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // protect admin routes and admin APIs
  if (pathname.startsWith('/admin')) {
    const auth = req.headers.get('authorization') || '';
    const expectedUser = process.env.ADMIN_BASIC_AUTH_USER || 'admin';
    const expectedPass = process.env.ADMIN_BASIC_AUTH_PASS || 'password';
    const expected = 'Basic ' + Buffer.from(`${expectedUser}:${expectedPass}`).toString('base64');

    if (auth !== expected) {
      // return 401 with Basic auth challenge (browser will show username/password popup)
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
