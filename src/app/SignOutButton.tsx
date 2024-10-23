"use client";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return <Button onClick={signOut}>Sign Out</Button>;
}
