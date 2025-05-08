import { createClient } from "@/lib/supabase/server";
import { UserBookingsClient } from "./user-bookings-client"; // New small client component

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

export const dynamic = "force-dynamic";

async function getClasses(): Promise<ClassType[]> {
  const supabase = await createClient();
  
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
    .order("time", { ascending: true });

  if (error || !classes) {
    console.error("Error fetching classes:", error);
    return [];
  }

  const classesWithBookings: ClassType[] = await Promise.all(classes.map(async (classItem) => {
    const { count, error: bookingError } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("class_id", classItem.id);
    
    return {
      ...classItem,
      profiles: Array.isArray(classItem.profiles) ? classItem.profiles[0] : classItem.profiles, // Ensure profiles is a single object
      current_bookings: bookingError ? 0 : (count || 0),
    };
  }));

  return classesWithBookings;
}

export default async function SchedulePage() {
  const classes = await getClasses();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Class Schedule
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Browse available classes and book your spot. Each class has a maximum capacity of 15 participants.
        </p>

        {/* ScheduleCalendar expects userBookings */}
        <UserBookingsClient classes={classes} />
      </div>
    </div>
  );
}
