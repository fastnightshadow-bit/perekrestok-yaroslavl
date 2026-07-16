import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 py-20 text-white">
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 sm:p-10"
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400">
          404
        </p>
        <h1
          className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-6xl"
          id="not-found-title"
        >
          Страница не найдена
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
          Возможно, ссылка устарела или адрес был введён неправильно.
          Вернитесь на главную или сразу откройте контакты автошколы.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" size={18} />
              Вернуться на главную
            </Link>
          </Button>
          <Button
            asChild
            className="border-white/20 bg-white/5 text-white hover:border-white/45 hover:bg-white/10"
            variant="outline"
          >
            <Link href="/#contacts">
              <MapPin aria-hidden="true" size={18} />
              Перейти к контактам
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
