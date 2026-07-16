import { MapPin, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";

export function MapPlaceholder() {
  return (
    <div
      aria-label="Карта автошколы"
      className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] bg-[#202326] text-white shadow-[0_28px_85px_rgba(18,20,22,0.14)]"
      role="region"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-16 top-28 h-12 w-[130%] -rotate-12 rounded-full border-y border-white/10 bg-white/[0.045]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-28 h-14 w-[120%] rotate-[28deg] rounded-full border-y border-white/10 bg-white/[0.04]"
      />

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span className="grid size-16 place-items-center rounded-full bg-yellow-400 text-neutral-950 shadow-[0_18px_45px_rgba(245,197,24,0.25)]">
          <MapPin aria-hidden="true" size={28} strokeWidth={1.9} />
        </span>
        <span className="mx-auto block h-10 w-px bg-gradient-to-b from-yellow-400 to-transparent" />
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-white/10 bg-neutral-950/75 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-400">
          Место для Яндекс.Карт
        </p>
        <p className="mt-2 text-lg font-semibold tracking-[-0.025em]">
          Автошкола «Перекрёсток»
        </p>
        <p className="mt-1 text-sm text-white/55">
          ул. Республиканская, д. 3, корп. 1, оф. 405
        </p>
        <Button
          asChild
          className="mt-4 w-full border-white/15 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 sm:w-auto"
          size="sm"
          variant="outline"
        >
          <a
            href={contactDetails.routeHref}
            rel="noreferrer"
            target="_blank"
          >
            <Navigation aria-hidden="true" size={16} />
            Открыть в Яндекс Картах
          </a>
        </Button>
      </div>
    </div>
  );
}
