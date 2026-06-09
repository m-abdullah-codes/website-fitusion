import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Discover } from "@/components/sections/Discover";
import { Courses } from "@/components/sections/Courses";
import { Experience } from "@/components/sections/Experience";
import { Trainers } from "@/components/sections/Trainers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Discover />
      <Courses />
      <Experience />
      <Trainers />
      <Testimonials />
      <Cta />
      <Footer />
    </>
  );
}
