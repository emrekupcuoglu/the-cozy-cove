import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
  throw new Error("Problem connecting to the database");
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
