import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <div>Hello {JSON.stringify(session?.user)}</div>
      <SignOutButton />
    </>
  );
}
