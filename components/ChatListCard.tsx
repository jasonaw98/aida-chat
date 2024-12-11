import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
      <span className="w-full h-px bg-gray-800"></span>
      <div className="flex px-8 py-4 w-full items-center">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
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
        <div className="flex flex-col gap-2 items-center ml-auto h-full">
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
