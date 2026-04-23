import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (token.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const data = await req.json();
  await prisma.reminder.create({ data: { title: data.title, details: data.details, dueAt: new Date(data.dueAt), type: data.type, status: data.status ?? "pending", channel: data.channel ?? "in_app", automationKey: data.automationKey } });
  return ok("Reminder created.");
}
