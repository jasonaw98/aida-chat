"use client";

import {
  fetchChatRooms,
  getUserDetailsWithoutEmail,
} from "@/app/actions/actions";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import Link from "next/link";

interface OtherUser {
  userid: string;
  user_email: string;
  username: string;
  phone_number: string;
  fullname: string;
}

interface ChatListProps {
  room_id: string;
  created_at: string;
  other_user: OtherUser;
}

export default function ChatList() {
  const [chatArray, setchatArray] = useState<ChatListProps[]>([]);

  const fetchAllChats = async () => {
    const logginUser = await getUserDetailsWithoutEmail();
    const loggedInUserUuid = logginUser?.uuid;
    const data = (await fetchChatRooms(loggedInUserUuid)).map((chat: any) => ({
      room_id: chat.room_id,
      created_at: chat.created_at || "", // Ensure created_at is included
      other_user: chat.other_user,
    }));
    setchatArray(data);
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <div className="pt-4">
      {chatArray.map((chat, index) => (
        <Link href={`/chat/${chat.room_id}`}>
          <Card className="p-3 rounded-none" key={index}>
            <div
              key={chat.room_id}
              className="flex items-center justify-around"
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.other_user.username}`}
                  className="size-8 rounded-full"
                />
                <AvatarFallback>
                  {chat.other_user.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p>{chat.other_user.username}</p>
              <p>{chat.other_user.fullname}</p>
            </div>
          </Card>
        </Link>
      ))}
      {/* <Button onClick={fetchAllChats}>Fetch All Chats</Button> */}
    </div>
  );
}
