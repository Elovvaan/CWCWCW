import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";
import { featuredEvents } from "@/lib/data";

const schema = z.object({
  eventId: z.string().min(1).optional(),
  eventSlug: z.string().min(1).optional(),
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Valid email is required."),
  phone: z.string().trim().min(1).optional().or(z.literal("")),
  reminderOptIn: z.boolean().optional(),
}).refine((d) => d.eventId || d.eventSlug, {
  message: "Either eventId or eventSlug is required.",
  path: ["eventId"],
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }

    const { eventId, eventSlug, name, email, phone, reminderOptIn } = parsed.data;

    let resolvedEventId = eventId;

    if (!resolvedEventId && eventSlug) {
      // Look up by slug in DB
      let event = await prisma.event.findUnique({ where: { slug: eventSlug } });

      // If not in DB, create from static data
      if (!event) {
        const staticEvent = featuredEvents.find((e) => e.slug === eventSlug);
        if (!staticEvent) {
          return NextResponse.json({ error: "Event not found." }, { status: 404 });
        }
        event = await prisma.event.create({
          data: {
            slug: staticEvent.slug,
            title: staticEvent.title,
            type: staticEvent.category,
            date: staticEvent.date,
            time: staticEvent.time,
            location: staticEvent.location,
            description: staticEvent.title,
            isPaid: staticEvent.priceLabel !== "Free",
            featured: true,
          },
        });
      }
      resolvedEventId = event.id;
    }

    if (!resolvedEventId) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const event = await prisma.event.findUnique({ where: { id: resolvedEventId } });
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    await prisma.eventRegistration.create({
      data: {
        eventId: resolvedEventId,
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        reminderOptIn: reminderOptIn ?? true,
      },
    });

    return ok("Registered for event.");
  } catch (error) {
    console.error("Failed to register for event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
