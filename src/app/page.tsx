import { BenefitsSection } from "@/components/benefits-section";
import { ContactSection } from "@/components/contact-section";
import { EnrollmentProvider } from "@/components/enrollment-provider";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { FleetSection } from "@/components/fleet-section";
import { Hero } from "@/components/hero";
import { InstructorsSection } from "@/components/instructors-section";
import { LearningTimeline } from "@/components/learning-timeline";
import { ProgramQuiz } from "@/components/program-quiz";
import { PricingSection } from "@/components/pricing-section";
import { ReviewsSection } from "@/components/reviews-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDrivingSchoolJsonLd } from "@/lib/structured-data";

export default function Home() {
  const jsonLd = getDrivingSchoolJsonLd();

  return (
    <>
      <a
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white shadow-xl outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-yellow-400"
        href="#main-content"
      >
        Перейти к содержанию
      </a>
      <EnrollmentProvider>
        <SiteHeader />
        <main className="outline-none" id="main-content" tabIndex={-1}>
          <Hero />
          <BenefitsSection />
          <PricingSection />
          <ProgramQuiz />
          <LearningTimeline />
          <InstructorsSection />
          <FleetSection />
          <ReviewsSection />
          <FaqSection />
          <ContactSection />
          <FinalCta />
        </main>
        <SiteFooter />
      </EnrollmentProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}
