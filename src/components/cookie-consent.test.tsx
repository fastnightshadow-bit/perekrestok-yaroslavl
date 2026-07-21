import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CookieBanner } from "./cookie-banner";
import {
  COOKIE_CONSENT_KEY,
  CookieConsentProvider,
} from "./cookie-consent-provider";
import { CookieSettingsDialog } from "./cookie-settings-dialog";
import { CookieSettingsButton } from "./cookie-settings-button";
import { YandexMetrika } from "./yandex-metrika";

function renderConsent() {
  return render(
    <CookieConsentProvider>
      <CookieBanner />
      <CookieSettingsDialog />
      <CookieSettingsButton />
      <YandexMetrika />
    </CookieConsentProvider>,
  );
}

describe("cookie consent", () => {
  beforeEach(() => {
    localStorage.clear();
    delete process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    document.querySelector("#yandex-metrika-script")?.remove();
    delete (window as Window & { ym?: unknown }).ym;
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  });

  it("asks for consent again after the cookie notice is updated", async () => {
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = "12345678";
    localStorage.setItem("perekrestok-cookie-consent-v1", "accepted");

    renderConsent();

    expect(
      await screen.findByRole("complementary", { name: "Настройки cookie" }),
    ).toBeInTheDocument();
    expect(document.querySelector("#yandex-metrika-script")).toBeNull();
  });

  it("shows a compact non-blocking choice and saves necessary-only", async () => {
    const user = userEvent.setup();
    renderConsent();

    expect(
      await screen.findByRole("complementary", { name: "Настройки cookie" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Только необходимые" }),
    );

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("necessary");
    expect(
      screen.queryByRole("complementary", { name: "Настройки cookie" }),
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  it("opens settings and closes them with Escape", async () => {
    const user = userEvent.setup();
    renderConsent();

    await user.click(await screen.findByRole("button", { name: "Настроить" }));
    expect(
      screen.getByRole("dialog", { name: "Настройки cookie" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("loads Metrika only with an id and analytics consent", async () => {
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = "12345678";
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    renderConsent();

    await waitFor(() => {
      expect(
        document.querySelector("#yandex-metrika-script"),
      ).toHaveAttribute(
        "src",
        "https://mc.yandex.ru/metrika/tag.js?id=12345678",
      );
    });

    const ym = (window as Window & {
      ym?: { a?: unknown[][] };
    }).ym;

    expect(ym?.a).toContainEqual([
      12345678,
      "init",
      {
        accurateTrackBounce: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        ssr: true,
        trackLinks: true,
        url: window.location.href,
        webvisor: true,
      },
    ]);
  });

  it("does not load Metrika without consent", async () => {
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = "12345678";
    localStorage.setItem(COOKIE_CONSENT_KEY, "necessary");
    renderConsent();

    await waitFor(() => {
      expect(
        screen.queryByRole("complementary", { name: "Настройки cookie" }),
      ).not.toBeInTheDocument();
    });
    expect(document.querySelector("#yandex-metrika-script")).toBeNull();
  });

  it("removes Metrika when analytics consent is withdrawn", async () => {
    const user = userEvent.setup();
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = "12345678";
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    renderConsent();

    await waitFor(() => {
      expect(document.querySelector("#yandex-metrika-script")).not.toBeNull();
    });
    await user.click(screen.getByRole("button", { name: "Настройки cookie" }));
    await user.click(screen.getByRole("checkbox", { name: /Аналитика/i }));
    await user.click(screen.getByRole("button", { name: "Сохранить выбор" }));

    await waitFor(() => {
      expect(document.querySelector("#yandex-metrika-script")).toBeNull();
    });
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("necessary");
  });
});
