"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// ── Prayer Requests ──────────────────────────────────────────────────────────

export async function markPrayerRequestReviewed(id: string, _formData: FormData) {
  await prisma.prayerRequest.update({ where: { id }, data: { status: "reviewed" } });
  revalidatePath("/admin/prayer-requests");
}

export async function setPrayerRequestUrgent(id: string, formData: FormData) {
  const urgent = formData.get("urgent") === "true";
  await prisma.prayerRequest.update({ where: { id }, data: { urgent } });
  revalidatePath("/admin/prayer-requests");
}

// ── Join Requests ────────────────────────────────────────────────────────────

export async function markJoinRequestContacted(id: string, _formData: FormData) {
  await prisma.joinRequest.update({ where: { id }, data: { status: "contacted" } });
  revalidatePath("/admin/members");
}

// ── Applications ─────────────────────────────────────────────────────────────

export async function markVolunteerReviewed(id: string, _formData: FormData) {
  await prisma.volunteerApplication.update({ where: { id }, data: { status: "reviewed" } });
  revalidatePath("/admin/forms");
}

export async function markMentorReviewed(id: string, _formData: FormData) {
  await prisma.mentorApplication.update({ where: { id }, data: { status: "reviewed" } });
  revalidatePath("/admin/forms");
}

// ── Reminders ────────────────────────────────────────────────────────────────

export async function markReminderComplete(id: string, _formData: FormData) {
  await prisma.reminder.update({ where: { id }, data: { status: "complete" } });
  revalidatePath("/admin/reminders");
}

export async function markReminderSnoozed(id: string, _formData: FormData) {
  await prisma.reminder.update({ where: { id }, data: { status: "snoozed" } });
  revalidatePath("/admin/reminders");
}

export async function createAdminReminder(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim() || null;
  const dueAtRaw = String(formData.get("dueAt") ?? "").trim();
  const type = String(formData.get("type") ?? "general").trim();
  const channel = String(formData.get("channel") ?? "in_app").trim();

  if (!title || !dueAtRaw) return;

  await prisma.reminder.create({
    data: {
      title,
      details,
      dueAt: new Date(dueAtRaw),
      type,
      channel,
      status: "pending",
    },
  });
  revalidatePath("/admin/reminders");
}
