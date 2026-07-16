import {
  render,
  type RenderOptions,
} from "@testing-library/react";
import type { ReactElement } from "react";

import { EnrollmentProvider } from "@/components/enrollment-provider";

export function renderWithEnrollment(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(
    <EnrollmentProvider>{ui}</EnrollmentProvider>,
    options,
  );
}
