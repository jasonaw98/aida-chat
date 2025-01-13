"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "../(auth)/login/actions";

export async function createUser(email: string) {
  const supabase = createClient();

  // Check if user already exists
  const { data: existingUser } = await (await supabase)
    .from("chat_users")
    .select()
    .eq("user_email", email)
    .single();

  if (existingUser) {
    return { user: existingUser, error: null };
  }

  // Create new user if doesn't exist
  const { data: newUser, error } = await (
    await supabase
  )
    .from("chat_users")
    .insert([
      {
        user_email: email,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    return { user: null, error };
  }

  return { user: newUser, error: null };
}

export async function getUserData(email: string) {
  const supabase = createClient();

  const { data } = await (await supabase)
    .from("chat_users")
    .select()
    .eq("user_email", email)
    .single();

  // if (!data.phone_number) {
  //   redirect("/signup");
  // }

  return data;
}

export async function getUserDetailsWithoutEmail () {
  const { user } = await getUser();
  const userauthEmail = user?.email;

  const userDetails = await getUserData(userauthEmail!);
  // console.log("userDetails", userDetails);
  return userDetails;
}

export async function uploadUserDetails(formData: FormData): Promise<any> {
  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const phoneNumber = formData.get("phone_number") as string;
  const username = formData.get("username") as string;

  const supabase = createClient();
  const { data, error } = await (
    await supabase
  )
    .from("chat_users")
    .update({
      full_name: fullName,
      phone_number: phoneNumber,
      username: username,
    })
    .eq("user_email", email)
    .select();

  if (error) {
    console.error("Error fetching data:", error);
  }
  // console.log("Updated data", data);
  redirect("/chatapp");
}

export async function searchContacts(query: string) {
  const supabase = createClient();
  const { data: contacts, error } = await (await supabase)
    .from("chat_users")
    .select("*")
    .order("created_at", { ascending: false })
    .or(
      `phone_number.ilike.%${query}%, full_name.ilike.%${query}%, username.ilike.%${query}%`
    );

  if (error) {
    console.error("Error fetching data:", error);
  }

  // console.log("contacts", contacts);

  return contacts?.map((item) => ({
    userid : item.uuid,
    user_email: item.user_email,
    username: item.username,
    phone_number: item.phone_number,
    fullname: item.full_name,
  }));
}

export async function createChatRoom(user1Uuid: string, user1Username: string, user2Uuid: string, user2Username: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
  .from("chat_room")
  .insert([
    {
      user1_id: user1Uuid,
      user1_username: user1Username,
      user2_id: user2Uuid,
      user2_username: user2Username
    },
  ])
  .select("id");

  if (error) {
    console.error("Error fetching data:", error);
  }

  // console.log("create chat room data", data);

  return data;
}

export async function acceptFrens(friendshipId: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("friendships")
    .update({ status: "accepted" })
    .eq("id", friendshipId);

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}

export async function createChat(user1Id: string, user2Id: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("chats")
    .insert({ user1_id: user1Id, user2_id: user2Id });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}

export async function sendChat(
  message: string,
  senderId: string,
  chatId: string
) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("messages")
    .insert({ chat_id: chatId, sender_id: senderId, content: message });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}

export async function receiveChat(chatId: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}
