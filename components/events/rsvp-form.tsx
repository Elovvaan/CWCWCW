"use client";

import { FormEvent, useState } from "react";

export function RsvpForm({ eventSlug }: { eventSlug: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const fd = new FormData(event.currentTarget);
    const payload = {
      eventSlug,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      reminderOptIn: fd.get("reminderOptIn") === "on",
    };

    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Registration failed.");
      (event.target as HTMLFormElement).reset();
      setStatus({ type: "success", message: "You are registered! We look forward to seeing you." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">RSVP / Register</h3>
      <input className="rounded-xl border p-3" name="name" placeholder="Your Name" required disabled={submitting} />
      <input className="rounded-xl border p-3" name="email" type="email" placeholder="Email" required disabled={submitting} />
      <input className="rounded-xl border p-3" name="phone" placeholder="Phone (optional)" disabled={submitting} />
      <label className="text-sm">
        <input type="checkbox" className="mr-2" name="reminderOptIn" defaultChecked disabled={submitting} />
        Send me reminders for this event
      </label>
      <button className="btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Registering…" : "Register Now"}
      </button>
      {status && (
        <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}
