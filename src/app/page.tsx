import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FounderCard from "@/components/FounderCard";
import Segments from "@/components/Segments";
import Process from "@/components/Process";
import PartnersMarquee from "@/components/PartnersMarquee";
import ResultsMarquee from "@/components/ResultsMarquee";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FounderCard />
      <Segments />
      <ResultsMarquee />
      <Process />
      <Testimonials />
      <FinalCTA />
      <PartnersMarquee />
    </div>
  );
}
