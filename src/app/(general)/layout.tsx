import SessionProtecter from "@/components/SessionProtecter";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProtecter>
      <Sidebar />
      <main className="flex-1">
        <div className="lg:p-4 px-6 py-4 bg-slate-500 h-screen overflow-y-auto">
          {children}
        </div>
      </main>
    </SessionProtecter>
  );
}
