import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignInFormClient from "./SignInForm.client";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "100px",
      }}
    >
      <SignInFormClient />
    </div>
  );
}
