import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  } else if (req.auth && req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/test", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
