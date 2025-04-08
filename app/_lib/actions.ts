"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
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
