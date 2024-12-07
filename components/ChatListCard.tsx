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
      <div className="flex px-8 py-3 w-full">
        <p className="font-black size-12 rounded-full bg-violet-300 flex justify-center items-center">
          A
        </p>
        <div className="flex flex-col ml-8">
          <h1 className="font-bold text-lg">{name}</h1>
          <p
            className={cn(
              "text-sm text-violet-400 font-black",
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
        <div className="flex flex-col gap-2 items-center ml-auto">
          <p className="text-sm font-semibold text-neutral-200">{time}</p>
          <p
            className={cn(
              "bg-violet-500 size-3 rounded-full flex justify-center",
              sent_message.length > 1 ? "hidden" : ""
            )}
          />
        </div>
      </div>
      <span className="w-full h-px bg-gray-800"></span>
    </div>
  );
};

export default ChatListCard;
