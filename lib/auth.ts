import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function verifyAdminSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_session")?.value;
  if (!token) return false;

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return false;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      subject: "admin",
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}
