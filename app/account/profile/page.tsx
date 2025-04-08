import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getCountries, getGuest } from "@/app/_lib/data-service";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) redirect("/login");
  const guestPromise = getGuest(session.user.email);
  const countriesPromise = getCountries();

  const [guestResult, countriesResult] = await Promise.allSettled([
    guestPromise,
    countriesPromise,
  ]);

  if (guestResult.status === "rejected") notFound();

  const guest = guestResult.value;
  const countries =
    countriesResult.status === "fulfilled" ? countriesResult.value : [];

  if (!guest) redirect("/login");
  const { nationality } = guest;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm
        guest={guest}
        countries={countries}
      ></UpdateProfileForm>
    </div>
  );
}
