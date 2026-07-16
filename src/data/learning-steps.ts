import {
  BadgeCheck,
  BookOpen,
  CarFront,
  ClipboardCheck,
  FileCheck2,
  MessageCircle,
  Send,
  type LucideIcon,
} from "lucide-react";

export type LearningStep = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const learningSteps: LearningStep[] = [
  {
    id: "application",
    title: "Оставляете заявку",
    description: "Выбираете удобный способ связи и оставляете контакты.",
    icon: Send,
  },
  {
    id: "consultation",
    title: "Консультация",
    description: "Отвечаем на вопросы и подбираем программу обучения.",
    icon: MessageCircle,
  },
  {
    id: "contract",
    title: "Заключение договора",
    description: "Фиксируем условия, график и порядок оплаты.",
    icon: FileCheck2,
  },
  {
    id: "theory",
    title: "Изучение теории",
    description: "Разбираете правила и дорожные ситуации без перегруза.",
    icon: BookOpen,
  },
  {
    id: "practice",
    title: "Практические занятия",
    description: "Осваиваете автомобиль вместе с инструктором.",
    icon: CarFront,
  },
  {
    id: "exam",
    title: "Экзамен",
    description: "Закрепляете знания и проходите экзаменационные этапы.",
    icon: ClipboardCheck,
  },
  {
    id: "license",
    title: "Получение водительского удостоверения",
    description: "Завершаете обучение и получаете водительские права.",
    icon: BadgeCheck,
  },
];
