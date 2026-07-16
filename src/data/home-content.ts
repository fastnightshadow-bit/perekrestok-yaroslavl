import {
  CarFront,
  MapPin,
  Timer,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { schoolFacts } from "@/data/school-facts";

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Tariff = {
  id: string;
  name: string;
  description: string;
  price: string;
  included: string[];
  installment: string;
  isPopular?: boolean;
};

export const benefits: Benefit[] = [
  {
    id: "city-center",
    title: "Обучение в центре Ярославля",
    description: "Учебный класс расположен в центре — удобно добираться после учёбы или работы.",
    icon: MapPin,
  },
  {
    id: "short-terms",
    title: "Короткие сроки обучения",
    description: "Программа выстроена последовательно, без ненужного затягивания занятий.",
    icon: Timer,
  },
  {
    id: "instructors",
    title: "Опытные инструкторы",
    description: "Заинтересованные наставники помогают разобраться в вождении спокойно и понятно.",
    icon: UsersRound,
  },
  {
    id: "familiar-car",
    title: "Экзамен на знакомом автомобиле",
    description: "Сдаёте экзамен на автомобиле, на котором проходили практические занятия.",
    icon: CarFront,
  },
];

export const tariffs: Tariff[] = [
  {
    id: "full-course",
    name: "Полный курс категории B",
    description: "Теоретическая подготовка и полный курс практического вождения.",
    price: schoolFacts.fullCoursePrice,
    included: [
      "Теоретическая подготовка",
      `Практическое вождение — ${schoolFacts.practiceHours} часов`,
      "Подготовка к получению водительского удостоверения",
    ],
    installment: "Возможна оплата частями — условия уточнит администратор.",
    isPopular: true,
  },
  {
    id: "theory",
    name: "Теоретическая подготовка",
    description: "Отдельный курс теории для изучения правил дорожного движения.",
    price: schoolFacts.theoryPrice,
    included: [
      "Изучение правил дорожного движения",
      "Разбор дорожных ситуаций",
      "Подготовка по теоретической части",
    ],
    installment: "Точный порядок оплаты подтвердит администратор автошколы.",
  },
  {
    id: "practice",
    name: "Практическое вождение",
    description: `Полный курс практических занятий объёмом ${schoolFacts.practiceHours} часов.`,
    price: schoolFacts.practiceCoursePrice,
    included: [
      `${schoolFacts.practiceHours} часов вождения`,
      "Занятия с инструктором",
      "Подготовка к городским маршрутам",
    ],
    installment: "Возможна оплата частями — условия уточнит администратор.",
  },
];
