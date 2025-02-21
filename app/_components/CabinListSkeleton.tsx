import CabinCardSkeleton from "./CabinCardSkeleton";

function CabinListSkeleton() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-14">
      {arr.map((cabin, i) => (
        <CabinCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default CabinListSkeleton;
