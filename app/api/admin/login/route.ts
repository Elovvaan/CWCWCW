import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", req.url));
    response.cookies.set("admin_session", "active", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return response;
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
