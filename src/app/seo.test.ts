import { describe, expect, it } from "vitest";

import { metadata } from "./layout";
import { metadata as reviewsMetadata } from "./reviews/page";
import robots from "./robots";
import sitemap from "./sitemap";
import { getDrivingSchoolJsonLd } from "@/lib/structured-data";

describe("technical SEO", () => {
  it("publishes canonical, Open Graph and Twitter metadata", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://perekrestok76.ru/");
    expect(metadata.alternates).toMatchObject({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      locale: "ru_RU",
      type: "website",
      url: "/",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
    });
    expect(metadata.description).toContain("Более 85%");
    expect(metadata.description).toContain("оплата частями");
    expect(metadata.description).not.toMatch(/механик|автомат/i);
  });

  it("allows the home page and publishes its sitemap", () => {
    expect(robots()).toMatchObject({
      rules: { allow: "/", userAgent: "*" },
      sitemap: "https://perekrestok76.ru/sitemap.xml",
    });
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://perekrestok76.ru",
        }),
        expect.objectContaining({
          url: "https://perekrestok76.ru/privacy/",
        }),
        expect.objectContaining({
          url: "https://perekrestok76.ru/consent/",
        }),
        expect.objectContaining({
          url: "https://perekrestok76.ru/cookies/",
        }),
      ]),
    );
  });

  it("uses verified business data in structured data", () => {
    const jsonLd = getDrivingSchoolJsonLd();

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      name: "Автошкола «Перекрёсток»",
      telephone: ["+74852700303", "+79301000303"],
      email: "perekrestok.76@yandex.ru",
      url: "https://perekrestok76.ru",
    });
    expect(jsonLd.address).toMatchObject({
      addressLocality: "Ярославль",
      streetAddress: "ул. Республиканская, д. 3, корп. 1, оф. 405, 4 этаж",
    });
    expect(jsonLd.priceRange).toBe("1 300–47 600 ₽");
    expect(jsonLd.openingHoursSpecification).toEqual([
      expect.objectContaining({
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "17:00",
      }),
    ]);
  });

  it("keeps the unfinished reviews route out of search results", () => {
    expect(reviewsMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });
});
