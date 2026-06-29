import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Valid email is required."),
  message: z.string().trim().min(1, "Message is required."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }
    const { name, email, message } = parsed.data;
    await prisma.contactMessage.create({ data: { name, email, message } });
    return ok("Message sent.");
  } catch (error) {
    console.error("Failed to submit contact message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
