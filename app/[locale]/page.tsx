// import { useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getAllClassAttendees } from "../admin/page";
import { trainers } from "@/constants/trainers";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation'; // ✅ Use localized Link

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const upcoming = await getAllClassAttendees();
  const upcomingThree = upcoming.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 pt-20">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t("welcome")}{user ? `, ${user.user_metadata.full_name}` : ""}!
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{t("ready")}</p>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button
            asChild
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <Link href="/schedule">
              <Calendar className="h-6 w-6" />
              <span className="font-medium">{t("bookClass")}</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 dark:border-gray-800"
          >
            <Link href="/my-bookings">
              <Clock className="h-6 w-6" />
              <span className="font-medium">{t("myBookings")}</span>
            </Link>
          </Button>
        </section>

        {/* Upcoming Classes */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {t("upcoming")}
            </h3>
            <Link
              href="/schedule"
              className="text-sm font-medium flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
            >
              {t("viewAll")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingThree.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.description}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.profiles?.[0]?.full_name || t("instructor")}
                  </p>
                  <p className="text-sm flex items-center mt-auto pt-3 text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" /> {item.date} at {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Instructors */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t("featured")}</h3>
            <Link
              href="/about#trainers"
              className="text-sm font-medium flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
            >
              {t("viewAll")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {trainers.slice(0, 4).map((trainer, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mb-3">
                  <User className="h-8 w-8" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{trainer.name['en']}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{trainer.role['en']}</p>
                <Link href={`/about#trainer-${trainer.id}`}>
                  <Button variant="outline" size="sm" className="mt-3">
                    {t("viewProfile")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
