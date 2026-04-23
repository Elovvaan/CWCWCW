import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.prayerRequest.create({
    data: {
      name: data.name,
      contact: data.contact,
      request: data.request,
      isPublic: Boolean(data.isPublic),
      isPrivate: Boolean(data.isPrivate),
      urgent: Boolean(data.urgent),
      followUpRequested: Boolean(data.followUpRequested)
    }
  });
  return ok("Prayer request submitted.");
}
