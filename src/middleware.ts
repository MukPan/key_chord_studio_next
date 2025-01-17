import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  //クッキーにログインユーザが保存いない場合はログイン画面へ
  if (!request.cookies.has('loginUserName')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  console.log(request.cookies.get('loginUserName'));
  return NextResponse.next();
}

export const config = {
  matcher: '/home/:path*',
}