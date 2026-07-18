export type LeadType = "enrollment" | "contact" | "quiz";

export type LeadAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

export type QuizLeadAnswers = {
  goal: "manual" | "automatic" | "undecided";
  schedule: "morning" | "day" | "evening" | "weekends" | "unknown";
  experience: "never" | "little" | "restore" | "exam";
};

export type LeadInput = {
  type: LeadType;
  name: string;
  phone: string;
  source: string;
  consent: true;
  interest?: string;
  comment?: string;
  quizAnswers?: QuizLeadAnswers;
  pageUrl?: string;
  attribution?: LeadAttribution;
  website: string;
  formStartedAt: number;
};

export type ValidatedLead = Omit<LeadInput, "website" | "formStartedAt">;

export type LeadApiResponse =
  | { ok: true }
  | {
      ok: false;
      error: "invalid" | "delivery" | "configuration";
      message: string;
      field?: string;
    };
