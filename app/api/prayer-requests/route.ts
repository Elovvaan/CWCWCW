import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

function parseOptionalBoolean(value: unknown): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return undefined;
}

function resolveVisibilityFlags(data: {
  isPublic?: unknown;
  isPrivate?: unknown;
}): { isPublic: boolean; isPrivate: boolean } | { error: string } {
  const isPublic = parseOptionalBoolean(data.isPublic);
  const isPrivate = parseOptionalBoolean(data.isPrivate);

  if (data.isPublic !== undefined && isPublic === undefined) {
    return { error: "isPublic must be a boolean when provided." };
  }

  if (data.isPrivate !== undefined && isPrivate === undefined) {
    return { error: "isPrivate must be a boolean when provided." };
  }

  if (isPublic !== undefined && isPrivate !== undefined) {
    if (isPublic === isPrivate) {
      return { error: "isPublic and isPrivate must be opposite boolean values." };
    }

    return { isPublic, isPrivate };
  }

  if (isPublic !== undefined) {
    return { isPublic, isPrivate: !isPublic };
  }

  if (isPrivate !== undefined) {
    return { isPublic: !isPrivate, isPrivate };
  }

  return { isPublic: false, isPrivate: true };
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const visibility = resolveVisibilityFlags(data);
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api";

const prayerRequestSchema = z.object({
  name: z.string().trim().min(1),
  contact: z.string().trim().min(1),
  request: z.string().trim().min(1),
  isPublic: z.boolean().optional().default(false),
  isPrivate: z.boolean().optional().default(false),
  urgent: z.boolean().optional().default(false),
  followUpRequested: z.boolean().optional().default(false)
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = prayerRequestSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Invalid prayer request payload.",
        details: result.error.flatten()
      },
      { status: 400 }
    );
  }

  const data = result.data;

  await prisma.prayerRequest.create({
    data: {
      name: data.name,
      contact: data.contact,
      request: data.request,
      isPublic: data.isPublic,
      isPrivate: data.isPrivate,
      urgent: data.urgent,
      followUpRequested: data.followUpRequested
    }
  });
  return ok("Prayer request submitted.");
}
