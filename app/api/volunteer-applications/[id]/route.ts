import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["new", "reviewed", "closed"]).optional(),
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

    const updated = await prisma.volunteerApplication.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update volunteer application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
