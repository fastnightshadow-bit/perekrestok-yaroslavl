import { Quote } from "lucide-react";

import type { StudentReview } from "@/data/reviews";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: StudentReview;
  index: number;
};

export function ReviewCard({ review, index }: ReviewCardProps) {
  const isAccent = index % 3 === 1;

  return (
    <article
      aria-label={`Отзыв ${review.name}`}
      className={cn(
        "relative flex min-h-[25rem] w-[88vw] max-w-[35rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:w-[31rem] sm:p-8",
        isAccent
          ? "border-yellow-400/25 bg-yellow-400 text-neutral-950"
          : "border-white/10 bg-white/[0.055] text-white",
      )}
    >
      <Quote
        aria-hidden="true"
        className={isAccent ? "text-neutral-950/40" : "text-yellow-400"}
        size={30}
        strokeWidth={1.7}
      />

      <blockquote className="mt-8 flex-1 text-xl font-medium leading-[1.45] tracking-[-0.025em] sm:text-2xl">
        «{review.text}»
      </blockquote>

      <div
        className={cn(
          "mt-8 flex items-center gap-4 border-t pt-5",
          isAccent ? "border-neutral-950/15" : "border-white/10",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "grid size-14 shrink-0 place-items-center rounded-full text-lg font-semibold",
            isAccent ? "bg-neutral-950 text-white" : "bg-white/10 text-white",
          )}
        >
          {review.initials}
        </span>
        <p className="truncate font-semibold">{review.name}</p>
      </div>
    </article>
  );
}
