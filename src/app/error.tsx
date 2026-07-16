"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fafaf7] px-5 py-20">
      <section
        aria-labelledby="error-title"
        className="w-full max-w-2xl rounded-[1.75rem] border border-neutral-200 bg-white p-7 shadow-[0_24px_75px_rgba(18,20,22,0.07)] sm:p-10"
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          Ошибка загрузки
        </p>
        <h1
          className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-neutral-950 sm:text-6xl"
          id="error-title"
        >
          Что-то пошло не так
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
          Попробуйте загрузить страницу ещё раз. Если ошибка повторится,
          вернитесь на главную и свяжитесь с автошколой.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw aria-hidden="true" size={17} strokeWidth={1.8} />
            Попробовать снова
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
