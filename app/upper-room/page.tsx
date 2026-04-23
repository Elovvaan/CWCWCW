import Link from "next/link";
import { PrayerCompanionPanel } from "@/components/agents/prayer-companion";

export default function UpperRoomPage() {
  return <section className="section-shell space-y-4"><div className="card bg-white"><h1 className="text-4xl">The Upper Room</h1><p className="mt-3 text-slate-700">The Upper Room is our sacred gathering space where women meet for prayer, Bible study, encouragement, and seeking God’s presence.</p><p className="mt-2"><strong>Recurring gatherings:</strong> Tuesdays and Friday nights.</p><p className="mt-2">Special gatherings include Ladies Prayer Night, Upper Room Bible Study, and Becoming a Woman of Prayer.</p><div className="mt-4 flex gap-3"><Link href="/events" className="btn-primary">Join Prayer Night</Link><Link href="/join-us" className="btn-secondary">Get Reminders</Link></div></div><PrayerCompanionPanel /><div className="card"><p className="italic">“Come expecting God to move, heal, and restore.”</p></div></section>;
}
