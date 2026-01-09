import { motion, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  // Mouse parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  // Mouse parallax transforms
  const xMove = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const yMove = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);
  const xMoveReverse = useTransform(mouseX, [-0.5, 0.5], ["2%", "-2%"]);
  const rotateMove = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white dark:bg-background"
      onMouseMove={handleMouseMove}
    >
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-2 p-2 h-auto md:h-[800px] bg-white dark:bg-background">

        {/* Panel 1: Texture Background + Tagline - STATIC */}
        <div
          className="relative h-[99%] flex flex-col items-center justify-center overflow-hidden border border-border/20 shadow-sm"
        >
          <div className="absolute inset-0">
            <img
              src="/images/hero/panel-1-texture.webp"
              alt="Paper Texture"
              className="h-full w-full object-cover dark:hidden"
              fetchPriority="high"
              loading="eager"
            />
            <img
              src="/images/hero/panel-1-texture-dark.webp"
              alt="Dark Paper Texture"
              className="h-full w-full object-cover hidden dark:block"
              fetchPriority="high"
              loading="eager"
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground tracking-normal cursor-default relative z-20 flex flex-col gap-2 -mt-32">
              <span
                className="inline-block text-primary"
              >
                {t("hero.subtitle").split(',')[0]},
              </span>
              <span
                className="block text-muted-foreground italic"
              >
                {t("hero.subtitle").split(',')[1] ? t("hero.subtitle").split(',')[1].trim().split(' ')[0] : ''}
              </span>
              <span
                className="inline-block font-bold text-foreground"
              >
                {t("hero.subtitle").split(',')[1] ? t("hero.subtitle").split(',')[1].trim().split(' ').slice(1).join(' ') : ''}
              </span>
            </h2>
          </div>
        </div>

        {/* Panel 2: Video Background - Mouse Parallax Only */}
        <motion.div
          style={{ x: xMoveReverse }}
          className="relative h-[99%] overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/images/hero/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Panel 3: White Background + Title + CTA - STATIC */}
        <div
          className="relative h-[99%] flex flex-col items-center justify-center bg-card text-center px-4 border border-border py-12 md:py-0 shadow-sm"
        >
          <div
            className="flex flex-col items-center gap-12 -mt-12"
          >
            {/* Option B: Minimalist Luxury (Refined) */}
            <h1 className="font-sans text-center text-foreground cursor-default flex flex-col items-center gap-2">
              <span
                className="text-xs md:text-sm uppercase font-medium tracking-[0.8em] block text-muted-foreground ml-2"
              >
                {t("hero.est")}
              </span>
              <div className="flex flex-col items-center relative py-2">
                <span
                  className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase block"
                >
                  {t("hero.title1")}
                </span>
                <span
                  className="w-16 h-[1px] bg-primary my-4"
                ></span>
                <span
                  className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase block text-muted-foreground"
                >
                  {t("hero.title2")}
                </span>
              </div>
              <span
                className="text-[5rem] md:text-[7rem] font-thin tracking-tighter leading-none block text-primary font-serif -mt-4"
              >
                {t("hero.title3")}
              </span>
            </h1>

            <Link href="/auth">
              <Button
                variant="outline"
                className="rounded-none border-foreground bg-transparent px-10 py-7 text-lg uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {t("hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Scroll Indicator - Positioned below CTA */}
            <div className="mt-12 flex flex-col items-center gap-2">
              <motion.span
                animate={{
                  opacity: [0.6, 1, 0.6],
                  y: [0, 2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-xs uppercase font-medium tracking-[0.3em] text-muted-foreground selection:bg-transparent"
              >
                {t("hero.scroll")}
              </motion.span>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-10 w-[1px] bg-muted-foreground/40"
              />
            </div>
          </div>
        </div>

        <motion.div
          style={{ x: xMoveReverse }}
          className="relative h-[99%] overflow-hidden border border-border/10 shadow-sm"
        >
          <img
            src="/images/hero/panel-4-books.webp"
            alt="Stacked Books"
            className="h-full w-full object-cover"
          />


        </motion.div>

      </div>

    </div>
  );
}
