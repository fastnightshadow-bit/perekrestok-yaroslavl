import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Отзывы учеников",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewsPlaceholderPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 py-20 text-white">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400">
          Страница в разработке
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-6xl">
          Все отзывы скоро появятся здесь
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
          На главной странице уже собраны опубликованные отзывы учеников.
          Отдельный каталог отзывов будет доступен после запуска сайта.
        </p>
        <Button asChild className="mt-8">
          <Link href="/#reviews">
            <ArrowLeft aria-hidden="true" size={18} />
            Вернуться к отзывам
          </Link>
        </Button>
      </div>
    </main>
  );
}
