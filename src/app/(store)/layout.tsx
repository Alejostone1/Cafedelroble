import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
