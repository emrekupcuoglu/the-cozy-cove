"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  fallback,
  disabled,
}: {
  children: React.ReactNode | string;
  fallback?: React.ReactNode | string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {!pending ? children : fallback}
    </button>
  );
}
