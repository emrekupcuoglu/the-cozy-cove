import { UsersIcon } from "@heroicons/react/24/solid";

function CabinCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col border border-primary-800 md:flex-row">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-primary-900 md:h-auto md:flex-auto">
        <div className="h-full w-full bg-primary-800" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-grow flex-col">
        {/* Cabin Details Skeleton */}
        <div className="bg-primary-950 px-7 pb-4 pt-4">
          {/* Cabin Name Skeleton */}
          <div className="mb-3 h-8 w-3/4 rounded bg-primary-800" />

          {/* Guests Skeleton */}
          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <div className="h-5 w-1/2 rounded bg-primary-800" />
          </div>

          {/* Price Skeleton */}
          <div className="flex items-baseline justify-end gap-3">
            <div className="h-8 w-2/6 rounded bg-primary-800" />
            {/* <div className="h-5 w-1/4 rounded bg-primary-800" /> */}
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <div className="inline-block border-l border-primary-800 px-6 py-4">
            <div className="h-6 w-32 rounded bg-primary-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinCardSkeleton;
