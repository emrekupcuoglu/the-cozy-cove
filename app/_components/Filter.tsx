"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const linkParams = new URLSearchParams(searchParams);

  function handleFilter(filter: string) {
    // const params = new URLSearchParams(window.location.search);
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      {/* <Button
        isActive={"all" === activeFilter}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </Button>
      <Button
        isActive={"small" === activeFilter}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </Button>
      <Button
        isActive={"medium" === activeFilter}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </Button>
      <Button
        isActive={"medium" === activeFilter}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </Button> */}

      <FilterLink
        isActive={"all" === activeFilter}
        filters={{ capacity: "all" }}
      >
        All cabins
      </FilterLink>
      <FilterLink
        isActive={"small" === activeFilter}
        filters={{ capacity: "small" }}
      >
        1&mdash;3 guests
      </FilterLink>
      <FilterLink
        isActive={"medium" === activeFilter}
        filters={{ capacity: "medium" }}
      >
        4&mdash;7 guests
      </FilterLink>
      <FilterLink
        isActive={"large" === activeFilter}
        filters={{ capacity: "large" }}
      >
        8&mdash;12 guests
      </FilterLink>
    </div>
  );
}

function Button({
  onClick,
  isActive,
  children,
  ...props
}: ComponentProps<"button"> & { isActive: boolean }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${isActive ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Filter;

function FilterLink({
  filters,
  children,
  isActive,
  ...props
}: ComponentProps<"a"> & {
  filters: Record<string, string>;
  isActive: boolean;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  Object.entries(filters).forEach(([key, value]) => {
    params.set(key, value);
  });

  const href = `${pathname}?${params.toString()}`;

  return (
    <Link
      className={`px-5 py-2 hover:bg-primary-700 ${isActive ? "bg-primary-700 text-primary-50" : ""}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
