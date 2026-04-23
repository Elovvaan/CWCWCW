import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-shell grid gap-4 md:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>{children}</div>
    </section>
  );
}
