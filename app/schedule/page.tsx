// SchedulePage.tsx
import { createServerClient } from "@/lib/supabase";
import { ScheduleCalendar } from "./schedule-calendar";
import { UserBookings } from "../../components/UserBookings"; // Import the UserBookings component
import { PostgrestError } from '@supabase/supabase-js';

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

interface RawClassType {
  id: string;
  date: string;
  time: string;
  max_capacity: number;
  description: string;
  trainer_id: string;
  profiles: { full_name: string };
}

export const dynamic = "force-dynamic";

// Function to get classes (no user-specific data needed)
async function getClasses(): Promise<ClassType[]> {
  const supabase = createServerClient();
  
  const { data: classes, error } = await supabase
    .from("classes")
    .select(`
      id,
      date,
      time,
      max_capacity,
      description,
      trainer_id,
      profiles!inner(full_name)
    `)
    .order("date", { ascending: true })
    .order("time", { ascending: true }) as { data: RawClassType[] | null, error: PostgrestError | null };

  if (error || !classes) {
    console.error("Error fetching classes:", error);
    return [];
  }

  // For each class, get the number of bookings
  const classesWithBookings: ClassType[] = await Promise.all(classes.map(async (classItem) => {
    const { count, error: bookingError } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("class_id", classItem.id);
    
    return {
      id: classItem.id,
      date: classItem.date,
      time: classItem.time,
      max_capacity: classItem.max_capacity,
      description: classItem.description,
      trainer_id: classItem.trainer_id,
      profiles: { full_name: classItem.profiles.full_name },
      current_bookings: bookingError ? 0 : (count || 0)
    };
  }));

  return classesWithBookings;
}

// Main SchedulePage component
export default async function SchedulePage() {
  const classes = await getClasses(); // Fetch classes data on the server-side
  const userBookings = await UserBookings(); // Fetch user bookings on the client-side

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Class Schedule
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Browse available classes and book your spot. Each class has a maximum capacity of 15 participants.
        </p>
        
        <ScheduleCalendar 
          classes={classes} 
          userBookings={userBookings} 
        />
      </div>
    </div>
  );
}
