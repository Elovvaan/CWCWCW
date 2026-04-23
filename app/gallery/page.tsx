export default function GalleryPage() {
  const categories = ["Photos", "Videos", "Fellowship", "Prayer Nights", "Live Prayer Moments", "Conferences", "Retreats", "Outreach", "Giveaways"];
  return <section className="section-shell"><h1 className="mb-4 text-4xl">Gallery</h1><p className="mb-4 text-slate-600">CMS-managed gallery with categorized media.</p><div className="grid grid-cols-2 gap-4 md:grid-cols-3">{categories.map((c)=><div key={c} className="card flex aspect-square items-end p-3"><p className="rounded bg-white/80 px-2 py-1 text-xs">{c}</p></div>)}</div></section>;
}
