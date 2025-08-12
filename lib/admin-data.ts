import { createClient } from "@/lib/supabase/server";
import { parseISO } from "date-fns";

export type Attendee = {
  user_id: string;
  profiles: { full_name: string };
};

type Class = {
  id: string;
  date: string;
  time: string;
  max_capacity: number;
  description: string;
  profiles: { full_name: string }[] | null;
  attendees?: Attendee[];
  datetime?: Date;
};

type RawClass = Omit<Class, "attendees" | "datetime">;
type CategorizedClasses = { upcoming: Class[]; past: Class[] };

export async function getClasses(): Promise<CategorizedClasses> {
  const supabase = await createClient();
  const { data: classes, error } = await supabase
    .from("classes")
    .select(`id,date,time,max_capacity,description,profiles(full_name)`)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) return { upcoming: [], past: [] };

  const now = new Date();
  const categorized: CategorizedClasses = { upcoming: [], past: [] };

  for (const cls of classes as RawClass[]) {
    const datetime = parseISO(`${cls.date}T${cls.time}`);
    const withDate: Class = { ...cls, datetime };
    if (datetime >= now) categorized.upcoming.push(withDate);
    else categorized.past.push(withDate);
  }
  return categorized;
}

export async function getClassAttendees(classId: string): Promise<Attendee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(`user_id, profiles(full_name)`)
    .eq("class_id", classId);

  if (error) return [];
  return (data || []).map(item => ({
    user_id: item.user_id,
    profiles: item.profiles[0]
  })) as Attendee[];
}

export async function getAllClassAttendees() {
  const { upcoming } = await getClasses();
  for (const cls of upcoming) {
    cls.attendees = await getClassAttendees(cls.id);
  }
  return upcoming;
}

export async function getMessageCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);
  return error ? 0 : count || 0;
}
