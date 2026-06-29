"use client";

import { FormEvent, useState } from "react";
import { PrayerCompanionPanel } from "@/components/agents/prayer-companion";

export default function PrayerRequestsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const fd = new FormData(event.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      contact: fd.get("contact") as string,
      request: fd.get("request") as string,
      isPublic: fd.get("isPublic") === "on",
      isPrivate: fd.get("isPrivate") === "on",
      followUpRequested: fd.get("followUpRequested") === "on",
      urgent: fd.get("urgent") === "on",
    };

    try {
      const res = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      (event.target as HTMLFormElement).reset();
      setStatus({ type: "success", message: "Your prayer request has been submitted. We are standing with you." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Could not submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-shell grid gap-4 md:grid-cols-[2fr_1fr]">
      <div className="card">
        <h1 className="text-4xl">Prayer Requests</h1>
        <p className="mt-2 text-slate-600">Submit your prayer request and we will stand with you.</p>
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <input className="rounded-xl border p-3" name="name" placeholder="Name" disabled={isSubmitting} />
          <input className="rounded-xl border p-3" name="contact" placeholder="Email or Phone" disabled={isSubmitting} />
          <textarea className="rounded-xl border p-3" name="request" placeholder="Your prayer request" required disabled={isSubmitting} />
          <label className="text-sm">
            <input type="checkbox" className="mr-2" name="isPublic" disabled={isSubmitting} />
            Public request
          </label>
          <label className="text-sm">
            <input type="checkbox" className="mr-2" name="isPrivate" defaultChecked disabled={isSubmitting} />
            Private request
          </label>
          <label className="text-sm">
            <input type="checkbox" className="mr-2" name="followUpRequested" disabled={isSubmitting} />
            Request follow-up
          </label>
          <label className="text-sm">
            <input type="checkbox" className="mr-2" name="urgent" disabled={isSubmitting} />
            Urgent prayer
          </label>
          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Request Prayer"}
          </button>
          {status && (
            <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`} role="status">
              {status.message}
            </p>
          )}
        </form>
      </div>
      <PrayerCompanionPanel />
    </section>
  );
}
