import { publicPath } from "@/lib/public-path";

const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://perekrestok76.ru";

export const siteConfig = {
  name: "Автошкола «Перекрёсток»",
  shortName: "Перекрёсток",
  city: "Ярославль",
  url: deploymentUrl,
  locale: "ru_RU",
  title:
    "Автошкола «Перекрёсток» — обучение вождению в Ярославле",
  description:
    "Обучение вождению категории B в автошколе «Перекрёсток» в центре Ярославля. Более 85% учеников сдают с первого раза, доступна оплата частями.",
  contact: {
    address:
      "г. Ярославль, ул. Республиканская, д. 3, корп. 1, оф. 405, 4 этаж",
    streetAddress: "ул. Республиканская, д. 3, корп. 1, оф. 405, 4 этаж",
    locality: "Ярославль",
    region: "Ярославская область",
    country: "RU",
    email: "perekrestok.76@yandex.ru",
    emailHref: "mailto:perekrestok.76@yandex.ru",
    hours: "Пн–Чт 12:00–17:00, Пт–Вс — выходной",
    phones: [
      {
        display: "+7 (4852) 70-03-03",
        href: "tel:+74852700303",
        international: "+74852700303",
      },
      {
        display: "+7 (930) 100-03-03",
        href: "tel:+79301000303",
        international: "+79301000303",
      },
    ],
    routeHref:
      "https://yandex.ru/maps/org/perekrestok/1387073255/",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=39.883644%2C57.639569&mode=search&oid=1387073255&ol=biz&z=17.13",
  },
  social: {
    vk: "https://vk.com/perekrestok76",
    yandexMaps: "https://yandex.ru/maps/org/perekrestok/1387073255/",
    yandexReviews:
      "https://yandex.ru/maps/org/perekrestok/1387073255/reviews/",
  },
  legal: {
    privacy: publicPath("/privacy"),
    consent: publicPath("/consent"),
    cookies: publicPath("/cookies"),
    operator: {
      fullName:
        "Общество с ограниченной ответственностью Автошкола «Перекрёсток»",
      shortName: "ООО Автошкола «Перекрёсток»",
      inn: "7620006816",
      ogrn: "1177627032880",
      legalAddress:
        "152742, Ярославская область, Некоузский район, деревня Григорево, улица Светлая, дом 6",
      email: "perekrestok.76@yandex.ru",
      emailHref: "mailto:perekrestok.76@yandex.ru",
    },
  },
  heroImage: publicPath("/images/perekrestok-hero.jpg"),
} as const;
