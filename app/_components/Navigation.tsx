import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import Profile from "./Profile";
import { cookies } from "next/headers";

export default async function Navigation() {
  // This switches the route to a dynamic one from static because we are using cookies for the auth and cookies is a dynamic API, because the navigation is in every single route this makes all of our app dynamic
  // const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {/* {session?.user?.image ? (
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
                  src={session.user.image}
                  alt="image of the user"
                />
              </div>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )} */}

          <Profile />
        </li>
      </ul>
    </nav>
  );
}
