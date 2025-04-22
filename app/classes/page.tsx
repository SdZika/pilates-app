// // app/classes/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
// import { Calendar, Clock, Users } from "lucide-react";

// // You would replace this with your actual Supabase client setup
// import { createClientClient } from "@supabase/supabase-js";

// // TypeScript types
// type ClassLevel = "beginner" | "intermediate" | "advanced" | "all-levels";

// type PilatesClass = {
//   id: string;
//   name: string;
//   description: string;
//   instructor: string;
//   duration: number; // in minutes
//   level: ClassLevel;
//   capacity: number;
//   image: string;
//   category: string; // mat, reformer, etc.
// };

// type ClassSchedule = {
//   id: string;
//   classId: string;
//   day: string;
//   startTime: string;
//   endTime: string;
//   availableSpots: number;
// };

// export default function ClassesPage() {
//   const [classes, setClasses] = useState<PilatesClass[]>([]);
//   const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [activeLevel, setActiveLevel] = useState<ClassLevel | "all">("all");

//   // This would normally fetch data from Supabase
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         // This would be your actual Supabase client initialization and query
//         // const supabase = createClient('your-supabase-url', 'your-anon-key');
//         // const { data, error } = await supabase.from('classes').select('*');
//         // if (error) throw error;
        
//         // For demonstration, we'll use mock data
//         const mockClasses: PilatesClass[] = [
//           {
//             id: "1",
//             name: "Beginner Mat Pilates",
//             description: "Perfect for newcomers to Pilates. Focus on fundamental movements and proper breathing techniques.",
//             instructor: "Jane Smith",
//             duration: 45,
//             level: "beginner",
//             capacity: 15,
//             image: "/api/placeholder/500/300",
//             category: "mat"
//           },
//           {
//             id: "2",
//             name: "Intermediate Reformer",
//             description: "Take your practice to the next level with reformer exercises designed to challenge your core strength and flexibility.",
//             instructor: "Michael Johnson",
//             duration: 60,
//             level: "intermediate",
//             capacity: 8,
//             image: "/api/placeholder/500/300",
//             category: "reformer"
//           },
//           {
//             id: "3",
//             name: "Advanced Flow",
//             description: "A dynamic class that combines mat work with props for an intense full-body workout.",
//             instructor: "Sarah Williams",
//             duration: 75,
//             level: "advanced",
//             capacity: 12,
//             image: "/api/placeholder/500/300",
//             category: "flow"
//           },
//           {
//             id: "4",
//             name: "Pilates for Athletes",
//             description: "Specialized training focused on enhancing athletic performance through targeted core strengthening and flexibility work.",
//             instructor: "Michael Johnson",
//             duration: 60,
//             level: "intermediate",
//             capacity: 10,
//             image: "/api/placeholder/500/300",
//             category: "specialized"
//           },
//           {
//             id: "5",
//             name: "Gentle Reformer",
//             description: "A slower-paced reformer class ideal for beginners, seniors, or those recovering from injury.",
//             instructor: "Jane Smith",
//             duration: 45,
//             level: "beginner",
//             capacity: 8,
//             image: "/api/placeholder/500/300",
//             category: "reformer"
//           },
//           {
//             id: "6",
//             name: "Power Pilates",
//             description: "High-intensity mat-based workout that combines traditional Pilates with cardio elements for maximum results.",
//             instructor: "Sarah Williams",
//             duration: 60,
//             level: "advanced",
//             capacity: 15,
//             image: "/api/placeholder/500/300",
//             category: "mat"
//           },
//         ];

//         const mockSchedules: ClassSchedule[] = [
//           { id: "s1", classId: "1", day: "Monday", startTime: "09:00", endTime: "09:45", availableSpots: 8 },
//           { id: "s2", classId: "1", day: "Wednesday", startTime: "09:00", endTime: "09:45", availableSpots: 10 },
//           { id: "s3", classId: "1", day: "Friday", startTime: "09:00", endTime: "09:45", availableSpots: 7 },
//           { id: "s4", classId: "2", day: "Tuesday", startTime: "17:30", endTime: "18:30", availableSpots: 3 },
//           { id: "s5", classId: "2", day: "Thursday", startTime: "17:30", endTime: "18:30", availableSpots: 4 },
//           { id: "s6", classId: "3", day: "Monday", startTime: "18:00", endTime: "19:15", availableSpots: 6 },
//           { id: "s7", classId: "3", day: "Friday", startTime: "18:00", endTime: "19:15", availableSpots: 5 },
//           { id: "s8", classId: "4", day: "Tuesday", startTime: "07:00", endTime: "08:00", availableSpots: 4 },
//           { id: "s9", classId: "4", day: "Thursday", startTime: "07:00", endTime: "08:00", availableSpots: 6 },
//           { id: "s10", classId: "5", day: "Monday", startTime: "11:00", endTime: "11:45", availableSpots: 3 },
//           { id: "s11", classId: "5", day: "Wednesday", startTime: "11:00", endTime: "11:45", availableSpots: 5 },
//           { id: "s12", classId: "6", day: "Tuesday", startTime: "18:30", endTime: "19:30", availableSpots: 8 },
//           { id: "s13", classId: "6", day: "Thursday", startTime: "18:30", endTime: "19:30", availableSpots: 7 },
//         ];

//         setClasses(mockClasses);
//         setSchedules(mockSchedules);
//       } catch (err) {
//         console.error("Error fetching classes:", err);
//         setError("Failed to load classes. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter classes based on selected category and level
//   const filteredClasses = classes.filter(cls => {
//     const categoryMatch = activeCategory === "all" || cls.category === activeCategory;
//     const levelMatch = activeLevel === "all" || cls.level === activeLevel;
//     return categoryMatch && levelMatch;
//   });

//   // Get class schedules
//   const getClassSchedules = (classId: string) => {
//     return schedules.filter(schedule => schedule.classId === classId);
//   };

//   // Level badge color mapping
//   const levelBadgeColor = (level: ClassLevel) => {
//     switch (level) {
//       case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
//       case "intermediate": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
//       case "advanced": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
//       case "all-levels": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-24">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
//           Our Classes
//         </h1>
        
//         <div className="mb-12 text-center">
//           <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
//             Discover our range of Pilates classes designed to strengthen your core, improve flexibility, and enhance your overall wellbeing.
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-10">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-3">Class Type</h2>
//             <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
//               <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
//                 <TabsTrigger value="all">All Classes</TabsTrigger>
//                 <TabsTrigger value="mat">Mat</TabsTrigger>
//                 <TabsTrigger value="reformer">Reformer</TabsTrigger>
//                 <TabsTrigger value="flow">Flow</TabsTrigger>
//                 <TabsTrigger value="specialized">Specialized</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
          
//           <div>
//             <h2 className="text-lg font-semibold mb-3">Level</h2>
//             <Tabs
//               defaultValue="all"
//               value={activeLevel}
//               onValueChange={(value) => setActiveLevel(value as ClassLevel | "all")}
//             >
//               <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
//                 <TabsTrigger value="all">All Levels</TabsTrigger>
//                 <TabsTrigger value="beginner">Beginner</TabsTrigger>
//                 <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
//                 <TabsTrigger value="advanced">Advanced</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
        
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 p-6">
//             <p>{error}</p>
//           </div>
//         ) : filteredClasses.length === 0 ? (
//           <div className="text-center p-10 border rounded-lg">
//             <p className="text-xl font-medium mb-2">No classes found</p>
//             <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more classes.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredClasses.map((cls) => (
//               <Card key={cls.id} className="overflow-hidden flex flex-col">
//                 <div className="aspect-video relative">
//                   <Image 
//                     src={cls.image} 
//                     alt={cls.name} 
//                     fill 
//                     className="object-cover"
//                   />
//                 </div>
//                 <CardContent className="pt-6 flex-grow">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-semibold">{cls.name}</h3>
//                     <Badge className={levelBadgeColor(cls.level)} variant="outline">
//                       {cls.level.charAt(0).toUpperCase() + cls.level.slice(1)}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{cls.description}</p>
                  
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     <Clock className="h-4 w-4 mr-2" />
//                     <span>{cls.duration} minutes</span>
//                   </div>
                  
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     <Users className="h-4 w-4 mr-2" />
//                     <span>Max {cls.capacity} participants</span>
//                   </div>
                  
//                   <div className="text-sm text-gray-600 dark:text-gray-400">
//                     <p className="font-medium">Instructor: {cls.instructor}</p>
//                   </div>
//                 </CardContent>
                
//                 <div className="px-6 pb-4">
//                   <h4 className="text-sm font-semibold mb-2">Upcoming Sessions:</h4>
//                   <div className="space-y-2 mb-4">
//                     {getClassSchedules(cls.id).map((schedule) => (
//                       <div 
//                         key={schedule.id} 
//                         className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded"
//                       >
//                         <div className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
//                           <span>{schedule.day} • {schedule.startTime}-{schedule.endTime}</span>
//                         </div>
//                         <span className={`text-xs ${schedule.availableSpots <= 3 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
//                           {schedule.availableSpots} spots left
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <CardFooter className="pt-0">
//                   <Button className="w-full">Book Now</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}
        
//         <div className="mt-16">
//           <Card>
//             <CardContent className="pt-6">
//               <h2 className="text-2xl font-bold mb-4">Class Pricing</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="border rounded-lg p-6 text-center">
//                   <h3 className="text-xl font-semibold mb-2">Single Class</h3>
//                   <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">$25</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Perfect for first-timers or occasional visits.</p>
//                   <Button variant="outline" className="w-full">Purchase</Button>
//                 </div>
                
//                 <div className="border rounded-lg p-6 text-center bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
//                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
//                     Most Popular
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">10 Class Pack</h3>
//                   <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">$200</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Save $50 with our most popular package. Valid for 3 months.</p>
//                   <Button className="w-full">Purchase</Button>
//                 </div>
                
//                 <div className="border rounded-lg p-6 text-center">
//                   <h3 className="text-xl font-semibold mb-2">Monthly Unlimited</h3>
//                   <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">$180</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Unlimited classes for 30 days from purchase.</p>
//                   <Button variant="outline" className="w-full">Purchase</Button>
//                 </div>
//               </div>
              
//               <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   <span className="font-medium">Note:</span> All packages are non-refundable and have varying expiration periods. Private sessions are available upon request and priced separately. Please contact us for more information.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
        
//         <div className="mt-16">
//           <Card>
//             <CardContent className="pt-6">
//               <h2 className="text-2xl font-bold mb-6">New to Pilates?</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3">Special Introductory Offer</h3>
//                   <p className="text-gray-700 dark:text-gray-300 mb-4">
//                     Try 3 classes for just $60 ($20 per class). This package is perfect for newcomers who want to experience different class types before committing to a full package.
//                   </p>
//                   <Button>Get Started</Button>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3">Private Introduction</h3>
//                   <p className="text-gray-700 dark:text-gray-300 mb-4">
//                     Book a one-on-one session with one of our expert instructors to learn the basics of Pilates and get personalized guidance tailored to your specific needs.
//                   </p>
//                   <Button variant="outline">Learn More</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }