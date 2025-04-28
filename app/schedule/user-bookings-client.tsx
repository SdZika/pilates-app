// app/schedule/user-bookings-client.tsx
"use client";

import { useEffect, useState } from "react";
import { ScheduleCalendar } from "./schedule-calendar";
import { getUserBookings } from "@/lib/getUserBookings"; // You should create this
// This assumes you move the fetching logic into a separate client function

interface ClassType {
  id: string;
  date: string;
  time: string;
  max_capacity: number;
  description: string;
  trainer_id: string;
  profiles: { full_name: string };
  current_bookings: number;
}

interface UserBookingsClientProps {
  classes: ClassType[];
}

export function UserBookingsClient({ classes }: UserBookingsClientProps) {
  const [userBookings, setUserBookings] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const bookings = await getUserBookings();
      setUserBookings(bookings);
    }

    fetchBookings();
  }, []);

  return (
    <ScheduleCalendar 
      classes={classes} 
      userBookings={userBookings}
    />
  );
}
