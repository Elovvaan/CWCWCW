import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-blush/70 bg-white">
      <div className="section-shell grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-2 text-lg">Christian Women Connecting</h3>
          <p className="text-sm text-slate-600">Connecting women through Christ, prayer, and purpose.</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Ministry Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/upper-room">Enter the Upper Room</Link></li>
            <li><Link href="/prayer-requests">Request Prayer</Link></li>
            <li><Link href="/events">Attend Our Next Event</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Give</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Venmo</a></li>
            <li><a href="#">Cash App</a></li>
            <li><Link href="/donate">Become a Monthly Partner</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Connect</h4>
          <p className="text-sm">Email: hello@cwconnectwomen.org</p>
          <p className="text-sm">Facebook: /cwconnectwomen</p>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Christian Women Connecting with Other Women Network</p>
    </footer>
  );
}
