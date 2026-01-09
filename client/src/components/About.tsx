import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Video, Baby, HeartHandshake, Brain, Rocket, Hammer, Bot, Accessibility } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-transparent py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[0.9]">
                {t("about.title")}
              </h2>
              <div className="text-6xl font-serif">*</div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-xl text-justify">
              <p>{t("about.desc")}</p>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-sm uppercase tracking-widest transition-all duration-300"
              >
                Explore More
              </Button>
            </div>
          </div>

          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl md:rounded-none group cursor-pointer">
            <motion.div
              style={{ y: imageY }}
              whileTap={{ scale: 0.98 }}
              className="h-[120%] -top-[10%] relative transition-transform duration-500"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Learning Environment"
                loading="lazy"
                initial={isMobile ? { filter: "grayscale(100%)" } : {}}
                whileInView={isMobile ? { filter: "grayscale(0%)" } : {}}
                viewport={{ amount: 0.5 }}
                className="h-full w-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
