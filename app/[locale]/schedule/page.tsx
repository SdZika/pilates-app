import { createClient } from "@/lib/supabase/server";
import { UserBookingsClient } from "./user-bookings-client";
import { WeeklyScheduleTable } from "@/components/WeeklyScheduleTable";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/i18n";
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
      profiles: Array.isArray(classItem.profiles) ? classItem.profiles[0] : classItem.profiles,
      current_bookings: bookingError ? 0 : (count || 0),
    };
  }));

  return classesWithBookings;
}

export default async function SchedulePage({params}: {params: Promise<{locale: Locale}>}) {
  
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const t = dictionary.Schedule;
  
  const classes = await getClasses();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 pt-20">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t.heading}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t.description}
          </p>
        </section>

         {/* Weekly Schedule Table */}
        <section className="mb-8">
          <WeeklyScheduleTable locale={locale}/>
        </section>

        {/* Schedule Client Component */}
        <section className="mb-8">
          <UserBookingsClient classes={classes} />
        </section>
      </main>
    </div>
  );
}
