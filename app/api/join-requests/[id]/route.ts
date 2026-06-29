import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["new", "contacted", "closed"]).optional(),
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

    const updated = await prisma.joinRequest.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && (error as any).code === "P2025") {
      return NextResponse.json({ error: "Join request not found." }, { status: 404 });
    }
    console.error("Failed to update join request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
