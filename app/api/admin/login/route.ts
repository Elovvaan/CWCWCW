import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60;

async function createAdminSessionToken() {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required to sign admin sessions.");
  }

  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SECONDS}s`)
    .sign(new TextEncoder().encode(secret));
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", req.url));
    const sessionToken = await createAdminSessionToken();
    const expires = new Date(Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000);

    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      expires,
    });
    return response;
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
