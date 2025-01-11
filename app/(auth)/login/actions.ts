"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/cloudserver";

export async function signInWithOTP(formData: FormData) {
  const supabase = await createClient();
  
  const email = {
    email: formData.get("email") as string,
  };
  console.log('Sending OTP to:', email);

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.email,
  });
  console.log("data", data, error);

  if (error) {
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
  console.log("Verifying OTP for:", form);


  const { data: { session }, error, } = await supabase.auth.verifyOtp({
    email: form.email,
    token: form.otp,
    type: "email",
  });

  if (error) {
    redirect("/error");
  }

  console.log(session);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log("data", data, error);
  return data;
}