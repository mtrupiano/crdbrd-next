import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  return <div className="py-4 px-8">{children}</div>;
}
