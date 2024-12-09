import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[90%]">
      <div className="flex flex-col items-center justify-center">
        {/* <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-2">
          Welcome to
        </h1> */}
        {/* <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
          IDRead AI Messenger
        </h1> */}
        <div className="flex flex-col items-center justify-center gap-3">
          <TextAnimate
            text="Welcome To"
            type="popIn"
            className="text-3xl"
          />
          <TextAnimate
            text="IDRead AI Messenger"
            type="popIn"
            className="text-3xl"
          />
        </div>
        <p className="text-sm text-blue-500 font-bold my-3">Personal</p>
        <Image
          src="/aidaicon.png"
          alt="AIDA Icon"
          width={90}
          height={90}
          className="md:mt-8 rounded-2xl object-cover shadow-xl"
        />
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
        <Link href="/sign-in" className="cursor-pointer animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]">
          <Button className="font-bold w-52">Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button className="font-bold bg-[#1877f2] hover:bg-[#1877f2]/90 w-52">
            Sign Up
          </Button>
        </Link>
        {/* <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Shimmer
      </button> */}
        </div>
        <h1 className="text-base py-8 font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-[#2af598] to-[#009efd] drop-shadow-lg">
          <Link href="/chatapp">AI-powered messaging platform</Link>
        </h1>

        {/* <Image
          src="/blockchain.gif"
          alt="Blokchain Icon"
          width={100}
          height={100}
          unoptimized
          className="rounded-2xl shadow-xl"
        /> */}
      </div>
    </main>
  );
}
