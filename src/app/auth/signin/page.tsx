import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInFormClient from "./SignInForm.client";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flext justify-center my-16">
      <SignInFormClient />
    </div>
  );
}
