import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const eventId = data.eventId;
  const hasValidEventIdType =
    (typeof eventId === "string" && eventId.trim().length > 0) ||
    (typeof eventId === "number" && Number.isInteger(eventId) && Number.isFinite(eventId));

  if (!hasValidEventIdType) {
    return NextResponse.json({ error: "Invalid eventId." }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    await prisma.eventRegistration.create({
      data: { eventId, name: data.name, email: data.email, phone: data.phone },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientValidationError ||
      (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2023")
    ) {
      return NextResponse.json({ error: "Invalid eventId." }, { status: 400 });
    }

    throw error;
  }
  return ok("Registered for event.");
}
