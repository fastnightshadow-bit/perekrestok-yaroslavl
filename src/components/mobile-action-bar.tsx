"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";

type MobileActionBarProps = {
  onEnroll: () => void;
};

export function MobileActionBar({ onEnroll }: MobileActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -35% 0px" },
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-hidden={!isVisible}
      aria-label="Быстрые действия"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-[#fafaf7]/95 px-3 pt-3 shadow-[0_-12px_40px_rgba(18,20,22,0.08)] backdrop-blur-xl transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-full opacity-0"
      }`}
      data-testid="mobile-action-bar"
      data-visible={isVisible}
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        <Button asChild size="sm" variant="outline">
          <a href={contactDetails.phoneHref} tabIndex={isVisible ? undefined : -1}>
            <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
            Позвонить
          </a>
        </Button>
        <Button onClick={onEnroll} size="sm" tabIndex={isVisible ? undefined : -1}>
          Записаться
        </Button>
      </div>
    </nav>
  );
}
