import { graceReminderAgent, provisionAgent } from "@/lib/agents";

export default function AdminDashboard() {
  const provision = provisionAgent();
  const reminder = graceReminderAgent();
  return <div className="space-y-4"><h1 className="text-3xl">Dashboard</h1><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Upcoming events","Prayer requests awaiting follow-up","New join requests","Donations count / totals","Reminders due today","Recent activity"].map((k)=><div key={k} className="card p-4 text-sm">{k}</div>)}</div><div className="card"><h2 className="text-2xl">Provision Agent</h2><ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{provision.map((p)=><li key={p}>{p}</li>)}</ul></div><div className="card"><h2 className="text-2xl">Grace Reminder Automations</h2><ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{reminder.automations.map((a)=><li key={a}>{a}</li>)}</ul></div></div>;
}
