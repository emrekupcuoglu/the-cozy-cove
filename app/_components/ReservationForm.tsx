"use client";
import { max } from "date-fns";
import { useReservationContext } from "../_contexts/ReservationContext";
import { Tables } from "../database.types";
import { notFound } from "next/navigation";
import { User } from "next-auth";
import Image from "next/image";

function ReservationForm({
  cabin,
  user,
}: {
  cabin: Tables<"cabins">;
  user: User;
}) {
  // CHANGE
  const { maxCapacity } = cabin;

  if (!maxCapacity) notFound();

  const { range } = useReservationContext();

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              // Important to display google profile images
              fill
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
              src={user.image || ""}
              alt={user.name || "user avatar"}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
