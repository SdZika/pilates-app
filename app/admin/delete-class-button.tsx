"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteClassButton({ classId }: { classId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", classId);
      
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Class has been deleted.");
      router.refresh();
    }
    
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
        >
          Delete Class
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the class
            and all associated bookings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Deleting..." : "Delete Class"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}