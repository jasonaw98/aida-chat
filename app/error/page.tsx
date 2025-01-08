import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <ServerCrash className="size-20 text-red-500" />
      <p className="text-2xl">Opps, sorry something went wrong</p>
      <Link href={"/chatapp"}>
        <Button variant={"destructive"}>Reload</Button>
      </Link>
    </div>
  );
}
