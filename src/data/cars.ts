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
    image: publicPath("/images/fleet/volkswagen-polo.jpg"),
    imagePosition: "50% 50%",
    description: "Серебристый учебный седан для практических занятий.",
    instructors: ["Погодин Сергей Владимирович"],
  },
  {
    id: "renault-logan-ii",
    model: "Renault Logan II",
    image: publicPath("/images/fleet/renault-logan-ii.jpg"),
    imagePosition: "50% 50%",
    description: "Графитовый учебный седан с хорошим обзором и понятным управлением.",
    instructors: ["Шестов Владимир Владимирович"],
  },
  {
    id: "lada-granta-silver",
    model: "Lada Granta — серебристая",
    image: publicPath("/images/fleet/lada-granta-silver.jpg"),
    imagePosition: "50% 50%",
    description: "Учебный автомобиль категории B для спокойной отработки навыков.",
    instructors: [
      "Лобанов Николай Николаевич",
      "Кривенко Валентин Николаевич",
    ],
  },
  {
    id: "lada-granta-dark",
    model: "Lada Granta — графитовая",
    image: publicPath("/images/fleet/lada-granta-dark.jpg"),
    imagePosition: "50% 50%",
    description: "Ещё один автомобиль этой модели из учебного автопарка.",
    instructors: ["Мальцев Николай Анатольевич", "Жук Эдуард Алексеевич"],
  },
];
