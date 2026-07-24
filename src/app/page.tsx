import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Features from "@/components/landing/Features";
import Differentiation from "@/components/landing/Differentiation";
import Roadmap from "@/components/landing/Roadmap";
import Mission from "@/components/landing/Mission";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Problem />
        <Features />
        <Differentiation />
        <Roadmap />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
