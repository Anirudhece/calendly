import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <div className="flex justify-between items-center bg-blue-800 p-2">
      <Link href={"/"}>Scheduler</Link>
      <div className="flex space-x-5 	items-center">
        <Link passHref href="?create=true">
          <Button>Create event</Button>
        </Link>

        <SignedOut>
          {/* this will only render when user is not loged in */}
          <SignInButton forceRedirectUrl="/dashboard">
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* this will only render when user is loged in */}
          <UserMenu />
        </SignedIn>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;