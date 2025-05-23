//import { useState } from 'react';
import Link from "next/link";
import { Calendar, Clock, User,  ChevronRight,  } from 'lucide-react'; //Bell, Bookmark?
//import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getAllClassAttendees } from "./admin/page";
import { trainers } from "@/constants/trainers";

export default async function HomePage() {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const upcomingClasses = [
  //   {
  //     id: 1,
  //     title: "Mat Pilates",
  //     instructor: "Emma Johnson",
  //     time: "Today, 10:00 AM",
  //     spots: 3
  //   },
  //   {
  //     id: 2,
  //     title: "Reformer Flow",
  //     instructor: "Michael Stevens",
  //     time: "Tomorrow, 9:30 AM",
  //     spots: 1
  //   },
  //   {
  //     id: 3,
  //     title: "Core Strength",
  //     instructor: "Sophie Chen",
  //     time: "May 9, 8:15 AM",
  //     spots: 5
  //   }
  // ];

  const upcoming = await getAllClassAttendees();
  const upcomingThree = upcoming.slice(0, 3);
  
  // const recommendations = [
  //   {
  //     id: 1,
  //     title: "Pilates for Back Pain",
  //     instructor: "Dr. Lisa Adams",
  //     duration: "45 min",
  //     level: "Beginner"
  //   },
  //   {
  //     id: 2,
  //     title: "Advanced Reformer",
  //     instructor: "James Wilson",
  //     duration: "60 min",
  //     level: "Advanced"
  //   }
  // ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome back{user ? `, ${user.user_metadata.full_name}` : ""}!
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Ready for your next Pilates session?</p>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          
          <Button asChild
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <Link href="/schedule">
              <Calendar className="h-6 w-6" />
              <span className="font-medium">Book Class</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 dark:border-gray-800"
          >
            <Link href="/my-bookings">
              <Clock className="h-6 w-6" />
              <span className="font-medium">My Bookings</span>
            </Link>
          </Button>
          
          {/*<Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 dark:border-gray-800"
          >
            <Bookmark className="h-6 w-6" />
            <span className="font-medium">Saved Classes</span>
          </Button>*/} 
        </section>

        {/* Upcoming Classes */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Upcoming Classes</h3>
            <Link 
              href="/schedule" 
              className="text-sm font-medium flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingThree.map(item => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.description}</h4>
                  
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.profiles?.[0]?.full_name || "Instructor"}</p>
                  <p className="text-sm flex items-center mt-auto pt-3 text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" /> {item.date} at {item.time}
                  </p>
                  {/*<Button className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Book Now
                  </Button>*/}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended for You */}
        {/*<section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recommended for You</h3>
            <Link 
              href="/recommendations" 
              className="text-sm font-medium flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map(item => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.instructor}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {item.duration}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {item.level}
                    </span>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Book Class
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>*/} 

        {/* Featured Instructors */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Featured Instructors</h3>
            <Link 
              href="/about#trainers" 
              className="text-sm font-medium flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {trainers.slice(0,4).map((trainer, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mb-3">
                  <User className="h-8 w-8" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{trainer.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{trainer.role}</p>
                <Link href={`/about#trainer-${trainer.id}`}>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Profile
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