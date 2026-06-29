import { NextRequest, NextResponse } from "next/server";
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
  try {
    const data = await req.json();
    const name = normalizeOptionalString(data.name);
    const email = normalizeEmail(data.email);
    const phone = normalizePhone(data.phone);
    const source: string = typeof data.source === "string" ? data.source.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (email === null) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (phone === null) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }

    if (!email && !phone) {
      return NextResponse.json({ error: "Please provide at least one contact method: email or phone." }, { status: 400 });
    }

    const subscription = await prisma.reminderSubscription.create({
      data: {
        name,
        phone,
        email,
        prayerUpdates: !!data.prayerUpdates,
        eventReminders: !!data.eventReminders,
        volunteerOpportunities: !!data.volunteerOpportunities,
      },
    });

    // For Upper Room signups, create an admin follow-up Reminder
    if (source === "upper-room") {
      const dueAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // due in 24 hours
      await prisma.reminder.create({
        data: {
          title: `Upper Room follow-up: ${name}`,
          details: `New Upper Room reminder signup. Contact: ${email ?? phone ?? "n/a"}. Subscription ID: ${subscription.id}`,
          dueAt,
          type: "upper-room",
          status: "pending",
          channel: "in_app",
          automationKey: `upper-room-followup-${subscription.id}`,
        },
      });
    }

    return ok("Reminder preferences saved.");
  } catch (error) {
    console.error("Failed to save reminder subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

