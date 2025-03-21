import { auth } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className="bg-blue-950 w-full h-28 flex items-center justify-between px-8">
      <a href="/">
        <span className="text-2xl text-white">Home</span>
      </a>
      {session && (
        <span className="text-white">Hello {session?.user?.email}</span>
      )}
      {session && <SignOutButton />}
    </nav>
  );
}
