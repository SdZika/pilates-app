import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, fullName } = await req.json();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (data.user) {
    const { error} = await supabase
      .from('profiles')
      .insert([
        { id: data.user.id, full_name: fullName },
      ]);

     if (error) {
      return NextResponse.json({ error: error.message}, { status: 400 })
     }
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
