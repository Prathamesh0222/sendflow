"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserDropdown = () => {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border mx-12 p-3 rounded-full bg-blue-800 hover:bg-blue-900">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-md text-center">
          {session.data?.user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-blue-800" />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;