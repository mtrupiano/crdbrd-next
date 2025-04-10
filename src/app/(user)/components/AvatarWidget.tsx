"use client";

import { useEffect, useState, useRef } from "react";
import { Session } from "next-auth";
import { signOut } from "@/lib/auth/helpers";
import DownIcon from "@/app/assets/Down-Line--Streamline-Mingcute.svg";

export default function AvatarWidget({
  session,
}: Readonly<{
  session: Session;
}>) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      widgetRef.current &&
      !widgetRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={widgetRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-sm px-3 py-1.5 border border-steel-blue-100 text-steel-blue-100 rounded-md flex items-center cursor-pointer"
      >
        {session?.user?.email}
        <DownIcon height="22" width="22" className="ml-1" />
      </div>

      <div
        className={
          "py-1 flex flex-col rounded-sm absolute top-[45px] bg-white right-0 origin-top-right border border-steel-blue-200 text-sm shadow-lg" +
          ` ${showDropdown ? "" : "hidden"}`
        }
        role="menu"
        ref={dropdownRef}
      >
        <a href="/" role="menuitem">
          <button className="px-3 py-1 w-full cursor-pointer text-left hover:bg-gray-200 ">
            Collections
          </button>
        </a>
        <button
          className="px-3 py-1 w-full cursor-pointer text-left hover:bg-gray-200"
          onClick={() => signOut()}
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
