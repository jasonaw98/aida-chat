"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

// Define the type for a review
type Review = {
  id: string;
  body: string;
  content: React.ReactNode; // React component for dialog content
};

// Extend the reviews array to include an id, body, and React component for content
const reviews: Review[] = [
  {
    id: "visit-pahang",
    body: "Visit Pahang 2025",
    content: (
      <span className="flex justify-center pt-2">
        <iframe
          src="https://www.youtube.com/embed/q5_S5r7yjSY"
          width={"100%"}
          height={200}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </span>
    ),
  },
  {
    id: "melaka-tourism-2026",
    body: "Melaka Tourism 2026",
    content: (
      <span className="flex justify-center pt-2">
        <iframe
          src="https://www.youtube.com/embed/iy_hNq5dn0g"
          width={"100%"}
          height={200}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </span>
    ),
  },
  {
    id: "visit-malaysia-2026",
    body: "Visit Malaysia 2026",
    content: (
      <span className="flex justify-center pt-2">
        <iframe
          src="https://www.youtube.com/embed/DoHXFXv7rv0"
          width={"100%"}
          height={200}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </span>
    ),
  },
];

const ReviewCard = ({ body }: { body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-fit cursor-pointer overflow-hidden rounded-xl border px-3 py-2",
        "bg-linear-to-br from-[#37ecb9cb] to-[#0061fd]",
        "flex flex-row items-center justify-center"
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="text-xl font-bold text-center text-neutral-200">
        {body}
      </blockquote>
    </figure>
  );
};

export function AdsSection() {
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  // Find the selected review based on the selectedReviewId
  const selectedReview = reviews.find(
    (review) => review.id === selectedReviewId
  );

  return (
    <div className="relative flex w-full justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:10s]" style={{animationDuration: "10s"}}>
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </Marquee>
      {/* <Dialog>
        <Marquee pauseOnHover className="[--duration:35s]">
          {reviews.map((review, i) => (
            <DialogTrigger
              // asChild
              key={i}
              onClick={() => setSelectedReviewId(review.id)}
            >
              <ReviewCard key={i} {...review} />
            </DialogTrigger>
          ))}
        </Marquee>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{selectedReview?.body}</DialogTitle>
            <DialogDescription>{selectedReview?.content}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
