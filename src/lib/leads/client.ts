import type {
  LeadApiResponse,
  LeadAttribution,
  LeadInput,
} from "./types";

const defaultError =
  "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.";

export class LeadSubmissionError extends Error {
  constructor(
    message = defaultError,
    public readonly field?: string,
  ) {
    super(message);
    this.name = "LeadSubmissionError";
  }
}

export function collectLeadAttribution(searchParams: URLSearchParams) {
  const mapping = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_content: "utmContent",
    utm_term: "utmTerm",
  } as const;
  const result: LeadAttribution = {};
  for (const [queryKey, resultKey] of Object.entries(mapping)) {
    const value = searchParams.get(queryKey)?.trim().slice(0, 120);
    if (value) result[resultKey] = value;
  }
  return result;
}

export async function submitLead(
  input: LeadInput,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  try {
    const response = await fetchImpl("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = (await response.json().catch(() => null)) as
      | LeadApiResponse
      | null;
    if (!response.ok || !result?.ok) {
      const failure = result && !result.ok ? result : null;
      throw new LeadSubmissionError(
        failure?.message || defaultError,
        failure?.field,
      );
    }
  } catch (error) {
    if (error instanceof LeadSubmissionError) throw error;
    throw new LeadSubmissionError();
  }
}
