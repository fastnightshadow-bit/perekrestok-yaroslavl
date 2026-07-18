import {
  CarFront,
  MapPin,
  Timer,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type TrainingOption = {
  id: "category-b" | "skills" | "transfer";
  name: string;
  description: string;
  price: string;
  priceCaption: string;
  included: string[];
  includedLabel: string;
  installment: string;
  featured?: boolean;
};

export const benefits: Benefit[] = [
  {
    id: "city-center",
    title: "Обучение в центре Ярославля",
    description:
      "Учебный класс расположен в центре — удобно добираться после учёбы или работы.",
    icon: MapPin,
  },
  {
    id: "short-terms",
    title: "Короткие сроки обучения",
    description:
      "Программа выстроена последовательно, без ненужного затягивания занятий.",
    icon: Timer,
  },
  {
    id: "instructors",
    title: "Опытные инструкторы",
    description:
      "Заинтересованные наставники помогают разобраться в вождении спокойно и понятно.",
    icon: UsersRound,
  },
  {
    id: "familiar-car",
    title: "Экзамен на знакомом автомобиле",
    description:
      "Сдаёте экзамен на автомобиле, на котором проходили практические занятия.",
    icon: CarFront,
  },
];

export const trainingOptions: TrainingOption[] = [
  {
    id: "category-b",
    name: "Категория B — МКПП / АКПП",
    description:
      "Основное обучение на автомобиле с механической или автоматической коробкой передач.",
    price: "47 600 ₽",
    priceCaption: "теория + 28 занятий",
    included: [
      "Теория — 14 000 ₽",
      "28 занятий по 90 минут — 1 200 ₽ каждое",
      "Первый взнос от 1 000 ₽",
    ],
    includedLabel: "Стоимость обучения",
    installment: "Теорию можно оплачивать частями.",
    featured: true,
  },
  {
    id: "skills",
    name: "Восстановление навыков",
    description:
      "Дополнительные занятия для возвращения уверенности за рулём и разбора сложных маршрутов.",
    price: "1 300 ₽",
    priceCaption: "дополнительное занятие",
    included: [
      "Индивидуально с инструктором",
      "Количество занятий подбирается по вашему уровню",
      "Подготовка к повторному экзамену — 1 500 ₽",
    ],
    includedLabel: "Формат занятий",
    installment: "Перед записью администратор поможет выбрать инструктора и автомобиль.",
  },
  {
    id: "transfer",
    name: "Переход из другой автошколы",
    description:
      "Для тех, кто уже начал обучение и хочет продолжить его в «Перекрёстке».",
    price: "6 000 ₽",
    priceCaption: "переход",
    included: [
      "Порядок перехода зависит от уже пройденной программы",
      "Список необходимых документов уточнит администратор",
    ],
    includedLabel: "Перед переходом",
    installment: "Оставьте заявку — проверим вашу ситуацию и расскажем дальнейшие шаги.",
  },
];
