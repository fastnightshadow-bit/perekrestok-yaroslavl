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
  openConsultation: (source?: string) => void;
  openEnrollment: (program: string, source?: string) => void;
};

export type EnrollmentProviderProps = {
  children: React.ReactNode;
};

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

export function EnrollmentProvider({
  children,
}: EnrollmentProviderProps) {
  const [selectedProgram, setSelectedProgram] = useState(consultationProgram);
  const [selectedSource, setSelectedSource] = useState("website");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEnrollment = useCallback((program: string, source = "website") => {
    setSelectedProgram(program);
    setSelectedSource(source);
    setIsModalOpen(true);
  }, []);

  const openConsultation = useCallback((source = "website") => {
    openEnrollment(consultationProgram, source);
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
        source={selectedSource}
      />
      <MobileActionBar onEnroll={() => openConsultation("mobile-action-bar")} />
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
