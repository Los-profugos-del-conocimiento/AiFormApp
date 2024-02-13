import Sidebar from "../../components/custom/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-slate-700 p-4">{children}</div>
    </div>
  );
}
