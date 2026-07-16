"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { TrainingCar } from "@/data/cars";

type CarCardProps = {
  car: TrainingCar;
  onEnroll: (program: string) => void;
};

export function CarCard({ car, onEnroll }: CarCardProps) {
  return (
    <article
      aria-label={car.model}
      className="interactive-card group flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(18,20,22,0.05)] hover:border-neutral-300 hover:shadow-[0_30px_80px_rgba(18,20,22,0.1)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          alt={`${car.model}, учебный автомобиль`}
          className="interactive-image object-cover"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
          src={car.image}
          style={{ objectPosition: car.imagePosition }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-2xl font-semibold tracking-[-0.045em] text-neutral-950">
          {car.model}
        </h3>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          {car.description}
        </p>

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-neutral-100 p-4 text-sm leading-6 text-neutral-700">
          <UserRound aria-hidden="true" className="mt-1 shrink-0" size={16} />
          <span>{car.instructors.join(", ")}</span>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={() => onEnroll(`Автомобиль: ${car.model}`)}
        >
          Записаться
        </Button>
      </div>
    </article>
  );
}
