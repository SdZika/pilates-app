// lib/getUserBookings.ts
import { createClient } from "@/lib/supabase/client"; // Important: create a browser Supabase client!

export async function getUserBookings(): Promise<string[]> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("class_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }

  return bookings.map(b => b.class_id);
}
