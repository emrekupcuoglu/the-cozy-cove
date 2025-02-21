"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";

function Profile() {
  // This is not that useful to have on the client in a real app, because the user will have its avatar stored in our backend, so we need to hit the backend to get the user's avatar, to do that we can create an API endpoint like getUserPicture, and we can hit that endpoint to get the users picture from the client side, we can use the httpOnly cookies for that.
  const session = useSession();
  const sessionData = session.data;

  // const sessionData = await auth();

  if (sessionData?.user?.image)
    return (
      <Link
        href="/account"
        className="flex items-center gap-4 transition-colors hover:text-accent-400"
      >
        <div className="relative h-8 w-8 rounded-full">
          <Image
            // needed for google images
            referrerPolicy="no-referrer"
            fill
            className="h-8 rounded-full"
            src={sessionData.user.image}
            alt="image of the user"
          />
        </div>
        <span>Guest area</span>
      </Link>
    );

  return (
    <Link href="/account" className="transition-colors hover:text-accent-400">
      Guest area
    </Link>
  );
}

export default Profile;
