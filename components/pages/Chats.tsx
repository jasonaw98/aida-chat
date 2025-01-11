import Link from "next/link";
import ChatListCard from "../ChatListCard";
import ShineBorder from "../ui/shine-border";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      <h1 className="text-2xl pl-4 pb-2 text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">Chats</h1>
      {/* <div className="flex gap-4 w-full px-8 py-4">
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
      </div> */}

      <Link href="/aida" className="flex flex-col w-full">
        <span className="w-full h-px bg-gray-800"></span>
        <div className="flex px-8 py-4 w-full items-center">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=AIDA`}
            />
            <AvatarFallback>{"AIDA".charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8">
            <h1 className="font-bold text-lg">AIDA</h1>
          </div>
        </div>
        <span className="w-full h-px bg-gray-800"></span>
      </Link>

      <Link href="/mahsuri" className="flex flex-col w-full">
        <span className="w-full h-px bg-gray-800"></span>
        <div className="flex px-8 py-4 w-full items-center">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=MAHSURI`}
            />
            <AvatarFallback>{"AIDA".charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8">
            <h1 className="font-bold text-lg">MAHSURI</h1>
          </div>
        </div>
        <span className="w-full h-px bg-gray-800"></span>
      </Link>

      <Link href="/melaka" className="flex flex-col w-full">
        <span className="w-full h-px bg-gray-800"></span>
        <div className="flex px-8 py-4 w-full items-center">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=Melaka`}
            />
            <AvatarFallback>{"Melaka".charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8">
            <h1 className="font-bold text-lg">i-Melaka</h1>
          </div>
        </div>
        <span className="w-full h-px bg-gray-800"></span>
      </Link>

      <Link href="/halal" className="flex flex-col w-full">
        <span className="w-full h-px bg-gray-800"></span>
        <div className="flex px-8 py-4 w-full items-center">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=halal`}
            />
            <AvatarFallback>{"halal".charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8">
            <h1 className="font-bold text-lg">i-Halal</h1>
          </div>
        </div>
        <span className="w-full h-px bg-gray-800"></span>
      </Link>

      {/* {ChatData.map((data, index) => (
        <Link href={`/chat/${data.name}`} key={index}>
          <ChatListCard
            key={index}
            name={data.name}
            time={data.time}
            received_message={data.received_message}
            sent_message={data.sent_message}
          />
        </Link>
      ))} */}
    </div>
  );
};

export default Chats;
