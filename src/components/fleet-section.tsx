"use client";

import { Phone } from "lucide-react";

import { CarCard } from "@/components/car-card";
import { EmptyState } from "@/components/empty-state";
import { useEnrollment } from "@/components/enrollment-provider";
import { Button } from "@/components/ui/button";
import { trainingCars, type TrainingCar } from "@/data/cars";
import { contactDetails } from "@/data/contact";

type FleetSectionProps = {
  items?: readonly TrainingCar[];
};

export function FleetSection({ items = trainingCars }: FleetSectionProps) {
  const { openEnrollment } = useEnrollment();

  return (
    <section
      aria-labelledby="fleet-title"
      className="bg-[#fafaf7] pb-20 sm:pb-24 lg:pb-28"
      id="fleet"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Практика на понятных автомобилях
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="fleet-title"
          >
            Автопарк
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Реальные модели, которые указаны у инструкторов автошколы на
            официальном сайте.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
            Доступность конкретного автомобиля уточняйте при записи
          </p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid min-w-0 gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((car) => (
              <CarCard
                car={car}
                key={car.id}
                onEnroll={(program) => openEnrollment(program, "fleet")}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Уточните доступные учебные автомобили у администратора при записи."
            title="Автомобили временно недоступны"
          />
        )}

        <div className="mt-10 flex flex-col gap-6 rounded-[1.75rem] bg-neutral-950 p-6 text-white shadow-[0_28px_80px_rgba(18,20,22,0.12)] sm:mt-14 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Не знаете, какой автомобиль выбрать?
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              Подскажем, какие автомобили доступны, и поможем выбрать
              инструктора.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button onClick={() => openEnrollment("Консультация по обучению", "fleet")}>
              Получить консультацию
            </Button>
            <Button
              asChild
              className="border-white/20 bg-white/5 text-white hover:border-white/45 hover:bg-white/10"
              variant="outline"
            >
              <a href={contactDetails.phoneHref}>
                <Phone aria-hidden="true" size={18} />
                Позвонить
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
