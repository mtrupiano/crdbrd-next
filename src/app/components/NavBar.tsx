import { auth } from "@/lib/auth";
import SignInButton from "./SignInButton";
import AvatarWidget from "../(user)/components/AvatarWidget";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className="bg-steel-blue-900 w-full h-20 flex items-center justify-between px-8">
      <a href="/">
        <span className="text-2xl text-white">Home</span>
      </a>

      {session && <AvatarWidget session={session} />}
      {!session && <SignInButton />}
    </nav>
  );
}
