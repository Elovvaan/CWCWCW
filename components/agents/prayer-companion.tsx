import { prayerCompanion } from "@/lib/agents";

export function PrayerCompanionPanel() {
  const guide = prayerCompanion();
  return (
    <aside className="card bg-blush/40">
      <h3 className="text-xl">Prayer Companion</h3>
      <p className="mt-2 text-sm text-slate-700">{guide.encouragement}</p>
      <p className="mt-1 text-xs text-slate-500">Scripture: {guide.scripture}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.suggestedCategories.map((cat) => <span key={cat} className="rounded-full bg-white px-3 py-1 text-xs">{cat}</span>)}
      </div>
    </aside>
  );
}
