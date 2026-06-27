import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Features } from "@/components/sections/Features";
import { Discover } from "@/components/sections/Discover";
import { Courses } from "@/components/sections/Courses";
import { EquipmentTeaser } from "@/components/sections/EquipmentTeaser";
import { PlanPreview } from "@/components/sections/PlanPreview";
import { Experience } from "@/components/sections/Experience";
import { Trainers } from "@/components/sections/Trainers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Membership } from "@/components/sections/Membership";
import { InstallApp } from "@/components/sections/InstallApp";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Features />
      <Discover />
      <Courses />
      <EquipmentTeaser />
      <PlanPreview />
      <Experience />
      <Trainers />
      <Testimonials />
      <Membership />
      <InstallApp />
      <Cta />
      <Footer />
    </>
  );
}
