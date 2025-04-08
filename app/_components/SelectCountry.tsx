"use client";

import { useFormStatus } from "react-dom";

function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
  countries,
}: {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
  countries: any[];
}) {
  const { pending } = useFormStatus();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={`${className} disabled:text-gray-300" disabled:cursor-not-allowed disabled:bg-gray-500`}
      disabled={pending}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
