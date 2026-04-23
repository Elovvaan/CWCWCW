import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.contactMessage.create({ data: { name: data.name, email: data.email, message: data.message } });
  return ok("Message sent.");
}
