"use client";

import { useState } from "react";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ZYGY_AI_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          querySearch: input,
          serviceAccount: "i_melaka",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const reader = response.body?.getReader();
      // Initialize an empty assistant message
      const initialMessage: Message = {
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, initialMessage]);

      if (!reader) {
        throw new Error("No reader available");
      }

      // Read the stream
      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Convert the chunk to text and accumulate it
        const chunk = new TextDecoder().decode(value);
        accumulatedText += chunk;

        await new Promise((resolve) => setTimeout(resolve, 10));
        // Update the last message with accumulated text
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: accumulatedText,
          };
          return newMessages;
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-2rem)] border-0">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Link href="/chatapp" className="cursor-pointer">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <p className="text-xl font-bold flex justify-start items-center h-full">
          i-Melaka
        </p>
      </CardHeader>

      <CardContent className="overflow-auto h-[calc(100%-8rem)] -mt-4">
        <div className="h-full">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 overflow-auto ${
                    message.role === "user"
                      ? "bg-blue-500 text-white flex justify-end w-fit max-w-[85%]"
                      : "bg-gray-700 text-gray-100 break-words"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) => {
                        return (
                          <code
                            className={`${className} ${
                              inline
                                ? "bg-gray-800 rounded px-1"
                                : "block bg-gray-800 p-2 rounded-lg my-2"
                            }`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      a({ node, className, children, ...props }) {
                        return (
                          <a
                            className="text-blue-400 hover:text-blue-300 underline"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                      ul({ node, className, children, ...props }) {
                        return (
                          <ul className="list-disc list-inside my-2" {...props}>
                            {children}
                          </ul>
                        );
                      },
                      ol({ node, className, children, ...props }) {
                        return (
                          <ol
                            className="list-decimal list-inside my-2"
                            {...props}
                          >
                            {children}
                          </ol>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="text-white animate-pulse font-bold">
              AI is typing...
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow bg-gray-900 border border-gray-700"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-gray-300 text-slate-800 font-bold hover:bg-gray-400"
            disabled={isLoading}
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
