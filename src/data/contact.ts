import { siteConfig } from "@/config/site";

const [primaryPhone, secondaryPhone] = siteConfig.contact.phones;

export const contactDetails = {
  ...siteConfig.contact,
  phoneDisplay: primaryPhone.display,
  phoneHref: primaryPhone.href,
  primaryPhone,
  secondaryPhone,
} as const;
