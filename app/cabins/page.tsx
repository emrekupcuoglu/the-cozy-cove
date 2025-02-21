import { Metadata } from "next";

import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import CabinListSkeleton from "../_components/CabinListSkeleton";
import Filter from "../_components/Filter";
import { getCabins } from "../_lib/data-service";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata: Metadata = { title: "Cabins" };

// This makes the page revalidate every 0 seconds, which turns the page into a dynamic route
// export const revalidate = 0;
// ! The value can not be computed it has to be a value, so we can not first assign it to a variable and then use that variable here
// ! this worn work
// const time = 12
// export const revalidate = time * 5;
export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams: any }) {
  // searchParams makes the page dynamic so revalidate will be ignored because the page is already dynamic.

  console.log("searchParams", searchParams);

  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      {/* IMPORTANT */}
      {/* In nextjs the page navigations are wrapped in transitions using the useTransition hook. This causes the <Suspense/> to be NOT rendered on subsequent navigations. Because of this we only see the skeleton on the first page load but not when we filter the cabins. If we want to see the suspense fallback we need to use the key prop with a unique key value */}
      <Suspense fallback={<CabinListSkeleton />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
