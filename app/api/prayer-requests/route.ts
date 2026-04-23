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

  if ("error" in visibility) {
    return Response.json({ error: visibility.error }, { status: 400 });
  }

  await prisma.prayerRequest.create({
    data: {
      name: data.name,
      contact: data.contact,
      request: data.request,
      isPublic: visibility.isPublic,
      isPrivate: visibility.isPrivate,
      urgent: Boolean(data.urgent),
      followUpRequested: Boolean(data.followUpRequested)
    }
  });
  return ok("Prayer request submitted.");
}
