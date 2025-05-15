import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error: verifyError } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!verifyError) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const fullName = user.user_metadata?.full_name ?? "";

        // insert into profiles table
        const { error: insertError } = await supabase.from("profiles").upsert({
          id: user.id,
          full_name: fullName,
        });

        if (insertError) {
          console.error("Failed to insert profile:", insertError.message);
        }
      }

      return redirect(next);
    }
  }

  return redirect("/error");
}
