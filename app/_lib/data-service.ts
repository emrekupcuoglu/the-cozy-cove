import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase/supabase";

import { Tables, TablesInsert, TablesUpdate } from "./supabase/database.types";

/////////////
// GET

// export async function getCabin(id: number): Promise<{
//   error: Error | null;
//   data: Tables<"cabins"> | null;
// }> {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("*")
//     .eq("id", id)
//     .single();

//   // For testing
//   // await new Promise((res) => setTimeout(res, 2000));

//   if (error) {
//     console.error(error);
//   }

//   if (!data) console.error("Cabin not found");

//   return { error, data };
// }

export async function getCabin(id: number) {
  try {
    const { data, error } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be loaded");
  }
}

// export async function getCabin(id: number): Promise<Tables<"cabins">> {

//   try {
//     const cabin = await getCabinAPI(id);
//     if (!cabin) notFound();
//     return cabin;
//   } catch (err) {
//     console.error(err);
//     notFound();
//   }

// }

export async function getCabinPrice(
  id: number,
): Promise<Pick<Tables<"cabins">, "regularPrice" | "discount">> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }
  if (!data) throw new Error("Cabin not found");
  if (data.regularPrice === null) throw new Error("Cabin price not found");
  if (data.discount === null)
    return { regularPrice: data.regularPrice, discount: 0 };

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(
  email: string,
): Promise<Tables<"guests"> | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*, cabins(maxCapacity)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: number) {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const today = date.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      if (!booking.startDate || !booking.endDate) return [];
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: TablesInsert<"guests">) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: TablesInsert<"bookings">) {
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

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: TablesUpdate<"guests">,
) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: TablesUpdate<"bookings">,
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
