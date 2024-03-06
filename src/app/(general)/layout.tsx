import Sidebar from "@/components/custom/sidebar/Sidebar";
import { useAppSelector } from "@/store";
import AuthProvider from "../auth/components/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1">
          <div className="lg:p-4 px-10 py-4 bg-slate-500 h-screen">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
