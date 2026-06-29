import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { markReminderComplete, markReminderSnoozed } from "../actions";

export const dynamic = "force-dynamic";

export default async function UpperRoomAdminPage() {
  const [subscriptions, upperRoomFollowUps] = await Promise.all([
    prisma.reminderSubscription.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.reminder.findMany({
      where: { type: "upper-room" },
      orderBy: { dueAt: "asc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Upper Room</h1>

      {/* Upper Room Subscribers */}
      <section>
        <h2 className="mb-3 text-2xl">Reminder Subscriptions ({subscriptions.length})</h2>
        <p className="mb-2 text-sm text-slate-500">
          All reminder subscribers. Upper Room signups are tagged with a follow-up reminder below.
        </p>
        {subscriptions.length === 0 && <p className="text-sm text-slate-500">No subscribers yet.</p>}
        <div className="space-y-2">
          {subscriptions.map((s) => (
            <div key={s.id} className="card">
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs text-slate-500">{[s.email, s.phone].filter(Boolean).join(" • ")}</p>
              <div className="mt-1 flex flex-wrap gap-1 text-xs">
                {s.prayerUpdates && <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">prayer</span>}
                {s.eventReminders && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">events</span>}
                {s.volunteerOpportunities && <span className="rounded-full bg-sage/20 px-2 py-0.5 text-sage">volunteer</span>}
              </div>
              <p className="mt-1 text-xs text-slate-400">{format(s.createdAt, "PPp")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upper Room Follow-Up Reminders */}
      <section>
        <h2 className="mb-3 text-2xl">Upper Room Follow-Up Reminders ({upperRoomFollowUps.length})</h2>
        <p className="mb-2 text-sm text-slate-500">
          Auto-created when someone signs up for Upper Room reminders on the website.
        </p>
        {upperRoomFollowUps.length === 0 && <p className="text-sm text-slate-500">No follow-up reminders yet.</p>}
        <div className="space-y-3">
          {upperRoomFollowUps.map((r) => (
            <div key={r.id} className="card space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{r.title}</p>
                  {r.details && <p className="text-sm text-slate-600">{r.details}</p>}
                  <p className="text-xs text-slate-400">{format(r.dueAt, "PPp")}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "complete" ? "bg-green-100 text-green-700" : r.status === "snoozed" ? "bg-slate-100 text-slate-500" : "bg-yellow-100 text-yellow-700"}`}>
                  {r.status}
                </span>
              </div>
              {r.status === "pending" && (
                <div className="flex gap-2">
                  <form action={markReminderComplete.bind(null, r.id)}>
                    <button type="submit" className="btn-secondary text-xs">Mark Complete</button>
                  </form>
                  <form action={markReminderSnoozed.bind(null, r.id)}>
                    <button type="submit" className="btn-secondary text-xs">Snooze</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
