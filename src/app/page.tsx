import { redirect } from "next/navigation";

export default function Home() {

  redirect("/home");
  return (
    <>
      <h1>Landing page del AI Form</h1>
    </>
  );
}
