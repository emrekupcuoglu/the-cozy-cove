import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateMetadata({
  params: { cabinId },
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(Number(cabinId));
  if (!cabin) return notFound();

  return { title: `Cabin ${cabin.name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => {
    return { cabinId: cabin.id.toString() };
  });

  return ids;
}

// Any page or layout gets access to the params prop
export default async function Page({
  params: { cabinId },
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(Number(cabinId));

  if (!cabin) return notFound();

  const { name } = cabin;

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
