"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

import SpinnerMini from "./SpinnerMini";

function DeleteReservation({
  bookingId,
  onDelete,
}: {
  bookingId: number;
  onDelete: (bookingId: number | string) => Promise<void>;
}) {
  // We can use the useFormStatus/useFormAction because we are not using a form here, we are just deleting a reservation. We can use useTransition hook for this

  // ? useTransition
  // useTransition is allows us to mark a state update as a "transition", when a state update is marked as a transition that state update will happen without blocking the UI. Which means that the UI will stay responsive during a render and we also get an indication that the state transition is happening.
  // In react we can use this hook to make the UI more responsive when we are doing a state update that takes a long time to complete.
  // In nextjs we can also mark server actions as transitions too.

  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    // if (confirm("Are you sure you want to delete this reservation?"))
    startTransition(async () => await onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
