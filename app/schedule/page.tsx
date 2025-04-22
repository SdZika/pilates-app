// import { createServerClient } from "@/lib/supabase";
// import { ScheduleCalendar } from "./schedule-calendar";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

// async function getClasses() {
//   const cookieStore = cookies();
//   const supabase = createServerClient();
  
//   const { data: classes, error } = await supabase
//     .from("classes")
//     .select(`
//       id,
//       date,
//       time,
//       max_capacity,
//       description,
//       trainer_id,
//       profiles(full_name)
//     `)
//     .order("date", { ascending: true })
//     .order("time", { ascending: true });

//   if (error) {
//     console.error("Error fetching classes:", error);
//     return [];
//   }

//   // For each class, get the number of bookings
//   for (const classItem of classes) {
//     const { count, error: bookingError } = await supabase
//       .from("bookings")
//       .select("*", { count: "exact", head: true })
//       .eq("class_id", classItem.id);
    
//     if (bookingError) {
//       console.error("Error counting bookings:", bookingError);
//       classItem.current_bookings = 0;
//     } else {
//       classItem.current_bookings = count || 0;
//     }
//   }

//   return classes;
// }

// async function getUserBookings() {
//   const cookieStore = cookies();
//   const supabase = createServerClient();
  
//   const { data: { session } } = await supabase.auth.getSession();
  
//   if (!session) {
//     return [];
//   }
  
//   const { data: bookings, error } = await supabase
//     .from("bookings")
//     .select("class_id")
//     .eq("user_id", session.user.id);
    
//   if (error) {
//     console.error("Error fetching user bookings:", error);
//     return [];
//   }
  
//   return bookings.map(booking => booking.class_id);
// }

// export default async function SchedulePage() {
//   const classes = await getClasses();
//   const userBookings = await getUserBookings();
  
//   return (
//     <div className="container mx-auto px-4 py-24">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//           Class Schedule
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
//           Browse available classes and book your spot. Each class has a maximum capacity of 15 participants.
//         </p>
        
//         <ScheduleCalendar 
//           classes={classes} 
//           userBookings={userBookings} 
//         />
//       </div>
//     </div>
//   );
// }