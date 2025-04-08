"use server";

import { isWithinInterval } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateRange } from "react-day-picker";
import { auth, signIn, signOut } from "./auth";
import { getBookedDatesByCabinId, getCabin } from "./data-service";
import { supabase } from "./supabase/supabase";

export async function updateProfileAction(formData: FormData) {
  const session = await auth();

  // It is a common practice in server actions to NOT use try catch blocks, instead throw an error and the error will be caught by the closes error boundary
  // ! This is not a good user experience, we should not throw an redirect the user to another page. We should use form validation in the client side and handle that there first, but client side is not secure. So after that we should use a library like zod to do server side validation, and if there is a problem with the input we should inform the usr with an error message or a toast or both

  if (!session || !session.user || !session.guestId) {
    console.error("user is not logged in");
    throw new Error("you must be logged in");
  }

  const nationalID = formData.get("nationalID");
  if (typeof nationalID !== "string") {
    console.error("nationalID is not a string");
    throw new Error("Please provide a valid national ID");
  }

  const nationalityValue = formData.get("nationality");

  if (typeof nationalityValue !== "string") {
    console.error("nationalityValue is not a string");
    throw new Error("Something went wrong");
  }

  const [nationality, countryFlag] = nationalityValue.split("%");

  if (/^[A-Z0-9]{6,20}$/i.test(nationalID) === false) {
    console.error("nationalID is not valid");
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", Number(session.guestId))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  // We should revalidate the data if the server action changes the data showed on the screen
  revalidatePath("/account/profile");
}

type bookingData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number | undefined;
  cabinPrice: number;
  cabinId: number;
};

// ! This doesn't handle race conditions, if the user tries to book the same cabin at the same time, the server will allow it, we should use transactions to prevent this
export async function createBookingAction(
  bookingData: bookingData,
  formData: FormData,
) {
  const session = await auth();

  if (!session || !session.user || !session.guestId) {
    console.error("user is not logged in");
    throw new Error("you must be logged in");
  }
  const { numNights, cabinId, cabinPrice, endDate, startDate } = bookingData;

  if (endDate === undefined || startDate === undefined)
    throw new Error("Please provide a valid date range");

  if (
    numNights === undefined ||
    cabinId === undefined ||
    cabinPrice === undefined
  )
    throw new Error("Unexpected error, please contact us for more information");

  if (Number.isNaN(bookingData.numNights))
    throw new Error("Please provide a valid number of nights");

  if (numNights < 1) throw new Error("Please provide a valid number of nights");

  const numGuests = Number(formData.get("numGuests"));

  if (Number.isNaN(numGuests) || !Number.isInteger(numGuests) || numGuests < 1)
    throw new Error("Please provide a valid number of guests");

  const cabin = await getCabin(cabinId);

  if (!cabin || !cabin.id || !cabin.regularPrice)
    throw new Error("Unexpected error, please contact us for more information");
  const cabinPriceServer =
    Number(numNights) * (Number(cabin.regularPrice) - Number(cabin.discount));

  if (cabinPriceServer !== cabinPrice)
    throw new Error("Unexpected error, please contact us for more information");

  const newBooking = {
    ...bookingData,
    endDate: bookingData.endDate?.toISOString(),
    startDate: bookingData.startDate?.toISOString(),
    cabinPrice: cabinPriceServer,
    guestId: session.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString().slice(0, 1000),
    extrasPrice: 0,
    totalPrice: cabinPriceServer,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

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

  const bookedDates = await getBookedDatesByCabinId(Number(cabin.id));

  if (isAlreadyBooked({ from: startDate, to: endDate }, bookedDates)) {
    throw new Error("The cabin is already booked for the selected dates");
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thank-you");
}

export async function deleteBookingAction(bookingId: number) {
  const session = await auth();

  if (!session || !session.user || !session.guestId) {
    console.error("user is not logged in");
    throw new Error("you must be logged in");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.guestId); // Ensure the user owns the booking

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBookingAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session || !session.guestId) throw new Error("You must be logged in");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  if (!numGuests) throw new Error("Please provide a number of guests");

  const updatedFields = {
    numGuests: Number(numGuests),
    observations: observations?.toString().slice(0, 1000) || "",
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", Number(id))
    .eq("guestId", session.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut();
}
