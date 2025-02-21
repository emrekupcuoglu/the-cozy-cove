import { unstable_noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();

  // We can not easily opt out of caching because we are not using the native fetch function here. We are using the supabase client API. We can use the noStore function to opt out of caching or we can also use Reacts cache function to opt out of caching (not included in the course)
  // unstable_noStore();

  // * Telling the next.js to opt this component out of caching will cause the whole route to be out of caching (unless using PPR)

  // ! NEXT 15
  // connection replaces unstable_noStore to better align with the future of Next.js.
  // The function is only necessary when dynamic rendering is required and common Dynamic APIs are not used.

  if (!Array.isArray(cabins) || !cabins.length) return null;

  let displayedCabins = cabins;

  switch (filter) {
    case "all":
      displayedCabins = cabins;
      break;
    case "small":
      displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity && cabin.maxCapacity <= 3,
      );
      break;
    case "medium":
      displayedCabins = cabins.filter(
        (cabin) =>
          cabin.maxCapacity && cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
      );
      break;
    case "large":
      displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity && cabin.maxCapacity >= 8,
      );
      break;
    default:
      displayedCabins = cabins;
      break;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
