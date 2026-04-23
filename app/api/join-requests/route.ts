import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.joinRequest.create({ data: { name: data.name, email: data.email, phone: data.phone, notes: data.notes } });
  return ok("Join request received.");
}
