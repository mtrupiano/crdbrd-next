import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "./SignOutButton";
import CreateCollectionFormWrapper from "./CreateCollectionForm";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <div>Hello {JSON.stringify(session?.user)}</div>
      <SignOutButton />
      <CreateCollectionFormWrapper />
    </>
  );
}
