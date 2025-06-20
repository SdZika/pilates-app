import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server"

type Message = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

async function getMessages(): Promise<Message[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data as Message[];
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const t = await getTranslations("MessagesPage");

  async function markAsRead(id: string) {
    "use server";
    const supabase = await createClient();
    await supabase.from("messages").update({ read: true }).eq("id", id);
  }

   const formatTime = (date: Date) => {
    const distance = formatDistanceToNow(date, { addSuffix: false });
    return distance.includes("less than a minute") 
      ? t("justNow")
      : t("timeAgo", { time: distance });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("title")}</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t("noMessages")}</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <Card key={msg.id} className={msg.read ? "opacity-70" : "border-2 border-blue-500"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{msg.full_name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {msg.email} · {formatTime(new Date(msg.created_at))}
                    </CardDescription>
                  </div>
                  {!msg.read && (
                    <form action={markAsRead.bind(null, msg.id)}>
                      <Button variant="outline" size="sm">{t("markAsRead")}</Button>
                    </form>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-sm whitespace-pre-wrap">
                {msg.message}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Button asChild variant="ghost">
          <Link href="/admin">{t("backToDashboard")}</Link>
        </Button>
      </div>
    </div>
  );
}
