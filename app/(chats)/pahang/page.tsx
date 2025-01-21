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
import { ChevronLeftIcon, SendHorizonal } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
  video?: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const simulateStreaming = async (
    response: string,
    callback: (chunk: string) => void
  ) => {
    const chunks = response.split(" "); // Split response into words
    let accumulatedText = "";

    for (const chunk of chunks) {
      accumulatedText += chunk + " "; // Add the word and a space
      callback(accumulatedText.trim()); // Update the message with the accumulated text
      await new Promise((resolve) => setTimeout(resolve, 40)); // Add a delay (e.g., 50ms)
    }
  };

  const predefinedResponses: {
    [key: string]: { content: string; image?: string; video?: string };
  } = {
    "siapakah menteri besar pahang": {
      content:
        "Berdasarkan maklumat yang terkini, Datuk Seri Wan Rosdy Wan Ismail masih memegang jawatan sebagai Menteri Besar Pahang pada tahun 2025. Beliau merupakan seorang pemimpin berpengalaman yang telah memegang jawatan ini sejak tahun 2018. Di bawah kepimpinannya, beberapa agenda pembangunan negeri Pahang, termasuk aspek ekonomi, infrastruktur, dan kebajikan rakyat, telah dilaksanakan secara aktif.",
      image: "/menteripahang.jpeg",
    },
    "tempat menarik pelancongan pahang": {
      content:
        "1. Sungai Palas BOH Tea Plantation\n\n Lokasi: [BOH Tea Plantation](https://g.co/kgs/G3hVoCR) \n\n Ini adalah sebuah struktur unik yang berdiri indah dengan latar belakang kehijauan ladang teh yang terbentang luas.",
      image: "/bohtea.jpeg",
      video: "/bohtea.mp4",
    },
    "aktiviti waktu malam di melaka apa yang best?": {
      content:
        "Ada banyak aktiviti waktu malam di Melaka. Contoh yang paling ramai lawati adalah Melaka River Cruise.\n\n[Melaka River Cruise](https://g.co/kgs/o1b7jCn) [Buy Tickets Online](https://www.agoda.com/en-gb/activities/detail?activityId=1043867&cid=1909882&cityId=15121&currency=MYR&googleSrc=cu&gl=en&gacs=tpa&gad_source=1&gclid=Cj0KCQiA4rK8BhD7ARIsAFe5LXIl-zkri0Vwduu3v0eKh43Ku6TOgdfKqU4yDjOqSDBjcr3d6HV-iDEaAgWyEALw_wcB)\n\nNak saya beri pilihan lain yang sesuai dengan minat anda?",
      image: "/melakariver.jpeg", // Replace with actual image URL
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const lowerCaseInput = input.toLowerCase().trim();
    if (predefinedResponses[lowerCaseInput]) {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 1 second delay
      // Add an empty assistant message to start streaming
      const initialMessage: Message = {
        role: "assistant",
        content: "",
        image: predefinedResponses[lowerCaseInput].image,
      };
      setMessages((prev) => [...prev, initialMessage]);

      // Simulate streaming for the hardcoded response
      await simulateStreaming(
        predefinedResponses[lowerCaseInput].content,
        (chunk) => {
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: "assistant",
              content: chunk,
              image: predefinedResponses[lowerCaseInput].image,
            };
            return newMessages;
          });
        }
      );

      setIsLoading(false);
      return; // Exit early, no need to call the API
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ZYGY_AI_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          querySearch: input,
          serviceAccount: "i_pahang",
        }),
      });

      if (!response.ok) {
        console.error(Error("Failed to fetch response"));
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
          i-Pahang
        </p>
      </CardHeader>

      <CardContent className="overflow-auto h-[calc(100%-8rem)] -mt-2">
        <div className="h-full">
          {messages.length === 0 && (
            <div className="font-bold flex justify-center h-full items-center flex-col gap-5">
              <Image
                src="/tourismpahang.png"
                alt="Pahang logo"
                width={200}
                height={200}
                className="opacity-80 bg-white rounded-lg p-1"
              />
              <h1 className="animate-pulse">How can I help you today?</h1>
            </div>
          )}
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
                  {message.image && (
                    <div className="flex justify-center pb-1">
                      <Image
                        src={message.image}
                        alt="AIDA Icon"
                        width={250}
                        height={200}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  {message.image && (
                    <div className="flex justify-center pb-1">
                      <iframe
                        src="https://www.youtube.com/embed/0oFW3Xpp0Cs"
                        width={"100%"}
                        height={200}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  )}
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
            className="bg-gray-300 text-slate-800 hover:bg-gray-400"
            disabled={isLoading}
          >
            <SendHorizonal />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
