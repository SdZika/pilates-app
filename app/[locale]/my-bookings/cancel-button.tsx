"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations('CancelBookingButton');
  

  const handleCancel = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);
      
    if (error) {
      toast.error(t('toast.error'),{
        description:error.message,
      });
    } else {
      toast.success(t('toast.success'),{
        description: t('toast.successDescription'),
      });
      router.refresh();
    }
    
    setIsLoading(false);
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleCancel}
      disabled={isLoading}
      className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
    >
      {isLoading ? t('cancelling') : t('cancel')}
    </Button>
  );
}