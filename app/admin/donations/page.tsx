import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function DonationsAdminPage() {
  const [campaigns, donations] = await Promise.all([
    prisma.donationCampaign.findMany({ orderBy: { id: "asc" } }),
    prisma.donation.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const followUpNeeded = donations.filter((d) => d.followUpNeeded);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Donations</h1>

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Total Recorded</p>
          <p className="mt-1 text-3xl font-bold">{donations.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Total Amount</p>
          <p className="mt-1 text-3xl font-bold">${totalDonated.toFixed(2)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Needs Follow-Up</p>
          <p className="mt-1 text-3xl font-bold">{followUpNeeded.length}</p>
        </div>
      </div>

      {/* Donation Campaigns */}
      <section>
        <h2 className="mb-3 text-2xl">Active Campaigns</h2>
        {campaigns.length === 0 && <p className="text-sm text-slate-500">No campaigns yet. Use the API to create campaigns.</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          {campaigns.map((c) => (
            <div key={c.id} className={`card ${!c.active ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{c.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs ${c.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {c.active ? "active" : "inactive"}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              <p className="text-xs text-slate-500">Cause: {c.cause}</p>
              {c.targetAmount && <p className="text-xs text-slate-500">Target: ${c.targetAmount}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Donor Records */}
      <section>
        <h2 className="mb-3 text-2xl">Donor Records ({donations.length})</h2>
        <p className="mb-2 text-sm text-slate-500">
          Note: Venmo / Cash App donations must be logged manually via the API.
        </p>
        {donations.length === 0 && <p className="text-sm text-slate-500">No donations recorded yet.</p>}
        <div className="space-y-2">
          {donations.map((d) => (
            <div key={d.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{d.donorName ?? "Anonymous"}</p>
                  {d.donorEmail && <p className="text-xs text-slate-500">{d.donorEmail}</p>}
                  <p className="text-sm">${d.amount.toFixed(2)} via {d.method}</p>
                </div>
                <div className="flex flex-wrap gap-1 text-xs">
                  {d.followUpNeeded && <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">follow-up needed</span>}
                  {d.campaignId && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">campaign</span>}
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-400">{format(d.createdAt, "PPp")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
