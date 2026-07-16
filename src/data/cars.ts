import { publicPath } from "@/lib/public-path";

export type TrainingCar = {
  id: string;
  model: string;
  image: string;
  imagePosition: string;
  description: string;
  instructors: string[];
};

export const trainingCars: TrainingCar[] = [
  {
    id: "volkswagen-polo",
    model: "Volkswagen Polo",
    image: publicPath("/images/instructors/sergey-pogodin.jpg"),
    imagePosition: "58% 50%",
    description: "Учебный автомобиль для практических занятий в автошколе.",
    instructors: ["Сергей Погодин"],
  },
  {
    id: "renault-logan-ii",
    model: "Renault Logan II",
    image: publicPath("/images/instructors/vladimir-shestov.jpg"),
    imagePosition: "42% 54%",
    description: "Учебный автомобиль для практических занятий в автошколе.",
    instructors: ["Шестов Владимир"],
  },
  {
    id: "lada-granta",
    model: "Lada Granta",
    image: publicPath("/images/instructors/nikolay-maltsev.jpg"),
    imagePosition: "38% 55%",
    description: "Модель используется несколькими инструкторами автошколы.",
    instructors: [
      "Николай Мальцев",
      "Николай Лобанов",
      "Эдуард Жук",
      "Валентин Кривенко",
    ],
  },
  {
    id: "lada-largus",
    model: "Lada Largus",
    image: publicPath("/images/instructors/igor-prokhorov.jpg"),
    imagePosition: "62% 52%",
    description: "Учебный автомобиль для практических занятий в автошколе.",
    instructors: ["Игорь Прохоров"],
  },
];
