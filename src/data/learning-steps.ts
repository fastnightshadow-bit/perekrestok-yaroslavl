import {
  BadgeCheck,
  BookOpen,
  CarFront,
  ClipboardCheck,
  Send,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type LearningStep = {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon: LucideIcon;
};

export const learningSteps: LearningStep[] = [
  {
    id: "application",
    title: "Подайте заявку на обучение",
    description:
      "Оставьте телефон или позвоните — администратор ответит на вопросы и расскажет о ближайшем наборе.",
    icon: Send,
  },
  {
    id: "medical",
    title: "Пройдите медкомиссию",
    description:
      "Для допуска к вождению потребуется медицинское заключение от четырёх специалистов.",
    details: ["Психиатр", "Психиатр-нарколог", "Офтальмолог", "Терапевт"],
    icon: Stethoscope,
  },
  {
    id: "theory",
    title: "Изучайте теорию очно или онлайн",
    description:
      "Разбирайте правила и дорожные ситуации в удобном формате, закрепляя темы проверочными заданиями.",
    icon: BookOpen,
  },
  {
    id: "practice",
    title: "Учитесь водить с инструктором",
    description:
      "Осваивайте автомобиль, городские маршруты и экзаменационные упражнения в спокойном темпе.",
    icon: CarFront,
  },
  {
    id: "internal-exam",
    title: "Пройдите внутренний экзамен",
    description:
      "Проверьте теорию и практические навыки в условиях, близких к будущему экзамену.",
    icon: ClipboardCheck,
  },
  {
    id: "gai-exam",
    title: "Сдайте экзамен в ГАИ",
    description:
      "Автошкола подготовит необходимые документы и подскажет порядок прохождения экзамена.",
    icon: ClipboardCheck,
  },
  {
    id: "license",
    title: "Получите водительское удостоверение",
    description:
      "После успешного экзамена останется получить права и начать самостоятельное вождение.",
    icon: BadgeCheck,
  },
];
