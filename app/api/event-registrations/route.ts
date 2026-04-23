import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.eventRegistration.create({ data: { eventId: data.eventId, name: data.name, email: data.email, phone: data.phone } });
  return ok("Registered for event.");
}
