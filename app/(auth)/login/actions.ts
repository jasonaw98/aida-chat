"use server";

// import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/cloudserver";

export async function signInWithOTP(formData: FormData) {
  const supabase = await createClient();
  
  const email = {
    email: formData.get("email") as string,
  };

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.email,
  });

  if (error) {
    console.log('error', error)
    redirect("/error");
  }

  if (!data) {
    console.log('error', error)
    redirect("/error");
  }

}

export async function verifyOTP(formData: FormData) {
  const supabase = await createClient();

  const form = {
    email: formData.get("email") as string,
    otp: formData.get("otp") as string,
  };


  const { data: { session }, error, } = await supabase.auth.verifyOtp({
    email: form.email,
    token: form.otp,
    type: "email",
  });

  if (error) {
    redirect("/error");
  }
  if (!session) {
    console.log('No session', error)
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/chatapp");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log('error', error)
    redirect("/error");
  }
  return data;
}