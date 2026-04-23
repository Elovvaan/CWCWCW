import { featuredEvents } from "@/lib/data";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = featuredEvents.find((e) => e.slug === slug);
  if (!event) return notFound();
  return <section className="section-shell"><article className="card"><p className="text-xs uppercase tracking-widest text-gold">{event.category}</p><h1 className="text-4xl">{event.title}</h1><p className="mt-2">{format(event.date, "PPPP")} • {event.time} • {event.location}</p><p className="mt-3 text-slate-600">This event page supports title, date, time, location, description, image, free/paid label, RSVP, and reminders.</p></article></section>;
}
