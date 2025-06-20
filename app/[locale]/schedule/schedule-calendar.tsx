"use client";

import { useState } from "react";
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "react-feather";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "../../../context/UserContext";
import { useTranslations } from "next-intl";


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

interface ScheduleCalendarProps {
  classes: ClassType[];
  userBookings: string[];
}

export function ScheduleCalendar({ classes, userBookings }: ScheduleCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const supabase = createClient();
  const t = useTranslations("Schedule");
  
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const goToPreviousWeek = () => {
    setCurrentWeek(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeek(prev => addDays(prev, 7));
  };

  const handleBookClass = async (classId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
  
    setIsBooking(classId);
  
    const { error } = await supabase
      .from("bookings")
      .insert([{ class_id: classId, user_id: user.id }]);
  
    if (error) {
      if (error.code === "23505") {
        toast.error(t("alreadyBooked"));
      } else {
        toast.error(t("bookingFailed"), {
          description: error.message,
        });
      }
    } else {
      toast.success(t("bookingSuccess"), {
        description: t("bookingDescription"),
      });
  
      userBookings.push(classId); // Add to local state
    }
  
    setIsBooking(null);
    router.refresh();
  };
  

  const handleCancelBooking = async (classId: string) => {
    
    if (!user) {
      router.push("/login");
      return;
    }

    setIsBooking(classId);
    
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("class_id", classId)
      .eq("user_id", user.id);
      
    if (error) {
      toast.error(t("cancellationFailed"),{
        description: error.message,
      });
    } else {
      toast.success(t("success"),{
        description: t("cancellationSuccess"),
      });
      // Remove the cancelled class from the local userBookings state
      const index = userBookings.indexOf(classId);
      if (index > -1) {
        userBookings.splice(index, 1);
      }
    }
    
    setIsBooking(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-medium">
          {format(currentWeek, "MMMM d")} - {format(addDays(currentWeek, 6), "MMMM d, yyyy")}
        </h2>
        <Button variant="outline" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((date) => (
          <div key={date.toString()} className="space-y-4">
            <div className="text-center">
              <p className="font-medium">{t(`shortDays.${format(date, "EEE")}`)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(date, "MMM d")}
              </p>
            </div>

            {classes
              .filter((cls) => isSameDay(parseISO(cls.date), date))
              .map((cls) => {
                const isBooked = userBookings.includes(cls.id);
                const isFull = cls.current_bookings >= cls.max_capacity;
                const canBook = !isFull && !isBooked;
                
                return (
                  <Card key={cls.id} className="overflow-hidden">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{cls.time}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          {cls.current_bookings}/{cls.max_capacity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{cls.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Trainer: {cls.profiles.full_name}</p>
                      
                      {isBooked ? (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full" 
                          onClick={() => handleCancelBooking(cls.id)}
                          disabled={isBooking === cls.id}
                        >
                          {isBooking === cls.id ? t("cancelling") : t("cancelBooking")}
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="w-full" 
                          onClick={() => handleBookClass(cls.id)}
                          disabled={!canBook || isBooking === cls.id}
                        >
                          {isBooking === cls.id ? t("booking") : isFull ? t("classFull") : t("bookNow")}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
            {classes.filter((cls) => isSameDay(parseISO(cls.date), date)).length === 0 && (
              <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {t("noClassesSchedule")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}