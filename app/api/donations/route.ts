import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/auth";

const schema = z.object({
  amount: z.number().positive("Amount must be positive."),
  method: z.string().trim().min(1, "Payment method is required."),
  campaignId: z.string().trim().optional(),
  donorName: z.string().trim().optional(),
  donorEmail: z.string().trim().email().optional().or(z.literal("")),
  followUpNeeded: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const authed = await verifyAdminSession(req);
  if (!authed) return unauthorizedResponse();

  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(donations);
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
    const { amount, method, campaignId, donorName, donorEmail, followUpNeeded } = parsed.data;
    const created = await prisma.donation.create({
      data: {
        amount,
        method,
        campaignId: campaignId || null,
        donorName: donorName || null,
        donorEmail: donorEmail || null,
        followUpNeeded: followUpNeeded ?? false,
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to record donation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
