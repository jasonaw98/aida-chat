"use server";

import { createClient } from "@/utils/supabase/server";

export async function createUser(
  name: string,
  email: string,
  phoneNumber: string
) {
  const supabase = createClient();
  
  // Check if user already exists
  const { data: existingUser } = await (await supabase)
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (existingUser) {
    return { user: existingUser, error: null };
  }

  // Create new user if doesn't exist
  const { data: newUser, error } = await (await supabase)
    .from("users")
    .insert([
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
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

export async function addFrens(userId: string, frenId: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase).from("friendships").insert([
    {
      user_id: userId,
      friend_id: frenId,
      status: "pending",
    },
  ]);

  if (error) {
    console.error("Error fetching data:", error);
  }

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
