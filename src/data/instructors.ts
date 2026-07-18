import { publicPath } from "@/lib/public-path";

export type Instructor = {
  id: string;
  name: string;
  image: string;
  imagePosition?: string;
  sinceYear: number;
  vehicle?: string;
  description: string;
};

const description =
  "Инструктор практического вождения автошколы «Перекрёсток».";

const studioPortrait = (fileName: string) =>
  publicPath(`/images/instructors/${fileName}-studio-20260718.jpg`);

export const instructors: Instructor[] = [
  {
    id: "sergey-pogodin",
    name: "Погодин Сергей Владимирович",
    image: studioPortrait("sergey-pogodin"),
    imagePosition: "50% 42%",
    sinceYear: 1999,
    vehicle: "Volkswagen Polo",
    description,
  },
  {
    id: "vladimir-shestov",
    name: "Шестов Владимир Владимирович",
    image: studioPortrait("vladimir-shestov"),
    imagePosition: "50% 42%",
    sinceYear: 2007,
    vehicle: "Renault Logan II",
    description,
  },
  {
    id: "nikolay-maltsev",
    name: "Мальцев Николай Анатольевич",
    image: studioPortrait("nikolay-maltsev"),
    imagePosition: "50% 42%",
    sinceYear: 2014,
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "nikolay-lobanov",
    name: "Лобанов Николай Николаевич",
    image: studioPortrait("nikolay-lobanov"),
    imagePosition: "50% 42%",
    sinceYear: 2014,
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "eduard-zhuk",
    name: "Жук Эдуард Алексеевич",
    image: studioPortrait("eduard-zhuk"),
    imagePosition: "50% 42%",
    sinceYear: 2007,
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "valentin-krivenko",
    name: "Кривенко Валентин Николаевич",
    image: studioPortrait("valentin-krivenko"),
    imagePosition: "50% 42%",
    sinceYear: 2014,
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "igor-prokhorov",
    name: "Прохоров Игорь Юрьевич",
    image: studioPortrait("igor-prokhorov"),
    imagePosition: "50% 42%",
    sinceYear: 2002,
    vehicle: "Lada Largus",
    description,
  },
  {
    id: "alexey-zaytsev",
    name: "Зайцев Алексей Валерьевич",
    image: studioPortrait("alexey-zaytsev"),
    imagePosition: "50% 50%",
    sinceYear: 2009,
    description,
  },
];
