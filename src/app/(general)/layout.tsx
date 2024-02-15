import Sidebar from "@/components/custom/sidebar/Sidebar";
import { useAppSelector } from "@/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1">
        <div className="lg:p-4 px-10 py-4 bg-slate-500 h-screen">{children}</div>
      </main>
    </div>
  );
}

// className={`grow overflow-auto px-4 pt-4 pb-16`}
