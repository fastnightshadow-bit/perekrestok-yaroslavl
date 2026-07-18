"use client";

import { useCookieConsent } from "@/components/cookie-consent-provider";

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const { openSettings } = useCookieConsent();

  return (
    <button className={className} onClick={openSettings} type="button">
      Настройки cookie
    </button>
  );
}
