import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-[linear-gradient(120deg,_#89f7fe_0%,_#66a6ff_100%)] h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-center text-zinc-700 drop-shadow-lg">
          Welcome to
        </h1>
        <h1 className="text-4xl font-black text-center text-zinc-700 drop-shadow-lg">
          IDRead Messenger
        </h1>
        <p className="text-sm text-blue-500 font-bold mt-5">Personal</p>
        <Image
          src="/aidaicon.png"
          alt="AIDA Icon"
          width={120}
          height={120}
          className="md:mt-8 rounded-2xl object-cover shadow-xl"
        />
        <Link href="/sign-in" className="cursor-pointer">
          <Button className="mt-10 text-white font-bold bg-[#14171a] hover:bg-[#14171a]/90 w-52">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="mt-5 bg-[#1877f2] text-white font-bold hover:bg-[#1877f2]/90 w-52">
            Sign Up
          </Button>
        </Link>
        <h1 className="text-base pt-12 font-black text-center text-neutral-800 drop-shadow-lg">
          <Link href="/chatapp">Gateway towards the future of Messaging</Link>
        </h1>

        <Image
          src="/blockchain.gif"
          alt="Blokchain Icon"
          width={100}
          height={100}
          className="mt-8 rounded-2xl shadow-xl"
        />
      </div>
    </main>
  );
}
