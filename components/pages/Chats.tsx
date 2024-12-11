import Link from "next/link";
import ChatListCard from "../ChatListCard";
import ShineBorder from "../ui/shine-border";

const ChatData = [
  {
    name: "John Doe",
    time: "10:00PM",
    received_message: "Hello how can I help you?",
    sent_message: "",
  },
  {
    name: "Jane Doe",
    time: "10:00PM",
    received_message: "",
    sent_message: "Hi",
  },
  {
    name: "Jeff Doe",
    time: "10:00PM",
    received_message: "Hello",
    sent_message: "",
  },
];

const Chats = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 w-full px-8 py-4">
        <Link href="/aida" className="w-full cursor-pointer">
          <ShineBorder
            className="font-bold text-lg border py-3 w-full rounded-xl shadow-inner shadow-white/20 text-center"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            AIDA
          </ShineBorder>
        </Link>
        <Link href="/mahsuri" className="w-full cursor-pointer">
          <ShineBorder
            className="font-bold text-lg border py-3 w-full rounded-xl shadow-inner shadow-white/20 text-center"
            color={["#37ecb9cb", "#0061fd", "#37ecb9cb"]}
          >
            Mahsuri
          </ShineBorder>
        </Link>
      </div>
      {ChatData.map((data, index) => (
        <Link href={`/chat/${data.name}`} key={index}>
          <ChatListCard
            key={index}
            name={data.name}
            time={data.time}
            received_message={data.received_message}
            sent_message={data.sent_message}
          />
        </Link>
      ))}
    </div>
  );
};

export default Chats;
