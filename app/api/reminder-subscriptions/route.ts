import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.reminderSubscription.create({ data: { name: data.name, phone: data.phone, email: data.email, prayerUpdates: !!data.prayerUpdates, eventReminders: !!data.eventReminders, volunteerOpportunities: !!data.volunteerOpportunities } });
  return ok("Reminder preferences saved.");
}
