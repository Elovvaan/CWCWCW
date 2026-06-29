import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Valid email is required."),
  phone: z.string().trim().min(1).optional().or(z.literal("")),
  notes: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }
    const { name, email, phone, notes } = parsed.data;
    await prisma.mentorApplication.create({
      data: { name, email, phone: phone || null, notes: notes || null },
    });
    return ok("Mentor application received.");
  } catch (error) {
    console.error("Failed to submit mentor application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
