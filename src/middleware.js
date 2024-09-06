import { auth, signOut } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { auth, nextUrl } = req;

  if (nextUrl.pathname === '/error') {
    return NextResponse.next();
  }

  if (!auth && nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", nextUrl.origin));
  }

  if (auth && nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', nextUrl.origin));
  }

  // const currentTime = Math.floor(Date.now() / 1000);
  
  // if (req.auth && req.auth.accessTokenExpiresAt <= currentTime) {
  //   return Response.redirect(new URL("/", req.nextUrl.origin));
  // }


});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
};
