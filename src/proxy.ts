import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isProtected =
    nextUrl.pathname.startsWith("/perfil") ||
    nextUrl.pathname.startsWith("/pedidos");

  if (isDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
