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

export async function getUserDetailsWithoutEmail() {
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
    userid: item.uuid,
    user_email: item.user_email,
    username: item.username,
    phone_number: item.phone_number,
    fullname: item.full_name,
  }));
}

export async function createChatRoom(user1Uuid: string, user2Uuid: string) {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  )
    .from("chat_room")
    .insert([
      {
        user1_id: user1Uuid,
        user2_id: user2Uuid,
      },
    ])
    .select("id");

  if (error) {
    console.error("Error fetching data:", error);
  }

  // console.log("create chat room data", data);

  return data;
}

export async function sendMessage(chatroomid: string, message: string) {
  const supabase = createClient();
  const { data: chatroomdata, error: chatroomerror } = await (await supabase)
    .from("chat_room")
    .select()
    .eq("id", chatroomid)
    .single();

  if (chatroomerror) {
    console.error("Error fetching data from chatroom db", chatroomerror);
  }

  console.log("chatroomdata", chatroomdata);
  const sender = chatroomdata?.user1_id;
  const receiver = chatroomdata?.user2_id;

  const { data: chatmessagedata, error: chatmessageerror } = await (
    await supabase
  )
    .from("chat_messages")
    .insert([
      { chat_room_id: chatroomid, sender_id: sender, text_message: message },
    ]);

  if (chatmessageerror) {
    console.error("Error fetching data:", chatmessageerror);
  }

  return chatmessagedata;
}

export async function fetchMessages(chatroomid: string) {
  const supabase = createClient();

  const { data: messages, error } = await (
    await supabase
  )
    .from("chat_messages")
    .select(
      `text_message, 
      created_at, 
      sender_id`
    )
    // chat_users: sender_id (username)
    // )
    .eq("chat_room_id", chatroomid) // Filter by chat room ID
    .order("created_at", { ascending: true }); // Sort by creation time

  if (error) {
    console.error("Error fetching messages:", error);
    return []; // Return an empty array or handle the error as needed
  }

  const formattedMessages = messages.map((message) => ({
    message_text: message.text_message,
    created_at: message.created_at,
    sender_id: message.sender_id,
  }));

  console.log("messages", formattedMessages);
  return messages;
}

export async function fetchChatRooms(useruuid : string) {
  const supabase = createClient();
  const { data: chatRooms, error: chatRoomsError } = await (await supabase)
    .from("chat_room")
    .select("*")
    .or(`user1_id.eq.${useruuid},user2_id.eq.${useruuid}`)
    .order("created_at", { ascending: false });

  if (chatRoomsError) {
    console.error("Error fetching chat rooms:", chatRoomsError);
    return []; // Return an empty array in case of error
  }

  // Extract the other user's ID from each chat room
  const otherUserIds = chatRooms.map((room) => {
    return room.user1_id === useruuid ? room.user2_id : room.user1_id;
  });

  // Fetch details of the other users
  const { data: contacts, error: contactsError } = await (await supabase)
    .from("chat_users")
    .select("*")
    .in("uuid", otherUserIds) // Filter by the other user IDs
    .order("created_at", { ascending: false });

  if (contactsError) {
    console.error("Error fetching user details:", contactsError);
    return []; // Return an empty array in case of error
  }

  // Map chat rooms with the other user's details
  const enrichedChatRooms = chatRooms.map((room) => {
    const otherUserId = room.user1_id === useruuid ? room.user2_id : room.user1_id;
    const otherUserDetails = contacts.find((user) => user.uuid === otherUserId);

    return {
      room_id: room.id,
      // created_at: room.created_at,
      other_user: otherUserDetails ? {
        // userid: otherUserDetails.uuid,
        // user_email: otherUserDetails.user_email,
        username: otherUserDetails.username,
        phone_number: otherUserDetails.phone_number,
        fullname: otherUserDetails.full_name,
      } : null,
    };
  });

  return enrichedChatRooms;
}
