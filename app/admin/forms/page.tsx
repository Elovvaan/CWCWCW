import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { markVolunteerReviewed, markMentorReviewed } from "../actions";

export const dynamic = "force-dynamic";

export default async function FormsAdminPage() {
  const [volunteers, mentors, contacts] = await Promise.all([
    prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.mentorApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Forms &amp; Applications</h1>

      {/* Volunteer Applications */}
      <section>
        <h2 className="mb-3 text-2xl">Volunteer Applications ({volunteers.length})</h2>
        {volunteers.length === 0 && <p className="text-sm text-slate-500">No applications yet.</p>}
        <div className="space-y-3">
          {volunteers.map((v) => (
            <div key={v.id} className="card space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{v.name}</p>
                  <p className="text-xs text-slate-500">{v.email}{v.phone ? ` • ${v.phone}` : ""}</p>
                  {v.notes && <p className="mt-1 text-sm">{v.notes}</p>}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${v.status === "reviewed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {v.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{format(v.createdAt, "PPp")}</p>
              {v.status !== "reviewed" && (
                <form action={markVolunteerReviewed.bind(null, v.id)}>
                  <button type="submit" className="btn-secondary text-xs">Mark Reviewed</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mentor Applications */}
      <section>
        <h2 className="mb-3 text-2xl">Mentor Applications ({mentors.length})</h2>
        {mentors.length === 0 && <p className="text-sm text-slate-500">No applications yet.</p>}
        <div className="space-y-3">
          {mentors.map((m) => (
            <div key={m.id} className="card space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.email}{m.phone ? ` • ${m.phone}` : ""}</p>
                  {m.notes && <p className="mt-1 text-sm">{m.notes}</p>}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${m.status === "reviewed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{format(m.createdAt, "PPp")}</p>
              {m.status !== "reviewed" && (
                <form action={markMentorReviewed.bind(null, m.id)}>
                  <button type="submit" className="btn-secondary text-xs">Mark Reviewed</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Messages */}
      <section>
        <h2 className="mb-3 text-2xl">Contact Messages ({contacts.length})</h2>
        {contacts.length === 0 && <p className="text-sm text-slate-500">No messages yet.</p>}
        <div className="space-y-3">
          {contacts.map((c) => (
            <div key={c.id} className="card space-y-1">
              <p className="font-semibold">{c.name}</p>
              <p className="text-xs text-slate-500">{c.email}</p>
              <p className="text-sm">{c.message}</p>
              <p className="text-xs text-slate-400">{format(c.createdAt, "PPp")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
