import SessionProtecter from "@/components/SessionProtecter";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAppSelector } from "@/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const cookieStore = cookies();
  // const token = cookieStore.get("aiform_token_420");

  // console.log(token);

  // if(!token) {
  //   redirect('https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=529497607039-ci9s8bc5qbfvl0o3ku39us2rscc2v52p.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fgoogle');
  // }
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
