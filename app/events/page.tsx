import Link from "next/link";
import { format } from "date-fns";
import { featuredEvents } from "@/lib/data";

export default function EventsPage() {
  return <section className="section-shell"><h1 className="mb-4 text-4xl">Events</h1><div className="grid gap-4 md:grid-cols-2">{featuredEvents.map((e)=><div key={e.slug} className="card"><h2 className="text-2xl">{e.title}</h2><p>{format(e.date, "PPP")} • {e.time}</p><p>{e.location}</p><p className="text-sm text-slate-600">Includes RSVP and reminder opt-in workflow.</p><div className="mt-3 flex gap-2"><Link className="btn-primary" href={`/events/${e.slug}`}>RSVP / Register</Link><button className="btn-secondary">Get Reminders</button></div></div>)}</div></section>;
}
