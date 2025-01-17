import { cn } from "@/lib/utils";
import Marquee from "./ui/marquee";

const reviews = [
  {
    body: "Visit Melaka 2025",
  },
  {
    body: "Melaka Tourism 2025",
  },
  {
    body: "Visit Malaysia 2025",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ body }: { body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-fit cursor-pointer overflow-hidden rounded-xl border px-3 py-2",
        "bg-gradient-to-br from-[#37ecb9cb] to-[#0061fd]",
        "flex flex-row items-center justify-center"
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="text-xl font-bold text-center text-neutral-200">{body}</blockquote>
    </figure>
  );
};

export function AdsSection() {
  return (
    <div className="relative flex w-full justify-center overflow-hidden rounded-lg md:shadow-xl">
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
