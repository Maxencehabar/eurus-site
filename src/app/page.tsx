import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import TechStackLogos from "@/components/TechStackLogos";
import About from "@/components/About";
import Team from "@/components/Team";
import ProcessSteps from "@/components/ProcessSteps";
import Pricing from "@/components/Pricing";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <TechStackLogos />
      <About />
      <Team />
      <ProcessSteps />
      <Pricing />
      <ContactSection />
    </>
  );
}
