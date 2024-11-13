import { cn } from "@/lib/utils";

interface ChatListCardProps {
  name: string;
  time: string;
  received_message: string;
  sent_message: string;
}

const ChatListCard = ({
  name,
  time,
  received_message,
  sent_message,
}: ChatListCardProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex px-8 py-3 w-full justify-between">
        <p className="font-black size-12 rounded-full bg-purple-300 flex justify-center items-center">
          J
        </p>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{name}</h1>
          <p
            className={cn(
              "text-sm text-purple-600 font-black",
              received_message.length > 1 ? "line-clamp-1" : "hidden"
            )}
          >
            {received_message}
          </p>
          <p
            className={cn(
              "text-sm text-neutral-500",
              sent_message.length > 1 ? "line-clamp-1" : "hidden"
            )}
          >
            {sent_message}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm">{time}</p>
          <p
            className={cn(
              "bg-purple-400 size-3 rounded-full flex justify-center",
              sent_message.length > 1 ? "hidden" : ""
            )}
          />
        </div>
      </div>
      <span className="w-full h-0.5 bg-neutral-300"></span>
    </div>
  );
};

export default ChatListCard;
