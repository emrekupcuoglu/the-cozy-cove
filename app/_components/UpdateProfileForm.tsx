"use client";
import { useFormStatus } from "react-dom";
import { updateProfileAction } from "../_lib/actions";
import { Tables } from "../_lib/supabase/database.types";
import SelectCountry from "./SelectCountry";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({
  guest,

  countries,
}: {
  guest: Tables<"guests">;
  countries: any[];
}) {
  return (
    <form
      action={updateProfileAction}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest?.fullName || ""}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={guest?.email || ""}
          disabled
          name="email"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest?.countryFlag && (
            <img
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {/* {children} */}
        <SelectCountry
          countries={countries}
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={guest.nationality || ""}
        />
      </div>

      <div className="space-y-2">
        <NationalID guest={guest} />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton fallback="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;

function NationalID({ guest }: { guest: Tables<"guests"> }) {
  const { pending } = useFormStatus();
  return (
    <>
      {" "}
      <label htmlFor="nationalID">National ID number</label>
      <input
        disabled={pending}
        name="nationalID"
        defaultValue={guest?.nationalID || ""}
        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      />
    </>
  );
}
