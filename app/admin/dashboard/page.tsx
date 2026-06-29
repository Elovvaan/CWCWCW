import { prisma } from "@/lib/prisma";
import { graceReminderAgent, provisionAgent } from "@/lib/agents";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    upcomingEvents,
    prayerFollowUp,
    newJoinRequests,
    remindersToday,
    donationsCount,
    recentActivity,
  ] = await Promise.all([
    prisma.event.count({ where: { date: { gte: new Date() } } }),
    prisma.prayerRequest.count({ where: { followUpRequested: true, status: "pending" } }),
    prisma.joinRequest.count({ where: { status: "new" } }),
    prisma.reminder.count({
      where: {
        status: "pending",
        dueAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
    prisma.donation.count(),
    prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const provision = provisionAgent();
  const reminder = graceReminderAgent();

  const stats = [
    { label: "Upcoming Events", value: upcomingEvents },
    { label: "Prayer Requests Needing Follow-Up", value: prayerFollowUp },
    { label: "New Join Requests", value: newJoinRequests },
    { label: "Donations Recorded", value: donationsCount },
    { label: "Reminders Due Today", value: remindersToday },
    { label: "Recent Activity Entries", value: recentActivity.length },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="card p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {recentActivity.length > 0 && (
        <div className="card">
          <h2 className="text-xl">Recent Activity</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {recentActivity.map((log) => (
              <li key={log.id}>
                <span className="font-medium">{log.actor}</span>{" - "}{log.action} on {log.entity}
                {log.entityId ? ` (${log.entityId})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2 className="text-2xl">Provision Agent</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          {provision.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
      <div className="card">
        <h2 className="text-2xl">Grace Reminder Automations</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          {reminder.automations.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}
