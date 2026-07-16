"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openItemId, setOpenItemId] = useState<string | null>(
    faqItems[0]?.id ?? null,
  );

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-[#fafaf7] pb-20 sm:pb-24 lg:pb-28"
      id="faq"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-12 xl:px-16">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Ответы перед стартом
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="faq-title"
          >
            Частые вопросы
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Собрали главное об обучении, оплате и начале занятий, чтобы
            решение было проще принять.
          </p>
        </div>

        <div className="min-w-0 border-t border-neutral-300">
          {faqItems.map((item, index) => {
            const isOpen = openItemId === item.id;
            const answerId = `faq-answer-${item.id}`;

            return (
              <div className="border-b border-neutral-300" key={item.id}>
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-4 sm:py-7"
                    onClick={() =>
                      setOpenItemId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 text-xs font-bold text-neutral-600"
                    >
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-lg font-semibold tracking-[-0.025em] text-neutral-950 sm:text-xl">
                      {item.question}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-neutral-300 bg-white transition-[background-color,border-color] duration-200 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                        size={18}
                        strokeWidth={1.8}
                      />
                    </span>
                  </button>
                </h3>

                {isOpen ? (
                    <div
                      className="faq-answer-enter overflow-hidden"
                      id={answerId}
                      role="region"
                    >
                      <p className="pb-7 pl-12 pr-14 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
