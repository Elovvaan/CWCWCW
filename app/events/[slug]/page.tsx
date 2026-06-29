import { featuredEvents } from "@/lib/data";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { RsvpForm } from "@/components/events/rsvp-form";

type EventDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetail({ params }: EventDetailProps) {
  const { slug } = await params;
  const event = featuredEvents.find((e) => e.slug === slug);

  if (!event) {
    return notFound();
  }

  return (
    <section className="section-shell">
      <article className="card">
        <p className="text-xs uppercase tracking-widest text-gold">{event.category}</p>
        <h1 className="text-4xl">{event.title}</h1>
        <p className="mt-2">
          {format(event.date, "PPPP")} &bull; {event.time} &bull; {event.location}
        </p>
        <p className="mt-3 text-slate-600">
          Join us for this special gathering. RSVP below to secure your spot and receive reminders.
        </p>
        <RsvpForm eventSlug={slug} />
      </article>
    </section>
  );
}
