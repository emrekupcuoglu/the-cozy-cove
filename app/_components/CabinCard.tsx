import { UsersIcon } from "@heroicons/react/24/solid";
import { Tables } from "../database.types";
import Image from "next/image";
import Link from "next/link";

function CabinCard({
  cabin,
}: {
  cabin: Omit<Tables<"cabins">, "created_at" | "description">;
}) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col border border-primary-800 md:flex-row">
      {/* Image container with fixed width */}
      <div className="relative h-48 md:h-auto md:w-1/3">
        <Image
          src={image || ""}
          alt={`Cabin ${name}`}
          className="border-r border-primary-800 object-cover object-center"
          fill
        />
      </div>

      {/* Content container */}
      <div className="flex flex-grow flex-col">
        <div className="bg-primary-950 px-7 pb-4 pt-5">
          {/* Cabin name with text overflow control */}
          <h3 className="mb-3 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {regularPrice !== null && discount !== null && discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-primary-800 px-6 py-4 transition-all hover:bg-accent-600 hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
