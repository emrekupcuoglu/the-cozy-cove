import { Metadata } from "next";
import Counter from "../_components/Counter";
import { useSession } from "next-auth/react";
import { auth } from "../_lib/auth";

export const metadata: Metadata = { title: "Guest Area" };
async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {firstName}!
      </h2>
    </div>
  );
}

export default Page;
