import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeEmail(value: unknown) {
  const email = normalizeOptionalString(value);
  if (!email) return undefined;
  const normalized = email.toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(normalized) ? normalized : null;
}

function normalizePhone(value: unknown) {
  const phone = normalizeOptionalString(value);
  if (!phone) return undefined;

  const normalized = phone.replace(/[^\d+]/g, "");
  const phonePattern = /^\+?\d{10,15}$/;
  return phonePattern.test(normalized) ? normalized : null;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const name = normalizeOptionalString(data.name);
  const email = normalizeEmail(data.email);
  const phone = normalizePhone(data.phone);

  if (email === null) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (phone === null) {
    return Response.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }

  if (!email && !phone) {
    return Response.json({ error: "Please provide at least one contact method: email or phone." }, { status: 400 });
  }

  await prisma.reminderSubscription.create({
    data: {
      name,
      phone,
      email,
      prayerUpdates: !!data.prayerUpdates,
      eventReminders: !!data.eventReminders,
      volunteerOpportunities: !!data.volunteerOpportunities,
    },
  });
  return ok("Reminder preferences saved.");
}
