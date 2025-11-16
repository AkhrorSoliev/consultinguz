import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FounderCard from "@/components/FounderCard";
import Segments from "@/components/Segments";
import ProcessSection from "@/components/ProcessSection";
import ResultsMarquee from "@/components/ResultsMarquee";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <div>
      {/* Hero back to standalone rendering (no Section wrapper) */}
      <Hero />

      <Section variant="subtle">
        <Stats />
      </Section>

      <Section>
        <FounderCard />
      </Section>

      <Section variant="muted">
        <Segments />
      </Section>

      {/* Results full-bleed outside contained section */}
      <ResultsMarquee />

      <Section>
        <ProcessSection />
      </Section>

      <Section variant="subtle">
        <Testimonials />
      </Section>

      <Section variant="brand">
        <FinalCTA />
      </Section>

      {/* Partners section temporarily hidden */}
      {/*
      <Section>
        <PartnersMarquee />
      </Section>
      */}
    </div>
  );
}
