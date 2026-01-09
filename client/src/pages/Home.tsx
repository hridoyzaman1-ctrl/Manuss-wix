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
import PreFooter from "@/components/PreFooter";
import MissionStatement from "@/components/MissionStatement";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import AimAdvantage from "@/components/AimAdvantage";
import InteractiveSection from "@/components/InteractiveSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main className="w-full">
        <div className="bg-background"><Hero /></div>

        <div id="about" className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><About /></InteractiveSection>
        </div>

        <div className="bg-background">
          <InteractiveSection><AimAdvantage /></InteractiveSection>
        </div>

        <div className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><NewArrivals /></InteractiveSection>
        </div>

        <div id="courses" className="bg-background">
          <InteractiveSection><Courses /></InteractiveSection>
        </div>

        <div className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><LearningHours /></InteractiveSection>
        </div>

        <div className="bg-background">
          <InteractiveSection><MissionStatement /></InteractiveSection>
        </div>

        <div id="special-needs" className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><SpecialNeeds /></InteractiveSection>
        </div>

        <div id="tiny-explorers" className="bg-background">
          <InteractiveSection><TinyExplorers /></InteractiveSection>
        </div>

        <div id="mental-health" className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><MentalHealth /></InteractiveSection>
        </div>

        <div id="aimverse" className="bg-background">
          <InteractiveSection><AIMVerse /></InteractiveSection>
        </div>

        <div id="gallery" className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><CreativeGallery /></InteractiveSection>
        </div>

        <div className="bg-background">
          <InteractiveSection><Contact /></InteractiveSection>
        </div>

        <div className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><Testimonials /></InteractiveSection>
        </div>

        <div className="bg-background">
          <InteractiveSection><FAQ /></InteractiveSection>
        </div>

        <div className="bg-[#EFEDE8] dark:bg-card/30">
          <InteractiveSection><PreFooter /></InteractiveSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
