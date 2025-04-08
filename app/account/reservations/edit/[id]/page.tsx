import SpinnerMini from "@/app/_components/SpinnerMini";
import SubmitButton from "@/app/_components/SubmitButton";

import { updateBookingAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  // CHANGE

  const session = await auth();

  if (!session || !session.guestId) redirect("/login");
  const booking = await getBooking(Number(id));

  booking.guestId !== session.guestId && redirect("/account/reservations");

  if (booking.cabins?.maxCapacity === null)
    throw new Error("Cabin information not found");

  console.log("booking", booking);
  const reservationId = id;

  const maxCapacity = booking.cabins?.maxCapacity;

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBookingAction.bind(null, id)}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={booking.numGuests || ""}
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity || 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={booking.observations || ""}
            name="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton fallback={<SpinnerMini />}>
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
