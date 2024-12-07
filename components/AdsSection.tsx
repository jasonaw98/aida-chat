import { cn } from "@/lib/utils";
import Marquee from "./ui/marquee";

const reviews = [
  {
    body: "Pamiran Kereta EV di...",
  },
  {
    body: "Bazaar kereta EV di...",
  },
  {
    body: "Pamiran Kereta EV di...",
  },
  {
    body: "Pamiran Kereta EV di...",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ body }: { body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border",
        "bg-[linear-gradient(to_right,_#96fbc4_0%,_#f9f586_100%)]",
        "flex flex-row items-center justify-center"
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="text-xl font-bold text-center">{body}</blockquote>
    </figure>
  );
};

export function AdsSection() {
  return (
    <div className="relative flex h-[70px] w-full justify-center overflow-hidden rounded-lg border md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div> */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
