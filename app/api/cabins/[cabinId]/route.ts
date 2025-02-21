// This can not be in a folder with a page.tsx inside because the server can only respond by sending and HTML or JSON. And if they are both in the same folder this causes a conflict.

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// To define the request types we create function corresponding to the HTTP methods e.g. GET or POST

export async function GET(
  request: Request,
  { params: { cabinId } }: { params: { cabinId: string } },
) {
  // const [{ error, data: cabin }, bookedDates] = await Promise.all([
  const [cabin, bookedDates] = await Promise.all([
    getCabin(Number(cabinId)),
    getBookedDatesByCabinId(Number(cabinId)),
  ]);

  // if (error instanceof Error) {
  //   return Response.json({ message: error.message }, { status: 500 });
  // }

  if (!cabin)
    return Response.json({ message: "Cabin not found" }, { status: 404 });

  // the route handlers use the web standart request and response objects
  return Response.json({ cabin, bookedDates });
}
