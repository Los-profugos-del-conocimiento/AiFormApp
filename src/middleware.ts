import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import useCheckUserSession from './hooks/useCheckUserSession';

export function middleware(request: NextRequest) {
  // NextResponse.next();
  // const token = request.cookies.get('aiform_token_420');


  // const authUrl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=529497607039-ci9s8bc5qbfvl0o3ku39us2rscc2v52p.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fgoogle";


  // if ( !request.cookies.has('aiform_token_420') ) {
  //   return NextResponse.redirect(new URL('http://localhost:3000/auth/signin'));
  // }
}

export const config = {
  matcher: ['/home', '/myForms'], // Ajusta esto según tus necesidades para limitar el middleware a rutas específicas
};