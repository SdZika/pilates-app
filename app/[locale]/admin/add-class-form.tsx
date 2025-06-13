"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function AddClassForm() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("15");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations('AddClassForm');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
     if (!date || !time || !description) {
      toast.error(t('toast.error.title'), {
        description: t('toast.error.requiredFields'),
      });
      return;
    }
    
    setIsLoading(true);
    
    const formattedDate = format(date, "yyyy-MM-dd");
    
    const { data: userData } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from("classes")
      .insert([
        {
          date: formattedDate,
          time,
          max_capacity: parseInt(maxCapacity),
          description,
          trainer_id: userData.user?.id,
        },
      ]);
      
    if (error) {
      toast.error(t('toast.error.title'), {
        description: error.message,
      });
    } else {
      toast.success(t('toast.success.title'), {
        description: t('toast.success.description'),
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setMaxCapacity("15");
      setDescription("");
      
      router.refresh();
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">{t('form.date.label')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t('form.date.placeholder')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">{t('form.time.label')}</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="maxCapacity">{t('form.maxCapacity.label')}</Label>
        <Input
          id="maxCapacity"
          type="number"
          min="1"
          max="50"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{t('form.description.label')}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('form.description.placeholder')}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('form.submit.creating') : t('form.submit.default')}
      </Button>
    </form>
  );
}