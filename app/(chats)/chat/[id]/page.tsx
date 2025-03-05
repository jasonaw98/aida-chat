"use client";

import { useState, use, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import {
  fetchMessages,
  getChatRoomsInfo,
  getUserDetailsWithoutEmail,
  sendMessage,
} from "@/app/actions/actions";
import { createClient } from "@/utils/supabase/client";

interface ChatMessages {
  text_message: string;
  created_at: string;
  sender_id: string;
}

export default function ChatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setchatMessages] = useState<ChatMessages[]>([]);

  const [userUuid, setuserUuid] = useState("");
  const [userName, setuserName] = useState("");

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const fetchUserDetails = async () => {
    const logginUser = await getUserDetailsWithoutEmail();
    const loggedInUserUuid = logginUser?.uuid;
    setuserUuid(loggedInUserUuid);
    const fetchedMessages = await fetchMessages(id);
    setchatMessages(fetchedMessages);
  };

  const fetchChatRoomInfo = async () => {
    const { user1, user2 } = await getChatRoomsInfo(id);
    const chatRoomInfo = user1.uuid === userUuid ? user2 : user1;
    const chatUserName = chatRoomInfo?.full_name;
    if (chatUserName) {
      setuserName(chatUserName);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(id, userUuid, newMessage);
    setNewMessage("");
    fetchUserDetails();
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    fetchUserDetails();
    fetchChatRoomInfo();
    const supabase = createClient();
    const channel = supabase
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          // console.log("Change received!", payload);
          fetchUserDetails();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Card className="h-[calc(100vh-2rem)] border-0">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Link href="/chatapp" className="cursor-pointer">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <Avatar className="size-8">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${userName}`}
          />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-bold dark:text-gray-100">
          {userName.slice(0, 10)}
        </h2>
      </CardHeader>
      <CardContent className="overflow-auto h-[calc(100%-8rem)]">
        <div className="space-y-4">
          {chatMessages.map((message, index) => (
            <div
              key={message.created_at}
              className={`flex ${
                message.sender_id === userUuid ? "justify-end" : "justify-start"
              }`}
              ref={index === chatMessages.length - 1 ? lastMessageRef : null}
            >
              <div
                className={`max-w-[70%] rounded-lg p-2 ${
                  message.sender_id === userUuid
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <p>{message.text_message}</p>
                <span className="text-xs mt-1 block opacity-70">
                  {new Date(message.created_at).toLocaleString("en-US", {
                    timeZone: "Asia/Kuala_Lumpur",
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="grow dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
