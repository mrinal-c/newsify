import { auth, signOut } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  const currentTime = Math.floor(Date.now() / 1000);
  
  if (req.auth && req.auth.accessTokenExpiresAt <= currentTime) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }


});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
