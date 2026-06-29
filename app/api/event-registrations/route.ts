import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const eventId = data.eventId;

  if (typeof eventId !== "string" || eventId.trim().length === 0) {
    return NextResponse.json({ error: "Invalid eventId." }, { status: 400 });
  }

  if (typeof data.name !== "string" || data.name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (typeof data.email !== "string" || data.email.trim().length === 0) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  await prisma.eventRegistration.create({
    data: {
      eventId,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: typeof data.phone === "string" && data.phone.trim().length > 0 ? data.phone.trim() : null,
      reminderOptIn: typeof data.reminderOptIn === "boolean" ? data.reminderOptIn : true,
    },
  });

  return ok("Registered for event.");
}
