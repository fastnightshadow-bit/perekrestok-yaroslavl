import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getProgramBySlug, programs } from "@/data/programs";

type ProgramPlaceholderPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramPlaceholderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  return {
    title: program?.name ?? "Программа обучения",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProgramPlaceholderPage({
  params,
}: ProgramPlaceholderPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#fafaf7] px-5 py-16">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-neutral-200 bg-white p-7 shadow-[0_24px_75px_rgba(18,20,22,0.07)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          Страница программы готовится
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-neutral-950 sm:text-6xl">
          {program.name}
        </h1>
        <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
          {program.description}
        </p>
        <dl className="mt-8 grid gap-4 rounded-2xl bg-neutral-100 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Объём
            </dt>
            <dd className="mt-2 font-semibold text-neutral-950">
              {program.volume}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Формат
            </dt>
            <dd className="mt-2 font-semibold text-neutral-950">
              {program.format}
            </dd>
          </div>
        </dl>
        <Button asChild className="mt-8" variant="outline">
          <Link href="/#programs">
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
            Вернуться к программам
          </Link>
        </Button>
      </div>
    </main>
  );
}
