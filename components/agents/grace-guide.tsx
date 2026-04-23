import Link from "next/link";
import { graceGuide } from "@/lib/agents";

export function GraceGuidePanel() {
  const options = graceGuide();
  return (
    <section className="card">
      <h3 className="mb-3 text-2xl">Grace Guide</h3>
      <p className="mb-4 text-sm text-slate-600">Your next faith-filled step is here.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {options.map((item) => (
          <div key={item.title} className="rounded-xl border border-blush/60 p-4">
            <h4 className="font-semibold">{item.title}</h4>
            <p className="my-2 text-sm text-slate-600">{item.description}</p>
            <Link href={item.href} className="text-sm font-semibold text-sage">{item.cta}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
