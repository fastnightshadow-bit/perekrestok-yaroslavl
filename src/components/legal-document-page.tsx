import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { publicPath } from "@/lib/public-path";

type LegalDocumentPageProps = {
  children: ReactNode;
  description: string;
  title: string;
};

type LegalSectionProps = {
  children: ReactNode;
  title: string;
};

export function LegalDocumentPage({
  children,
  description,
  title,
}: LegalDocumentPageProps) {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-950">
      <header className="border-b border-neutral-200 bg-white/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5 px-5 py-5 sm:px-8">
          <a
            className="inline-flex items-center text-lg font-extrabold tracking-[-0.055em] outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-yellow-400"
            href={publicPath("/")}
          >
            ПЕРЕКРЁСТОК
            <span
              aria-hidden="true"
              className="ml-1.5 size-2 rounded-full bg-yellow-400"
            />
          </a>
          <a
            className="rounded-lg text-sm font-semibold text-neutral-600 outline-none transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-yellow-400"
            href={publicPath("/")}
          >
            Вернуться на сайт
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <article className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_24px_75px_rgba(18,20,22,0.06)]">
          <div className="border-b border-neutral-200 p-6 sm:p-9 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Документы автошколы
            </p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.055em]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              {description}
            </p>
            <p className="mt-5 text-sm font-medium text-neutral-500">
              Редакция от 18 июля 2026 года
            </p>
          </div>

          <div className="space-y-10 p-6 sm:p-9 lg:p-12">{children}</div>
        </article>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-7 text-sm text-neutral-500 sm:px-8">
          <p>{siteConfig.legal.operator.shortName}</p>
          <a
            className="w-fit underline underline-offset-2 outline-none hover:text-neutral-950 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-yellow-400"
            href={siteConfig.legal.operator.emailHref}
          >
            {siteConfig.legal.operator.email}
          </a>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({ children, title }: LegalSectionProps) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}
