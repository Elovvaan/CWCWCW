import Link from "next/link";

const links = [
  ["Dashboard", "/admin/dashboard"], ["Members / Leads", "/admin/members"], ["Events", "/admin/events"], ["Upper Room", "/admin/upper-room"], ["Prayer Requests", "/admin/prayer-requests"], ["Donations", "/admin/donations"], ["Funding / Provision Agent", "/admin/funding"], ["Gallery", "/admin/gallery"], ["Reminders Center", "/admin/reminders"], ["Forms / Applications", "/admin/forms"], ["Settings", "/admin/settings"]
] as const;

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-soft">
      <h2 className="mb-4 text-lg">Admin</h2>
      <nav className="space-y-2 text-sm">
        {links.map(([name, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-cream">{name}</Link>)}
      </nav>
    </aside>
  );
}
