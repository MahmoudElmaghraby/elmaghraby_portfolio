import { About } from "@/components/About";
import { Architecture } from "@/components/Architecture";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Mentorship } from "@/components/Mentorship";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Mentorship />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
