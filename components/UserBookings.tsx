"use client";

import { useAuth } from "@/context/supabase-auth-provider";
import { useEffect, useState } from "react";
import { createServerClient } from "@/lib/supabase";

export const UserBookings = () => {
  const { session } = useAuth(); // Use the custom context hook
  const [userBookings, setUserBookings] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      const fetchUserBookings = async () => {
        const supabase = createServerClient();
        const { data: bookings, error } = await supabase
          .from("bookings")
          .select("class_id")
          .eq("user_id", session.user.id);
        
        if (error) {
          console.error("Error fetching user bookings:", error);
        } else {
          setUserBookings(bookings.map(booking => booking.class_id.toString()));
        }
      };

      fetchUserBookings();
    }
  }, [session]);

  return userBookings;
};


