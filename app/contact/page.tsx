"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus({ type: "success", message: "Your message has been sent successfully." });
    } catch {
      setStatus({ type: "error", message: "Sorry, we could not send your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return <section className="section-shell"><div className="card"><h1 className="text-4xl">Contact</h1><p className="mt-2">Email: hello@cwconnectwomen.org</p><p>Facebook Group: facebook.com/cwconnectwomen</p><p>Location: Shared privately for prayer gatherings.</p><form className="mt-4 grid gap-3" onSubmit={handleSubmit}><input className="rounded-xl border p-3" name="name" type="text" placeholder="Name" required disabled={isSubmitting}/><input className="rounded-xl border p-3" name="email" type="email" placeholder="Email" required disabled={isSubmitting}/><textarea className="rounded-xl border p-3" name="message" placeholder="Message" required disabled={isSubmitting}/><button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</button>{status ? <p className="text-sm" role="status">{status.message}</p> : null}</form></div></section>;
}
