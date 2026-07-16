import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { contactDetails } from "@/data/contact";

const footerNavigation = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Стоимость", href: "#pricing" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const learningNavigation = [
  { label: "Программы", href: "#programs" },
  { label: "Подбор программы", href: "#quiz" },
  { label: "Как проходит обучение", href: "#learning" },
  { label: "Инструкторы", href: "#instructors" },
  { label: "Автопарк", href: "#fleet" },
];

const linkClassName =
  "text-sm leading-6 text-white/55 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/10 bg-[#151719] pb-[calc(8rem+env(safe-area-inset-bottom))] pt-14 text-white sm:pt-16 md:pb-10 lg:pt-20"
      id="footer"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1fr_0.8fr_1fr] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              aria-label="Перекрёсток — наверх"
              className="inline-flex items-center text-xl font-extrabold tracking-[-0.055em] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              href="#hero"
            >
              ПЕРЕКРЁСТОК
              <span
                aria-hidden="true"
                className="ml-1.5 size-2 rounded-full bg-yellow-400"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              Обучение вождению в Ярославле с понятным путём от первого
              занятия до экзамена.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Навигация
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a className={linkClassName} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Обучение
            </h2>
            <ul className="mt-4 space-y-2.5">
              {learningNavigation.map((item) => (
                <li key={item.href}>
                  <a className={linkClassName} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Контакты
            </h2>
            <ul className="mt-4 space-y-2.5">
              {contactDetails.phones.map((phone) => (
                <li key={phone.href}>
                  <a className={linkClassName} href={phone.href}>
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a className={linkClassName} href={contactDetails.emailHref}>
                  {contactDetails.email}
                </a>
              </li>
              <li className="text-sm leading-6 text-white/55">
                Ярославль
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Социальные сети
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  className={`${linkClassName} inline-flex items-center gap-1.5`}
                  href={siteConfig.social.vk}
                  rel="noreferrer"
                  target="_blank"
                >
                  ВКонтакте
                  <ArrowUpRight aria-hidden="true" size={13} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              Документы
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  className={linkClassName}
                  href={siteConfig.legal.privacy}
                  rel="noreferrer"
                  target="_blank"
                >
                  Политика конфиденциальности
                </a>
              </li>
              <li className="text-sm leading-6 text-white/55">
                Лицензия
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>© 2026 Автошкола «Перекрёсток». Все права защищены.</p>
          <p>Обучение категории B · Ярославль</p>
        </div>
      </div>
    </footer>
  );
}
