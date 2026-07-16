import { publicPath } from "@/lib/public-path";

export type Instructor = {
  id: string;
  name: string;
  image: string;
  imagePosition?: string;
  vehicle: string;
  description: string;
};

const description =
  "Инструктор практического вождения автошколы «Перекрёсток».";

export const instructors: Instructor[] = [
  {
    id: "sergey-pogodin",
    name: "Сергей Погодин",
    image: publicPath("/images/instructors/sergey-pogodin.jpg"),
    imagePosition: "50% 45%",
    vehicle: "Volkswagen Polo",
    description,
  },
  {
    id: "vladimir-shestov",
    name: "Шестов Владимир",
    image: publicPath("/images/instructors/vladimir-shestov.jpg"),
    imagePosition: "50% 48%",
    vehicle: "Renault Logan II",
    description,
  },
  {
    id: "nikolay-maltsev",
    name: "Николай Мальцев",
    image: publicPath("/images/instructors/nikolay-maltsev.jpg"),
    imagePosition: "50% 48%",
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "nikolay-lobanov",
    name: "Николай Лобанов",
    image: publicPath("/images/instructors/nikolay-lobanov.jpg"),
    imagePosition: "50% 48%",
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "eduard-zhuk",
    name: "Эдуард Жук",
    image: publicPath("/images/instructors/eduard-zhuk.jpg"),
    imagePosition: "50% 48%",
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "valentin-krivenko",
    name: "Валентин Кривенко",
    image: publicPath("/images/instructors/valentin-krivenko.jpg"),
    imagePosition: "50% 50%",
    vehicle: "Lada Granta",
    description,
  },
  {
    id: "igor-prokhorov",
    name: "Игорь Прохоров",
    image: publicPath("/images/instructors/igor-prokhorov.jpg"),
    imagePosition: "50% 45%",
    vehicle: "Lada Largus",
    description,
  },
];
