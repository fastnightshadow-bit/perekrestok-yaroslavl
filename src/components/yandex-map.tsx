import { Navigation } from "lucide-react";

import { siteConfig } from "@/config/site";

export function YandexMap() {
  return (
    <div
      aria-label="Карта автошколы"
      className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-100 shadow-[0_28px_85px_rgba(18,20,22,0.12)]"
      role="region"
    >
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={siteConfig.contact.mapEmbedUrl}
        title="Интерактивная карта автошколы «Перекрёсток»"
      />
      <a
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/95 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        href={siteConfig.contact.routeHref}
        rel="noreferrer"
        target="_blank"
      >
        <Navigation aria-hidden="true" size={16} strokeWidth={1.8} />
        Открыть в Яндекс Картах
      </a>
    </div>
  );
}
