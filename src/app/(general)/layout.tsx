import Sidebar from "../../components/custom/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-white p-4">{children}</div>
    </div>
  );
}
