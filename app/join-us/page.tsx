import { GraceGuidePanel } from "@/components/agents/grace-guide";

export default function JoinUsPage() {
  const forms = ["Join Community", "Volunteer", "Request Prayer", "Become Mentor"];
  return <section className="section-shell space-y-6"><h1 className="text-4xl">Join Us</h1><GraceGuidePanel />{forms.map((f)=><form key={f} className="card space-y-3"><h2 className="text-2xl">{f}</h2><input className="w-full rounded-xl border p-3" placeholder="Name"/><input className="w-full rounded-xl border p-3" placeholder="Email"/><textarea className="w-full rounded-xl border p-3" placeholder="How can we connect with you?"/><button className="btn-primary">Join the Sisterhood</button></form>)}</section>;
}
