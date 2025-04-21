"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClientClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientClient();
  

  const handleCancel = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);
      
    if (error) {
      toast.error("Error",{
        description:error.message,
      });
    } else {
      toast.success("Success",{
        description: "Your booking has been cancelled.",
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
      {isLoading ? "Cancelling..." : "Cancel"}
    </Button>
  );
}