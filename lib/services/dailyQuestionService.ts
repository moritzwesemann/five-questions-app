import { supabase } from "@/lib/supabase/client";

export async function getQuestion() {
  const { data, error } = await supabase.from("questions").select();

  if (!data || data.length === 0) {
    console.log(error);
    return;
  }
  return data;
}
