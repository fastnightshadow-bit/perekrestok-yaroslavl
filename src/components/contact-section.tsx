"use client";

import {
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import { EnrollmentForm } from "@/components/enrollment-form";
import { YandexMap } from "@/components/yandex-map";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";

export function ContactSection() {
  return (
    <section
      aria-labelledby="contacts-title"
      className="bg-[#fafaf7] pb-20 sm:pb-24 lg:pb-28"
      id="contacts"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              Свяжитесь с нами
            </p>
            <h2
              className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
              id="contacts-title"
            >
              Контакты
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Позвоните или оставьте заявку — поможем выбрать программу и
              ответим на вопросы об обучении.
            </p>

            <dl className="mt-9 space-y-6 border-t border-neutral-300 pt-7">
              <div>
                <dt className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-neutral-600">
                  <MapPin
                    aria-hidden="true"
                    className="shrink-0"
                    size={20}
                    strokeWidth={1.7}
                  />
                  <span>
                    Адрес
                  </span>
                </dt>
                <dd className="mt-1.5 pl-9 text-base font-semibold text-neutral-950">
                  {contactDetails.address}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-neutral-600">
                  <Phone
                    aria-hidden="true"
                    className="shrink-0"
                    size={20}
                    strokeWidth={1.7}
                  />
                  <span>
                    Телефон
                  </span>
                </dt>
                <dd className="mt-1.5 space-y-1 pl-9">
                  {contactDetails.phones.map((phone) => (
                    <a
                      className="block text-base font-semibold text-neutral-950 transition-colors hover:text-neutral-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                      href={phone.href}
                      key={phone.href}
                    >
                      {phone.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-neutral-600">
                  <Mail
                    aria-hidden="true"
                    className="shrink-0"
                    size={20}
                    strokeWidth={1.7}
                  />
                  <span>
                    Email
                  </span>
                </dt>
                <dd className="mt-1.5 pl-9">
                  <a
                    className="text-base font-semibold text-neutral-950 transition-colors hover:text-neutral-600"
                    href={contactDetails.emailHref}
                  >
                    {contactDetails.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-neutral-600">
                  <Clock3
                    aria-hidden="true"
                    className="shrink-0"
                    size={20}
                    strokeWidth={1.7}
                  />
                  <span>
                    Режим работы
                  </span>
                </dt>
                <dd className="mt-1.5 pl-9 text-base font-semibold text-neutral-950">
                  {contactDetails.hours}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={contactDetails.phoneHref}>
                  <Phone aria-hidden="true" size={18} />
                  Позвонить
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={contactDetails.routeHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Navigation aria-hidden="true" size={18} />
                  Построить маршрут
                </a>
              </Button>
            </div>

          </div>

          <YandexMap />
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_24px_75px_rgba(18,20,22,0.065)] sm:p-8 lg:mt-16 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Запись на консультацию
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-3xl">
              Оставьте контакты — мы перезвоним
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600 sm:text-base">
              Можно сразу указать удобное время занятий или задать вопрос.
            </p>
          </div>

          <div className="mt-7">
            <EnrollmentForm
              leadType="contact"
              layout="contact"
              showComment
              source="contacts"
              submitLabel="Записаться"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
