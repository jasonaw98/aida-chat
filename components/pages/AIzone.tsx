import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AIzone() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl pl-4 pb-2 text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
        Knowledge AI
      </h1>

      <Link href="/aida" className="flex flex-col w-full">
        <span className="w-full h-0.5 bg-gray-800"></span>
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
        <span className="w-full h-0.5 bg-gray-800"></span>
      </Link>

      <Link href="/mahsuri" className="flex flex-col w-full">
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
        <span className="w-full h-0.5 bg-gray-800"></span>
      </Link>

      <Link href="/melaka" className="flex flex-col w-full">
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
        <span className="w-full h-0.5 bg-gray-800"></span>
      </Link>

      <Link href="/pahang" className="flex flex-col w-full">
        <div className="flex px-8 py-4 w-full items-center">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=pahang`}
            />
            <AvatarFallback>{"halal".charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8">
            <h1 className="font-bold text-lg">i-Pahang</h1>
          </div>
        </div>
        <span className="w-full h-0.5 bg-gray-800"></span>
      </Link>

      <Link href="/halal" className="flex flex-col w-full">
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
        <span className="w-full h-0.5 bg-gray-800"></span>
      </Link>
    </div>
  );
}
