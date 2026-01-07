import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import CreativeGallery from "@/components/CreativeGallery";
import Footer from "@/components/Footer";
import Courses from "@/components/Courses";
import AIMVerse from "@/components/AIMVerse";
import MentalHealth from "@/components/MentalHealth";
import SpecialNeeds from "@/components/SpecialNeeds";
import TinyExplorers from "@/components/TinyExplorers";
import Hero from "@/components/Hero";
import About from "@/components/About";
import NewArrivals from "@/components/NewArrivals";
import LearningHours from "@/components/LearningHours";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main>
      <Hero />
      <About />
      <NewArrivals />
      <Courses />
      <LearningHours />
      <SpecialNeeds />
      <TinyExplorers />
      <MentalHealth />
      <AIMVerse />
      <CreativeGallery />
      <Contact />
      </main>
      <Footer />
    </div>
  );
}
