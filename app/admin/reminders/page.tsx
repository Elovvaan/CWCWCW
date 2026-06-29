import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { markReminderComplete, markReminderSnoozed, createAdminReminder } from "../actions";

export const dynamic = "force-dynamic";

export default async function RemindersAdminPage() {
  const now = new Date();
  const [pending, overdue, complete] = await Promise.all([
    prisma.reminder.findMany({
      where: { status: "pending", dueAt: { gte: now } },
      orderBy: { dueAt: "asc" },
    }),
    prisma.reminder.findMany({
      where: { status: "pending", dueAt: { lt: now } },
      orderBy: { dueAt: "asc" },
    }),
    prisma.reminder.findMany({
      where: { status: { in: ["complete", "snoozed"] } },
      orderBy: { dueAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Reminders Center</h1>

      {/* Create Reminder */}
      <div className="card">
        <h2 className="text-xl">Create Reminder</h2>
        <form action={createAdminReminder} className="mt-3 grid gap-3">
          <input className="rounded-xl border p-3" name="title" placeholder="Title" required />
          <textarea className="rounded-xl border p-3" name="details" placeholder="Details (optional)" />
          <input className="rounded-xl border p-3" name="dueAt" type="datetime-local" required />
          <input className="rounded-xl border p-3" name="type" placeholder="Type (e.g. follow-up, upper-room)" required />
          <select className="rounded-xl border p-3" name="channel">
            <option value="in_app">In App</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
          <button type="submit" className="btn-primary">Create Reminder</button>
        </form>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl text-red-600">Overdue ({overdue.length})</h2>
          <ReminderList items={overdue} />
        </section>
      )}

      {/* Due / Upcoming */}
      <section>
        <h2 className="mb-2 text-xl">Upcoming ({pending.length})</h2>
        {pending.length === 0
          ? <p className="text-sm text-slate-500">No upcoming reminders.</p>
          : <ReminderList items={pending} />}
      </section>

      {/* Completed/Snoozed */}
      {complete.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl text-slate-400">Recent Completed / Snoozed</h2>
          <div className="space-y-2">
            {complete.map((r) => (
              <div key={r.id} className="card flex items-center justify-between gap-2 py-2 opacity-60">
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-xs text-slate-400">{format(r.dueAt, "PPp")} | {r.type} | {r.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ReminderList({ items }: { items: { id: string; title: string; details: string | null; dueAt: Date; type: string; channel: string; status: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((r) => (
        <div key={r.id} className="card space-y-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-medium">{r.title}</p>
              {r.details && <p className="text-sm text-slate-600">{r.details}</p>}
              <p className="text-xs text-slate-400">{format(r.dueAt, "PPp")} | {r.type} | {r.channel}</p>
            </div>
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">{r.status}</span>
          </div>
          <div className="flex gap-2">
            <form action={markReminderComplete.bind(null, r.id)}>
              <button type="submit" className="btn-secondary text-xs">Mark Complete</button>
            </form>
            <form action={markReminderSnoozed.bind(null, r.id)}>
              <button type="submit" className="btn-secondary text-xs">Snooze</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
