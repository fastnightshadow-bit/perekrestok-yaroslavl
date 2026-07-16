"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { EnrollmentModal } from "@/components/enrollment-modal";
import { MobileActionBar } from "@/components/mobile-action-bar";

const consultationProgram = "Консультация по обучению";

export type EnrollmentContextValue = {
  closeEnrollment: () => void;
  openConsultation: () => void;
  openEnrollment: (program: string) => void;
};

export type EnrollmentProviderProps = {
  children: React.ReactNode;
};

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

export function EnrollmentProvider({
  children,
}: EnrollmentProviderProps) {
  const [selectedProgram, setSelectedProgram] = useState(consultationProgram);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEnrollment = useCallback((program: string) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  }, []);

  const openConsultation = useCallback(() => {
    openEnrollment(consultationProgram);
  }, [openEnrollment]);

  const closeEnrollment = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      closeEnrollment,
      openConsultation,
      openEnrollment,
    }),
    [closeEnrollment, openConsultation, openEnrollment],
  );

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={closeEnrollment}
        selectedProgram={selectedProgram}
      />
      <MobileActionBar onEnroll={openConsultation} />
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);

  if (!context) {
    throw new Error(
      "useEnrollment must be used within EnrollmentProvider",
    );
  }

  return context;
}
