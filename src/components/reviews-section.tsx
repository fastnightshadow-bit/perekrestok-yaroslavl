"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";

import { EmptyState } from "@/components/empty-state";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { studentReviews, type StudentReview } from "@/data/reviews";
import { schoolFacts } from "@/data/school-facts";
import { siteConfig } from "@/config/site";

type ReviewsSectionProps = {
  items?: readonly StudentReview[];
};

export function ReviewsSection({
  items = studentReviews,
}: ReviewsSectionProps) {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: -1 | 1) => {
    const container = reviewsRef.current;

    if (!container || typeof container.scrollBy !== "function") {
      return;
    }

    container.scrollBy({
      behavior: "smooth",
      left: direction * Math.min(container.clientWidth * 0.85, 560),
    });
  };

  return (
    <section
      aria-labelledby="reviews-title"
      className="overflow-hidden bg-neutral-950 pb-[calc(8.5rem+env(safe-area-inset-bottom))] pt-20 text-white sm:pt-24 md:pb-28 lg:pb-32 lg:pt-28"
      id="reviews"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400 sm:text-sm">
              Опыт наших учеников
            </p>
            <h2
              className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em]"
              id="reviews-title"
            >
              Отзывы учеников
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Короткие истории о первых занятиях, поддержке инструкторов
              и уверенности за рулём.
            </p>
          </div>

          {items.length > 0 ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star aria-hidden="true" fill="currentColor" size={22} strokeWidth={1.8} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">
                  Рейтинг на Яндекс Картах
                </span>
              </div>
              <div className="mt-4 flex items-end gap-3">
                <strong className="text-5xl font-semibold tracking-[-0.06em]">
                  {schoolFacts.yandexRating}
                </strong>
                <span className="pb-1 text-sm text-white/55">из 5</span>
              </div>
              <p className="mt-3 text-sm text-white/50">
                {schoolFacts.yandexRatingCount} оценок учеников
              </p>
            </div>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="mt-10 flex items-center justify-between gap-4 sm:mt-14">
            <p className="text-sm text-white/55">
              Листайте, чтобы увидеть больше
            </p>
            <div className="flex gap-2">
              <Button
                aria-label="Предыдущие отзывы"
                className="border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                onClick={() => scrollReviews(-1)}
                size="icon"
                variant="outline"
              >
                <ArrowLeft aria-hidden="true" size={19} />
              </Button>
              <Button
                aria-label="Следующие отзывы"
                className="border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                onClick={() => scrollReviews(1)}
                size="icon"
                variant="outline"
              >
                <ArrowRight aria-hidden="true" size={19} />
              </Button>
            </div>
          </div>
        ) : (
          <EmptyState
            description="Новые отзывы появятся после обновления данных. Задать вопрос об обучении можно в разделе контактов."
            title="Отзывы временно недоступны"
          />
        )}
      </div>

      {items.length > 0 ? (
        <>
          <div
            aria-label="Лента отзывов учеников"
            className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:gap-5 sm:px-8 lg:px-12 xl:px-[max(4rem,calc((100vw-1440px)/2+4rem))] [&::-webkit-scrollbar]:hidden"
            ref={reviewsRef}
            role="group"
          >
            {items.map((review, index) => (
              <ReviewCard index={index} key={review.id} review={review} />
            ))}
            <div aria-hidden="true" className="w-1 shrink-0" />
          </div>

          <div className="mx-auto mt-8 w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <Button
              asChild
              className="border-white/20 bg-white/5 text-white hover:border-white/45 hover:bg-white/10"
              variant="outline"
            >
              <a
                href={siteConfig.social.yandexReviews}
                rel="noreferrer"
                target="_blank"
              >
                Смотреть все отзывы
              </a>
            </Button>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.1em] text-white/55">
              Актуальный рейтинг и отзывы — на Яндекс Картах
            </p>
          </div>
        </>
      ) : null}
    </section>
  );
}
