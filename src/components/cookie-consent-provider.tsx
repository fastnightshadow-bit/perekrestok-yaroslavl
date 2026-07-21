"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CookieConsent = "accepted" | "necessary" | null;

export const COOKIE_CONSENT_KEY = "perekrestok-cookie-consent-v2";

type CookieConsentContextValue = {
  consent: CookieConsent;
  hydrated: boolean;
  settingsOpen: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted" || stored === "necessary") {
      setConsent(stored);
    }
    setHydrated(true);
  }, []);

  const saveConsent = useCallback((value: Exclude<CookieConsent, null>) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setConsent(value);
    setSettingsOpen(false);
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hydrated,
      settingsOpen,
      acceptAll: () => saveConsent("accepted"),
      acceptNecessary: () => saveConsent("necessary"),
      openSettings,
      closeSettings,
    }),
    [closeSettings, consent, hydrated, openSettings, saveConsent, settingsOpen],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
