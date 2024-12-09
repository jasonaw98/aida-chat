import Link from "next/link";
import ChatListCard from "../ChatListCard";

const ChatData = [
  {
    name: "AIDA",
    time: "10:00PM",
    received_message: "Hello how can I help you?",
    sent_message: "",
  },
  {
    name: "Mahsuri",
    time: "10:00PM",
    received_message: "",
    sent_message: "Hi",
  },
  {
    name: "Abbie",
    time: "10:00PM",
    received_message: "Hello",
    sent_message: "",
  },
];

const Chats = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full px-8">
        <p className="font-bold text-2xl">Chats</p>
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
