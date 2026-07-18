export type QuizQuestionId = "goal" | "schedule" | "experience";

export type GoalAnswerId = "manual" | "automatic" | "undecided";

export type ScheduleAnswerId =
  | "morning"
  | "day"
  | "evening"
  | "weekends"
  | "unknown";

export type ExperienceAnswerId = "never" | "little" | "restore" | "exam";

export type QuizAnswerId =
  | GoalAnswerId
  | ScheduleAnswerId
  | ExperienceAnswerId;

export type QuizAnswers = {
  goal?: GoalAnswerId;
  schedule?: ScheduleAnswerId;
  experience?: ExperienceAnswerId;
};

export type CompletedQuizAnswers = {
  goal: GoalAnswerId;
  schedule: ScheduleAnswerId;
  experience: ExperienceAnswerId;
};

export type QuizOptionData = {
  id: QuizAnswerId;
  label: string;
};

export type QuizQuestion = {
  id: QuizQuestionId;
  title: string;
  options: QuizOptionData[];
};

export type QuizLeadPayload = {
  name: string;
  phone: string;
  consent: true;
  recommendedProgram: string;
  answers: CompletedQuizAnswers;
  website: string;
  formStartedAt: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    title: "На чём хотите обучаться?",
    options: [
      { id: "manual", label: "Автомобиль на механике" },
      { id: "automatic", label: "Автомобиль на автомате" },
      { id: "undecided", label: "Пока не решил" },
    ],
  },
  {
    id: "schedule",
    title: "Когда вам удобно заниматься?",
    options: [
      { id: "morning", label: "Утром" },
      { id: "day", label: "Днём" },
      { id: "evening", label: "Вечером" },
      { id: "weekends", label: "В выходные" },
      { id: "unknown", label: "График пока неизвестен" },
    ],
  },
  {
    id: "experience",
    title: "Какой у вас опыт?",
    options: [
      { id: "never", label: "Никогда не водил" },
      { id: "little", label: "Есть небольшой опыт" },
      { id: "restore", label: "Нужно восстановить навыки" },
      { id: "exam", label: "Готовлюсь к экзамену" },
    ],
  },
];
