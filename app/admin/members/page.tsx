import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { markJoinRequestContacted } from "../actions";

export const dynamic = "force-dynamic";

export default async function MembersAdminPage() {
  const [joinRequests, subscriptions] = await Promise.all([
    prisma.joinRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.reminderSubscription.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Members & Leads</h1>

      {/* Join Requests */}
      <section>
        <h2 className="mb-3 text-2xl">Join Requests ({joinRequests.length})</h2>
        {joinRequests.length === 0 && <p className="text-sm text-slate-500">No join requests yet.</p>}
        <div className="space-y-3">
          {joinRequests.map((j) => (
            <div key={j.id} className="card space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{j.name}</p>
                  <p className="text-xs text-slate-500">{j.email}{j.phone ? ` • ${j.phone}` : ""}</p>
                  {j.notes && <p className="mt-1 text-sm">{j.notes}</p>}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${j.status === "contacted" ? "bg-green-100 text-green-700" : j.status === "closed" ? "bg-slate-100 text-slate-500" : "bg-yellow-100 text-yellow-700"}`}>
                  {j.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{format(j.createdAt, "PPp")}</p>
              {j.status === "new" && (
                <form action={markJoinRequestContacted.bind(null, j.id)}>
                  <button type="submit" className="btn-secondary text-xs">Mark Contacted</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Reminder Subscriptions */}
      <section>
        <h2 className="mb-3 text-2xl">Reminder Subscriptions ({subscriptions.length})</h2>
        {subscriptions.length === 0 && <p className="text-sm text-slate-500">No subscriptions yet.</p>}
        <div className="space-y-2">
          {subscriptions.map((s) => (
            <div key={s.id} className="card">
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs text-slate-500">
                {[s.email, s.phone].filter(Boolean).join(" • ")}
              </p>
              <div className="mt-1 flex flex-wrap gap-1 text-xs">
                {s.prayerUpdates && <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">prayer updates</span>}
                {s.eventReminders && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">event reminders</span>}
                {s.volunteerOpportunities && <span className="rounded-full bg-sage/20 px-2 py-0.5 text-sage">volunteer opps</span>}
              </div>
              <p className="mt-1 text-xs text-slate-400">{format(s.createdAt, "PPp")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
