"use client";

import type { MouseEvent } from "react";

import { useEnrollment } from "@/components/enrollment-provider";
import { Button, type ButtonProps } from "@/components/ui/button";

export type EnrollmentTriggerProps = Omit<
  ButtonProps,
  "asChild" | "onClick"
> & {
  children: React.ReactNode;
  program?: string;
  source?: string;
};

export function EnrollmentTrigger({
  children,
  program,
  source = "website",
  ...buttonProps
}: EnrollmentTriggerProps) {
  const { openConsultation, openEnrollment } = useEnrollment();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (program) {
      openEnrollment(program, source);
    } else {
      openConsultation(source);
    }
  };

  return (
    <Button asChild {...buttonProps}>
      <a href="#enroll" onClick={handleClick}>
        {children}
      </a>
    </Button>
  );
}
