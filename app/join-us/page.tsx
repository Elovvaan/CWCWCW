"use client";

import { FormEvent, useState } from "react";
import { GraceGuidePanel } from "@/components/agents/grace-guide";

type FormState = { status: "idle" | "loading" | "success" | "error"; message: string };
const idle: FormState = { status: "idle", message: "" };

function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<FormState>(idle);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading", message: "" });
    const fd = new FormData(event.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      (event.target as HTMLFormElement).reset();
      setState({ status: "success", message: json.message || "Submitted successfully." });
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Submission failed." });
    }
  }

  return { state, handleSubmit };
}

function JoinForm({ title, endpoint, notes }: { title: string; endpoint: string; notes?: string }) {
  const { state, handleSubmit } = useFormSubmit(endpoint);
  const loading = state.status === "loading";
  return (
    <form className="card space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl">{title}</h2>
      {notes && <p className="text-sm text-slate-600">{notes}</p>}
      <input className="w-full rounded-xl border p-3" name="name" placeholder="Name" required disabled={loading} />
      <input className="w-full rounded-xl border p-3" name="email" type="email" placeholder="Email" required disabled={loading} />
      <input className="w-full rounded-xl border p-3" name="phone" placeholder="Phone (optional)" disabled={loading} />
      <textarea className="w-full rounded-xl border p-3" name="notes" placeholder="How can we connect with you?" disabled={loading} />
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Submitting…" : "Join the Sisterhood"}
      </button>
      {state.status === "success" && <p className="text-sm text-green-700" role="status">{state.message}</p>}
      {state.status === "error" && <p className="text-sm text-red-600" role="alert">{state.message}</p>}
    </form>
  );
}

export default function JoinUsPage() {
  return (
    <section className="section-shell space-y-6">
      <h1 className="text-4xl">Join Us</h1>
      <GraceGuidePanel />
      <JoinForm title="Join Community" endpoint="/api/join-requests" notes="Become part of our sisterhood community." />
      <JoinForm title="Volunteer" endpoint="/api/volunteer-applications" notes="Share your gifts and serve alongside us." />
      <JoinForm title="Become a Mentor" endpoint="/api/mentor-applications" notes="Walk alongside women in their journey." />
      <JoinForm title="Request Prayer" endpoint="/api/prayer-requests" notes="Submit a prayer request and we will stand with you." />
    </section>
  );
}
