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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main>
      <div className="bg-background"><Hero /></div>
      <div className="bg-muted/30 dark:bg-card/30"><About /></div>
      <div className="bg-background"><NewArrivals /></div>
      <div className="bg-muted/30 dark:bg-card/30"><Courses /></div>
      <div className="bg-background"><LearningHours /></div>
      <MissionStatement />
      <div className="bg-muted/30 dark:bg-card/30"><SpecialNeeds /></div>
      <div className="bg-background"><TinyExplorers /></div>
      <div className="bg-muted/30 dark:bg-card/30"><MentalHealth /></div>
      <div className="bg-background"><AIMVerse /></div>
      <div className="bg-muted/30 dark:bg-card/30"><CreativeGallery /></div>
      <div className="bg-background"><Contact /></div>
      <div className="bg-muted/30 dark:bg-card/30"><Testimonials /></div>
      <div className="bg-background"><FAQ /></div>
      <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
