import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["pending", "complete", "snoozed", "cancelled"]).optional(),
  dueAt: z.string().optional(),
  title: z.string().trim().min(1).optional(),
  details: z.string().trim().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }

    const { dueAt, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };
    if (dueAt) data.dueAt = new Date(dueAt);

    const updated = await prisma.reminder.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update reminder:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
