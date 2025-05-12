import { createClient } from "@/lib/supabase/server";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";
import { CancelBookingButton } from "./cancel-button"; 

export const dynamic = "force-dynamic";

type SupabaseBookingResponse = {
  id: string;
  created_at: string;
  classes: {
    id: string;
    date: string;
    time: string;
    description: string;
    profiles: {
      full_name: string;
    }[];
  };
}[];

async function getUserBookings() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { upcoming: [], past: [] };
  }
  
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id,
      created_at,
      classes (
        id,
        date,
        time,
        description,
        profiles (
          full_name
        )
      )
    `)
    .eq("user_id", user.id);

  const bookings = data as SupabaseBookingResponse | null;
    
  if (error) {
    console.error("Error fetching user bookings:", error);
    return { upcoming: [], past: [] };
  }
  
  const now = new Date();
  
  const upcoming = (bookings ?? [])
    .filter(booking => {
      const classDate = parseISO(`${booking.classes.date}T${booking.classes.time}`);
      return classDate >= now;
    })
    .sort((a, b) => {
      const dateA = parseISO(`${a.classes.date}T${a.classes.time}`);
      const dateB = parseISO(`${b.classes.date}T${b.classes.time}`);
      return dateA.getTime() - dateB.getTime();
    });
    
  const past = (bookings ?? [])
    .filter(booking => {
      const classDate = parseISO(`${booking.classes.date}T${booking.classes.time}`);
      return classDate < now;
    })
    .sort((a, b) => {
      const dateA = parseISO(`${a.classes.date}T${a.classes.time}`);
      const dateB = parseISO(`${b.classes.date}T${b.classes.time}`);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
    
  return { upcoming, past };
}

export default async function MyBookingsPage() {
  const { upcoming, past } = await getUserBookings();
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          My Bookings
        </h1>
        
        {upcoming.length === 0 && past.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">You haven&#39;t booked any classes yet!</h2>
            <Button asChild>
              <Link href="/schedule">Browse Classes</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Classes</h2>
              {upcoming.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No upcoming bookings</p>
              ) : (
                <div className="grid gap-4">
                  {upcoming.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isPast={false}
                    />
                  ))}
                </div>
              )}
            </section>
            
            {past.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Past Classes</h2>
                <div className="grid gap-4">
                  {past.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isPast={true}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type Booking = {
  id: string;
  created_at: string;
  classes: {
    id: string;
    date: string;
    time: string;
    description: string;
    profiles: {
      full_name: string;
    }[];
  };
};

function BookingCard({ booking, isPast }: { booking: Booking; isPast: boolean }) {
  const classDate = parseISO(`${booking.classes.date}T${booking.classes.time}`);
  
  return (
    <Card className={isPast ? "opacity-70" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{booking.classes.description}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{format(classDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Clock className="mr-2 h-4 w-4" />
              <span>{format(classDate, "h:mm a")}</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              Instructor: {booking.classes.profiles[0]?.full_name || "Unknown"}
            </div>
          </div>
          
          {!isPast && (
            <CancelBookingButton bookingId={booking.id} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}