import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SUPABASE_KEY EXISTS =",
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);