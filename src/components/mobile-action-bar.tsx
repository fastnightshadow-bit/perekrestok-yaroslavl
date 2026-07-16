"use client";

import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";

type MobileActionBarProps = {
  onEnroll: () => void;
};

export function MobileActionBar({ onEnroll }: MobileActionBarProps) {
  return (
    <nav
      aria-label="Быстрые действия"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-[#fafaf7]/95 px-3 pt-3 shadow-[0_-12px_40px_rgba(18,20,22,0.08)] backdrop-blur-xl md:hidden"
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        <Button asChild size="sm" variant="outline">
          <a href={contactDetails.phoneHref}>
            <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
            Позвонить
          </a>
        </Button>
        <Button onClick={onEnroll} size="sm">
          Записаться
        </Button>
      </div>
    </nav>
  );
}
