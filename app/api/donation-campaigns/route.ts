import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().min(1, "Description is required."),
  cause: z.string().trim().min(1, "Cause is required."),
  targetAmount: z.number().positive().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  const campaigns = await prisma.donationCampaign.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload.", details: parsed.error.flatten() }, { status: 400 });
    }
    const created = await prisma.donationCampaign.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        cause: parsed.data.cause,
        targetAmount: parsed.data.targetAmount,
        active: parsed.data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create donation campaign:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
