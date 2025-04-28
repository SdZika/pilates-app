// lib/getUserBookings.ts
import { createClientClient } from "@/lib/supabase"; // Important: create a browser Supabase client!

export async function getUserBookings(): Promise<string[]> {
  const supabase = createClientClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("class_id")
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }

  return bookings.map(b => b.class_id);
}
