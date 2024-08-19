import { NextResponse, NextRequest } from 'next/server';

const publicRoutes = ['/auth'];

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('token');
  const isPublic = publicRoutes.includes(req.nextUrl.pathname);

  if (!verify && !isPublic) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  } else if (verify && isPublic) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
