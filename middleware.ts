import { NextRequest, NextResponse } from "next/server";
import { AR_PATHS } from "./lib/localePath";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const rest = pathname.replace(/^\/ar/, "").replace(/\/+$/, "") || "/";
    if (!AR_PATHS.includes(rest)) {
      const url = request.nextUrl.clone();
      url.pathname = rest;
      return NextResponse.redirect(url);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", "ar");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sb-access-token");

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("sb-access-token");
        return res;
      }
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("sb-access-token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/ar", "/ar/:path*"],
};
