import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const secret = new TextEncoder().encode(
  (process.env.JWT_SECRET as string) || ''
);

export default async function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get('accessToken')?.value;

  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  if (url.pathname === '/login') {
    if (token) {
      try {
        jwtVerify(token, secret);

        url.pathname = '/';
        return NextResponse.redirect(url);
      } catch (e) {
        return NextResponse.next();
      }
    }
  } else {
    if (token === undefined) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      jwtVerify(token, secret);

      return NextResponse.next();
    } catch (e) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
