import Link from "next/link";
import { PrayerCompanionPanel } from "@/components/agents/prayer-companion";
import { UpperRoomSignupForm } from "@/components/upper-room/signup-form";

export default function UpperRoomPage() {
  return (
    <section className="section-shell space-y-4">
      <div className="card bg-white">
        <h1 className="text-4xl">The Upper Room</h1>
        <p className="mt-3 text-slate-700">
          The Upper Room is our sacred gathering space where women meet for prayer, Bible study, encouragement, and seeking God&apos;s presence.
        </p>
        <p className="mt-2">
          <strong>Recurring gatherings:</strong> Tuesdays and Friday nights.
        </p>
        <p className="mt-2">
          Special gatherings include Ladies Prayer Night, Upper Room Bible Study, and Becoming a Woman of Prayer.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/events" className="btn-primary">Join Prayer Night</Link>
          <Link href="#reminders" className="btn-secondary">Get Reminders</Link>
        </div>
      </div>
      <PrayerCompanionPanel />
      <div id="reminders" className="card">
        <h2 className="text-2xl">Get Upper Room Reminders</h2>
        <p className="mt-1 text-sm text-slate-600">
          Sign up to receive reminders for Tuesday and Friday prayer nights, and other Upper Room gatherings.
        </p>
        <UpperRoomSignupForm />
      </div>
      <div className="card">
        <p className="italic">&ldquo;Come expecting God to move, heal, and restore.&rdquo;</p>
      </div>
    </section>
  );
}
