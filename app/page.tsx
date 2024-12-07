import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-2">
          Welcome to
        </h1>
        <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
          IDRead AI Messenger
        </h1>
        <p className="text-sm text-blue-500 font-bold my-3">Personal</p>
        <Image
          src="/aidaicon.png"
          alt="AIDA Icon"
          width={120}
          height={120}
          className="md:mt-8 rounded-2xl object-cover shadow-xl"
        />
        <Link href="/sign-in" className="cursor-pointer">
          <Button className="mt-6 font-bold w-52">Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button className="mt-5 font-bold bg-[#1877f2] hover:bg-[#1877f2]/90 w-52">
            Sign Up
          </Button>
        </Link>
        <h1 className="text-sm py-8 font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-[#2af598] to-[#009efd] drop-shadow-lg">
          <Link href="/chatapp">Gateway towards the future of Messaging</Link>
        </h1>

        <Image
          src="/blockchain.gif"
          alt="Blokchain Icon"
          width={100}
          height={100}
          unoptimized
          className="rounded-2xl shadow-xl"
        />
      </div>
    </main>
  );
}
