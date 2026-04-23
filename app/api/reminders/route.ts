import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.reminder.create({ data: { title: data.title, details: data.details, dueAt: new Date(data.dueAt), type: data.type, status: data.status ?? "pending", channel: data.channel ?? "in_app", automationKey: data.automationKey } });
  return ok("Reminder created.");
}
