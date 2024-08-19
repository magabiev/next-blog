import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('logged');
  alert('run');
  if (!verify) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
