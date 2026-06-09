import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET environment variable is not configured");
const JWT_SECRET = new TextEncoder().encode(jwtSecret);

const intlMiddleware = createIntlMiddleware(routing);

const protectedPaths = ["/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePattern = /^\/(en|zh-TW|ja|ko)/;
  const strippedPath = pathname.replace(localePattern, "") || "/";
  const locale = pathname.match(localePattern)?.[1] ?? routing.defaultLocale;

  const isProtected = protectedPaths.some((path) =>
    strippedPath.startsWith(path),
  );

  if (!isProtected) return intlMiddleware(request);

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return intlMiddleware(request);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
