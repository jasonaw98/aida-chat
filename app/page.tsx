import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/cloudserver";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect('/chatapp')
  }

  return (
    <main className="flex flex-col items-center justify-center h-[95%]">
      <div className="flex flex-col items-center justify-center">
        {/* <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-2">
          Welcome to
        </h1> */}
        {/* <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
          IDRead AI Messenger
        </h1> */}
        <div className="flex flex-col items-center justify-center gap-3">
          <TextAnimate text="Welcome To" type="popIn" className="text-3xl" />
          <TextAnimate
            text="ID Read AI Messenger"
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
          <Link href="/login" className="cursor-pointer">
            <Button className="font-bold w-52 animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1b2739,55%,#000103)] bg-[length:200%_100%] border border-slate-800">
              Get Started
            </Button>
          </Link>
        </div>
        <h1 className="text-base py-8 font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-[#2af598] to-[#009efd] drop-shadow-lg">
          <Link href="/chatapp">AI-powered messaging platform</Link>
        </h1>
      </div>
    </main>
  );
}
