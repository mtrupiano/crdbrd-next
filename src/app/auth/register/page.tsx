import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RegisterFormClient from "./RegisterForm.client";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    // TODO: apply styling/layout
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "100px",
      }}
    >
      <RegisterFormClient />
    </div>
  );
}
