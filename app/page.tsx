import Link from "next/link";
import { format } from "date-fns";
import { featuredEvents } from "@/lib/data";
import { GraceGuidePanel } from "@/components/agents/grace-guide";

const whatWeDo = ["Mentorship", "Community Outreach", "Conferences", "Retreats", "Giveaways", "Prayer Support", "Upper Room Prayer Nights", "Women Fellowship"];

export default function HomePage() {
  return (
    <div>
      <section className="section-shell">
        <div className="card text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Women’s Ministry</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Connecting Women Through Christ, Community &amp; Purpose</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">A women’s ministry focused on prayer, healing, mentorship, outreach, retreats, conferences, and sisterhood.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/join-us" className="btn-primary">Join Our Community</Link>
            <Link href="/donate" className="btn-secondary">Donate</Link>
            <Link href="/prayer-requests" className="btn-secondary">Request Prayer</Link>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0"><GraceGuidePanel /></section>
      <section className="section-shell grid gap-6 md:grid-cols-2">
        <div className="card"><h2 className="text-2xl">About the Ministry</h2><p className="mt-2 text-slate-600">We are a growing faith community helping women heal, grow, connect, and rise together through Christ.</p></div>
        <div className="card"><h2 className="text-2xl">Meet Founder Jane Carlysle</h2><p className="mt-2 text-slate-600">Jane leads with prayer, compassion, and a call to gather women for healing, encouragement, and purpose.</p></div>
      </section>
      <section className="section-shell pt-0"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{whatWeDo.map((item)=><div key={item} className="card p-4 text-center">{item}</div>)}</div></section>
      <section className="section-shell pt-0"><div className="card bg-sage/10"><h2 className="text-3xl">Enter The Upper Room</h2><p className="mt-2 text-slate-700">Join us as women gather in prayer, worship, encouragement, Bible study, and spiritual refreshing in The Upper Room. We meet on Tuesdays and Friday nights.</p><div className="mt-4 flex gap-3"><Link href="/upper-room" className="btn-primary">Join Prayer Night</Link><Link href="/join-us" className="btn-secondary">Get Reminders</Link></div></div></section>
      <section className="section-shell pt-0"><h2 className="mb-4 text-3xl">Events Preview</h2><div className="grid gap-4 md:grid-cols-2">{featuredEvents.map((e)=><article key={e.slug} className="card"><p className="text-xs uppercase tracking-wide text-gold">{e.category}</p><h3 className="mt-1 text-xl">{e.title}</h3><p className="text-sm text-slate-600">{format(e.date, "EEEE, MMM d")} • {e.time}</p><p className="text-sm text-slate-600">{e.location} • {e.priceLabel}</p><Link href={`/events/${e.slug}`} className="mt-3 inline-block text-sage font-semibold">Attend Our Next Event</Link></article>)}</div></section>
      <section className="section-shell pt-0"><div className="grid gap-4 md:grid-cols-3">{["I found healing through Tuesday prayer.","Friday nights in The Upper Room changed my faith.","This sisterhood helped me rediscover hope."].map((t)=><blockquote key={t} className="card italic">“{t}”</blockquote>)}</div></section>
      <section className="section-shell pt-0"><div className="card text-center"><h2 className="text-3xl">Support the Mission</h2><p className="mt-2 text-slate-600">Support outreach, women events, giveaways, prayer ministry, and growth.</p><div className="mt-4 flex flex-wrap justify-center gap-3"><button className="btn-secondary">Venmo</button><button className="btn-secondary">Cash App</button><Link href="/donate" className="btn-primary">Support the Mission</Link><Link href="/donate" className="btn-secondary">Become a Monthly Partner</Link></div></div></section>
      <section className="section-shell pt-0"><div className="card"><h2 className="text-3xl">Never Miss a Prayer Night</h2><form className="mt-4 grid gap-3 md:grid-cols-2"><input className="rounded-xl border p-3" placeholder="name"/><input className="rounded-xl border p-3" placeholder="phone"/><input className="rounded-xl border p-3 md:col-span-2" placeholder="email"/><label className="text-sm"><input type="checkbox" className="mr-2"/>I want prayer updates</label><label className="text-sm"><input type="checkbox" className="mr-2"/>I want event reminders</label><label className="text-sm md:col-span-2"><input type="checkbox" className="mr-2"/>I want volunteer opportunities</label><button className="btn-primary md:col-span-2">Get Reminders</button></form></div></section>
    </div>
  );
}
