'use client';

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      variant="outline"
      className="text-white border-white hover:bg-white/10"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
} 