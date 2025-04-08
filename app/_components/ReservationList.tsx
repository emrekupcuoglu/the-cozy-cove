"use client";
import { useOptimistic } from "react";
import { deleteBookingAction } from "../_lib/actions";
import { Tables } from "../_lib/supabase/database.types";
import ReservationCard from "./ReservationCard";

function ReservationList({
  bookings,
}: {
  bookings: (Pick<
    Tables<"bookings">,
    | "id"
    | "created_at"
    | "startDate"
    | "endDate"
    | "numNights"
    | "numGuests"
    | "totalPrice"
    | "guestId"
    | "cabinId"
  > & {
    cabins: { name: string | null; image: string | null } | null;
  })[];
}) {
  // first argument is the current state, this is the value that will be returned in the beginning, and while there is no asynchronous action running, so while no server action is pending.
  // second argument is a setter function, the update function takes in the current state as the first argument, and it will also take whatever argument we pass into the setter function, setter functions returns the optimistic state.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBooking, bookingId: number) => {
      return currentBooking.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: string | number) {
    optimisticDelete(Number(bookingId));
    await deleteBookingAction(Number(bookingId));
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
