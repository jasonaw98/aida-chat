import Image from "next/image";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-12">
      <div className="relative flex flex-col h-[90vh] items-center justify-center overflow-hidden rounded-lg bg-background px-8 pb-36 md:shadow-xl">
        <GridPattern
          width={50}
          height={50}
          x={-2}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,transparent,white,transparent)] absolute inset-0 z-auto"
          )}
        />
        <div className="flex flex-col items-center justify-center relative z-20">
          <h1 className="text-4xl font-black text-center text-neutral-700 ">
            IDRead Messenger
          </h1>
          <p className="text-sm text-blue-500 font-bold mt-5">Personal</p>
          <Image
            src="/aidaicon.png"
            alt="AIDA Icon"
            width={100}
            height={100}
            className="mt-8"
          />
          <Link href="/sign-in" className="cursor-pointer">
            <button className="mt-10 bg-gradient-to-b from-gray-500 via-black to-gray-900 text-white py-3 w-52 rounded-xl font-bold">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="mt-5 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-700 text-white py-3 w-52 rounded-xl font-bold">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
