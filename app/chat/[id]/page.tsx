"use client";

import { useState, use } from "react";
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

const messages = [
  { id: 1, sender: "Alice", content: "Hey, how are you?", time: "10:30 AM" },
  {
    id: 2,
    sender: "You",
    content: "I'm good, thanks! How about you?",
    time: "10:31 AM",
  },
  {
    id: 3,
    sender: "Alice",
    content: "I'm doing well too. Any plans for the weekend?",
    time: "10:32 AM",
  },
];

export default function ChatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <Card className="h-[calc(100vh-2rem)] dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Link href="/chatapp" className="cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${id}`}
          />
          <AvatarFallback>{id.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold dark:text-gray-100">{id}</h2>
      </CardHeader>
      <CardContent className="overflow-auto h-[calc(100%-8rem)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs mt-1 block opacity-70">
                  {message.time}
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
            className="flex-grow dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
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
