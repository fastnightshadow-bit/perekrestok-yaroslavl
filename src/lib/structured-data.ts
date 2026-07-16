import { siteConfig } from "@/config/site";

export function getDrivingSchoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.heroImage}`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phones.map((phone) => phone.international),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.locality,
      addressRegion: siteConfig.contact.region,
      addressCountry: siteConfig.contact.country,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "17:00",
      },
    ],
    sameAs: [siteConfig.social.vk, siteConfig.social.yandexMaps],
    priceRange: "12 000–53 800 ₽",
  };
}
