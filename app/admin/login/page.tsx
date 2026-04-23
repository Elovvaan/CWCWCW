export default function AdminLoginPage() {
  return <section className="section-shell"><form method="post" action="/api/admin/login" className="card mx-auto max-w-md space-y-3"><h1 className="text-3xl">Admin Login</h1><input name="email" className="w-full rounded-xl border p-3" placeholder="Admin email"/><input name="password" type="password" className="w-full rounded-xl border p-3" placeholder="Password"/><button className="btn-primary">Sign In</button></form></section>;
}
