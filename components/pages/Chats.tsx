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
        <p className="font-semibold text-2xl px-3 py-1 rounded-full">All Chats</p>
      </div>
      {ChatData.map((data, index) => (
        <ChatListCard
          key={index}
          name={data.name}
          time={data.time}
          received_message={data.received_message}
          sent_message={data.sent_message}
        />
      ))}
    </div>
  );
};

export default Chats;
