"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservationContext } from "../_contexts/ReservationContext";
import { Tables } from "../_lib/supabase/database.types";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  if (range.from === undefined || range.to === undefined) return false;

  const start = range.from;
  const end = range.to;

  return (
    range.from &&
    range.to &&
    datesArr.some((date) => isWithinInterval(date, { start, end }))
  );
}

function DateSelector({
  settings,
  cabin,
  bookedDates,
}: {
  settings: any;
  cabin: Tables<"cabins">;
  bookedDates: Date[];
}) {
  // CHANGE

  const { regularPrice, discount } = cabin;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  const { range, setRange, resetRange } = useReservationContext();

  if (!range) return null;
  if (!regularPrice) throw new Error("Unexpected error");

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  const numNights =
    displayRange.to && displayRange.from
      ? differenceInDays(displayRange.to, displayRange.from)
      : null;

  const cabinPrice = numNights && numNights * (regularPrice - Number(discount));

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        onSelect={(range) => setRange(range)}
        selected={displayRange}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear(), 5 * 12)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) => {
          if (
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          )
            return true;

          return false;
        }}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {Number(discount) > 0 ? (
              <>
                <span className="text-2xl">
                  ${regularPrice - Number(discount)}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">
                  $
                  {cabinPrice
                    ? cabinPrice
                    : "There has been an error please contact us for more information"}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
