import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { markPrayerRequestReviewed, setPrayerRequestUrgent } from "../actions";

export const dynamic = "force-dynamic";

export default async function PrayerRequestsAdminPage() {
  const requests = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Prayer Requests</h1>
      <p className="text-sm text-slate-500">{requests.length} total</p>

      {requests.length === 0 && (
        <div className="card text-sm text-slate-600">No prayer requests yet.</div>
      )}

      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="card space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{r.name ?? "Anonymous"}</p>
                {r.contact && <p className="text-xs text-slate-500">{r.contact}</p>}
                <p className="mt-1 text-sm">{r.request}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`rounded-full px-2 py-0.5 ${r.status === "reviewed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {r.status}
                </span>
                {r.urgent && <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-700">urgent</span>}
                {r.followUpRequested && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">follow-up</span>}
                {r.isPublic && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">public</span>}
              </div>
            </div>
            <p className="text-xs text-slate-400">{format(r.createdAt, "PPp")}</p>
            <div className="flex flex-wrap gap-2">
              {r.status !== "reviewed" && (
                <form action={markPrayerRequestReviewed.bind(null, r.id)}>
                  <button type="submit" className="btn-secondary text-xs">Mark Reviewed</button>
                </form>
              )}
              <form action={setPrayerRequestUrgent.bind(null, r.id)}>
                <input type="hidden" name="urgent" value={r.urgent ? "false" : "true"} />
                <button type="submit" className="btn-secondary text-xs">
                  {r.urgent ? "Remove Urgent" : "Mark Urgent"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
