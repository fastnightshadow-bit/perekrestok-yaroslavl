import { schoolFacts } from "@/data/school-facts";

export type ProgramVisualKind =
  | "category-b"
  | "theory"
  | "driving"
  | "practice";

export type Program = {
  slug: string;
  name: string;
  description: string;
  volume: string;
  format: string;
  visual: ProgramVisualKind;
};

export const programs: Program[] = [
  {
    slug: "category-b",
    name: "Полный курс категории B",
    description:
      "Теоретическая подготовка и полный курс практического вождения.",
    volume: `Теория + ${schoolFacts.practiceHours} часов вождения`,
    format: "Теория и практические занятия",
    visual: "category-b",
  },
  {
    slug: "theory",
    name: "Теоретическая подготовка",
    description:
      "Отдельное изучение правил дорожного движения и дорожных ситуаций.",
    volume: "Полный теоретический курс",
    format: "Теоретическая подготовка",
    visual: "theory",
  },
  {
    slug: "driving-practice",
    name: "Практическое вождение",
    description:
      "Полный курс занятий с инструктором для освоения городских маршрутов.",
    volume: `${schoolFacts.practiceHours} часов`,
    format: "Практические занятия с инструктором",
    visual: "driving",
  },
  {
    slug: "additional-lesson",
    name: "Дополнительное практическое занятие",
    description:
      "Для восстановления навыков, подготовки к экзамену или сложному маршруту.",
    volume: schoolFacts.singleLessonDuration,
    format: "Индивидуально с инструктором",
    visual: "practice",
  },
];

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
