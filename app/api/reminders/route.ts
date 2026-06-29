import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  details: z.string().trim().optional(),
  dueAt: z.string().min(1, "Due date is required."),
  type: z.string().trim().min(1, "Type is required."),
  status: z.string().trim().optional(),
  channel: z.string().trim().optional(),
  automationKey: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  const status = req.nextUrl.searchParams.get("status");
  const now = new Date();

  let where: Record<string, unknown> = {};
  if (status === "due") {
    where = { status: "pending", dueAt: { lte: now } };
  } else if (status === "overdue") {
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    where = { status: "pending", dueAt: { lte: yesterday } };
  } else if (status === "upcoming") {
    where = { status: "pending", dueAt: { gt: now } };
  } else if (status) {
    where = { status };
  }

  const reminders = await prisma.reminder.findMany({
    where,
    orderBy: { dueAt: "asc" },
  });
  return NextResponse.json(reminders);
}

export async function POST(req: NextRequest) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }
    const { title, details, dueAt, type, status, channel, automationKey } = parsed.data;
    await prisma.reminder.create({
      data: {
        title,
        details: details || null,
        dueAt: new Date(dueAt),
        type,
        status: status ?? "pending",
        channel: channel ?? "in_app",
        automationKey: automationKey || null,
      },
    });
    return ok("Reminder created.");
  } catch (error) {
    console.error("Failed to create reminder:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
