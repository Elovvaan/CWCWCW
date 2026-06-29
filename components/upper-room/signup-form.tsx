"use client";

import { FormEvent, useState } from "react";

export function UpperRoomSignupForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const fd = new FormData(event.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      prayerUpdates: fd.get("prayerUpdates") === "on",
      eventReminders: true,
      volunteerOpportunities: false,
      source: "upper-room",
    };

    try {
      const res = await fetch("/api/reminder-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      (event.target as HTMLFormElement).reset();
      setStatus({ type: "success", message: "You are signed up! We will send you Upper Room reminders." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Sign up failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
      <input className="rounded-xl border p-3" name="name" placeholder="Your Name" required disabled={submitting} />
      <input className="rounded-xl border p-3" name="email" type="email" placeholder="Email" disabled={submitting} />
      <input className="rounded-xl border p-3" name="phone" placeholder="Phone (optional)" disabled={submitting} />
      <label className="text-sm">
        <input type="checkbox" className="mr-2" name="prayerUpdates" defaultChecked disabled={submitting} />
        Also send prayer updates
      </label>
      <button className="btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Signing up…" : "Get Upper Room Reminders"}
      </button>
      {status && (
        <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}
