import { createClient } from "@/lib/supabase/server";
//import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AddClassForm from "./add-class-form";
import { DeleteClassButton } from "./delete-class-button";
import { getTranslations } from 'next-intl/server';

export const dynamic = "force-dynamic";

type Attendee = {
  user_id: string;
  profiles: {
    full_name: string;
  };
};

type Class = {
  id: string;
  date: string;
  time: string;
  max_capacity: number;
  description: string;
  profiles: {
    full_name: string;
  }[] | null;
  attendees?: Attendee[];
  datetime?: Date;
};

type RawClass = {
  id: string;
  date: string;
  time: string;
  max_capacity: number;
  description: string;
  profiles: {
    full_name: string;
  }[] | null;
};

type CategorizedClasses = {
  upcoming: Class[];
  past: Class[];
};

async function getClasses(): Promise<CategorizedClasses> {
  const supabase = await createClient();

  const { data: classes, error } = await supabase
    .from("classes")
    .select(`
      id,
      date,
      time,
      max_capacity,
      description,
      profiles (
        full_name
      )
    `)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    console.error("Error fetching classes:", error);
    return { upcoming: [], past: [] };
  }

  const now = new Date();

  const categorized = {
    upcoming: [] as Class[],
    past: [] as Class[],
  };

  for (const cls of classes as RawClass[]) {
    const classDateTime = parseISO(`${cls.date}T${cls.time}`);
    const classWithDateTime: Class = {
      ...cls,
      datetime: classDateTime
    };
    if (classDateTime >= now) {
      categorized.upcoming.push(classWithDateTime);
    } else {
      categorized.past.push(classWithDateTime);
    }
  }

  return categorized;
}


async function getClassAttendees(classId: string): Promise<Attendee[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      user_id,
      profiles (
        full_name
      )
    `)
    .eq("class_id", classId);
    
  if (error) {
    console.error("Error fetching attendees:", error);
    return [];
  }
  
  return (data || []).map(item => ({
    user_id: item.user_id,
    profiles: item.profiles[0]
  })) as Attendee[];
}

export async function getAllClassAttendees() {
  const { upcoming } = await getClasses();
  
  // For each upcoming class, get the attendees
  for (const cls of upcoming) {
    cls.attendees = await getClassAttendees(cls.id);
  }
  
  return upcoming;
}

async function getMessageCount() {
  const supabase = await createClient();
  
  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);
    
  if (error) {
    console.error("Error counting messages:", error);
    return 0;
  }
  
  return count || 0;
}

export default async function AdminPage() {
  const { upcoming, past } = await getClasses();
  const classesWithAttendees = await getAllClassAttendees();
  const unreadMessageCount = await getMessageCount();
  const t = await getTranslations('AdminPage');
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {t('title')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t('stats.upcomingClasses')}</CardTitle>
              <CardDescription>{t('stats.totalScheduled')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{upcoming.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t('stats.pastClasses')}</CardTitle>
              <CardDescription>{t('stats.totalCompleted')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{past.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t('stats.messages')}</CardTitle>
              <CardDescription>{t('stats.unreadMessages')}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-4xl font-bold">{unreadMessageCount}</p>
              {unreadMessageCount > 0 && (
                <Button asChild size="sm">
                  <Link href="/admin/messages">{t('stats.viewMessages')}</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="classes">
          <TabsList className="mb-6">
            <TabsTrigger value="classes">{t('tabs.classes')}</TabsTrigger>
            <TabsTrigger value="add-class">{t('tabs.addClass')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes">
            <div className="grid gap-6">
              {classesWithAttendees.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{cls.description}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center mt-1">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            {cls.datetime ? (
                              <>
                                {format(cls.datetime, "EEEE, MMMM d, yyyy")} at {format(cls.datetime, "h:mm a")}
                              </>
                            ) : null}
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          <UserIcon className="mr-1 h-3 w-3" />
                          {cls.attendees?.length} / {cls.max_capacity}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">{t('classCard.attendees')}</h3>
                    {(!cls.attendees || cls.attendees.length === 0) ? (
                      <p className="text-gray-500 dark:text-gray-400">{t('classCard.noBookings')}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cls.attendees.map((attendee: Attendee) => (
                          <div key={attendee.user_id} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <p className="font-medium">{attendee?.profiles?.full_name || "you didn't add trainer name"}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <DeleteClassButton classId={cls.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {classesWithAttendees.length === 0 && (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h2 className="text-xl font-medium mb-4">{t('classCard.noUpcoming')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {t('classCard.createNew')}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="add-class">
            <Card>
              <CardHeader>
                <CardTitle>{t('addClassForm.title')}</CardTitle>
                <CardDescription>
                  {t('addClassForm.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddClassForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}