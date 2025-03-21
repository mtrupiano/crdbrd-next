import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NavBar from "@/app/components/NavBar";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  return <>{children}</>;
}
