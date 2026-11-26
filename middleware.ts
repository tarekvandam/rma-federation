import { NextRequest, NextResponse } from "next/server";
import { AR_PATHS } from "./lib/localePath";

const ADMIN_EMAIL = "eng.tarek.sayed@gmail.com";

export async function middleware(request: NextRequest) {
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
    const toLogin = () => {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("sb-access-token");
      return res;
    };

    if (!token) return toLogin();

    // Ask Supabase whether this token is genuine (signature + expiry) and
    // who it belongs to. A hand-made cookie cannot pass this check.
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          Authorization: `Bearer ${token.value}`,
        },
        cache: "no-store",
      });
      if (!res.ok) return toLogin();
      const user = await res.json();
      if (String(user?.email || "").toLowerCase() !== ADMIN_EMAIL) return toLogin();
    } catch {
      return toLogin();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/ar", "/ar/:path*"],
};
