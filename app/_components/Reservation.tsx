import { notFound } from "next/navigation";
import {
  getBookedDatesByCabinId,
  getCabin,
  getSettings,
} from "../_lib/data-service";
import { Tables } from "../database.types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }: { cabin: Tables<"cabins"> }) {
  // We passed the cabin from the page.tsx because getCabin doesn't use the native fetch API but instead uses the custom supabase client, because of this request memoization is not possible. We can either use the React's cache function or just pass the cabin as a prop.

  const settingsPromise = getSettings();
  const bookedDatesPromise = getBookedDatesByCabinId(Number(cabin.id));

  const session = await auth();

  const [settingsResult, bookedDatesResult] = await Promise.allSettled([
    settingsPromise,
    bookedDatesPromise,
  ]);
  const settings =
    settingsResult.status === "fulfilled" ? settingsResult.value : null;
  const bookedDates =
    bookedDatesResult.status === "fulfilled" ? bookedDatesResult.value : null;

  if (!settings) return notFound();
  if (!bookedDates) return notFound();

  return (
    <div className="mb-10 grid min-h-[25rem] grid-cols-2 border border-primary-800 text-accent-400">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
