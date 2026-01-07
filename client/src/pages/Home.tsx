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
      <div className="bg-white"><Hero /></div>
      <div className="bg-[#FAFAFA]"><About /></div>
      <div className="bg-white"><NewArrivals /></div>
      <div className="bg-[#FAFAFA]"><Courses /></div>
      <div className="bg-white"><LearningHours /></div>
      <MissionStatement />
      <div className="bg-[#FAFAFA]"><SpecialNeeds /></div>
      <div className="bg-white"><TinyExplorers /></div>
      <div className="bg-[#FAFAFA]"><MentalHealth /></div>
      <div className="bg-white"><AIMVerse /></div>
      <div className="bg-[#FAFAFA]"><CreativeGallery /></div>
      <div className="bg-white"><Contact /></div>
      <div className="bg-[#FAFAFA]"><Testimonials /></div>
      <div className="bg-white"><FAQ /></div>
      <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
