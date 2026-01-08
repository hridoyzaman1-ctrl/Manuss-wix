import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  // Parallax transforms for scroll
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Enhanced Mouse parallax transforms
  const xMove = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const yMove = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);
  const xMoveReverse = useTransform(mouseX, [-0.5, 0.5], ["2%", "-2%"]);
  const yMoveReverse = useTransform(mouseY, [-0.5, 0.5], ["2%", "-2%"]);
  const rotateMove = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white dark:bg-background"
      onMouseMove={handleMouseMove}
    >
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-[20px] h-auto md:h-[800px] bg-white dark:bg-background">

        {/* Panel 1: Texture Background + Tagline */}
        <motion.div
          style={{ y: y1, x: xMoveReverse }}
          className="relative h-[500px] md:h-[120%] md:-top-[10%] flex flex-col items-center justify-center overflow-hidden border-r border-border/20"
        >
          <div className="absolute inset-0">
            <motion.img
              style={{ scale: 1.1, x: xMove, y: yMove }}
              src="/images/hero/panel-1-texture.webp"
              alt="Paper Texture"
              className="h-full w-full object-cover dark:hidden"
              fetchPriority="high"
              loading="eager"
            />
            <motion.img
              style={{ scale: 1.1, x: xMove, y: yMove }}
              src="/images/hero/panel-1-texture-dark.webp"
              alt="Dark Paper Texture"
              className="h-full w-full object-cover hidden dark:block"
              fetchPriority="high"
              loading="eager"
            />
          </div>
          <motion.div
            style={{ x: xMove, y: yMove, rotate: rotateMove }}
            className="relative z-10 text-center px-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground tracking-normal cursor-default relative z-20 flex flex-col gap-2 -mt-16"
            >
              <motion.span
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block text-primary"
              >
                {t("hero.subtitle").split(',')[0]},
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="block text-muted-foreground italic"
              >
                {t("hero.subtitle").split(',')[1] ? t("hero.subtitle").split(',')[1].trim().split(' ')[0] : ''}
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05, x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block font-bold text-foreground"
              >
                {t("hero.subtitle").split(',')[1] ? t("hero.subtitle").split(',')[1].trim().split(' ').slice(1).join(' ') : ''}
              </motion.span>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Panel 2: Video Background (Hands on Book) */}
        <motion.div
          style={{ y: y2 }}
          className="relative h-[300px] md:h-[120%] md:-top-[10%] overflow-hidden"
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

        {/* Panel 3: White Background + Title + CTA */}
        <motion.div
          style={{ y: y3, x: xMoveReverse }}
          className="relative h-[600px] md:h-[120%] md:-top-[10%] flex flex-col items-center justify-center bg-card text-center px-4 border-r border-border py-12 md:py-0"
        >
          <motion.div
            style={{ x: xMove, y: yMove }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-12 -mt-12"
          >
            {/* Option B: Minimalist Luxury (Refined) */}
            <h1 className="font-sans text-center text-foreground cursor-default flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.8em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-xs md:text-sm uppercase font-medium tracking-[0.8em] block text-muted-foreground ml-2"
              >
                {t("hero.est")}
              </motion.span>
              <div className="flex flex-col items-center relative py-2">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase block"
                >
                  {t("hero.title1")}
                </motion.span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-16 h-[1px] bg-primary my-4"
                ></motion.span>
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase block text-muted-foreground"
                >
                  {t("hero.title2")}
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-[5rem] md:text-[7rem] font-thin tracking-tighter leading-none block text-primary font-serif -mt-4"
              >
                {t("hero.title3")}
              </motion.span>
            </h1>

            <Button
              variant="outline"
              className="rounded-none border-foreground bg-transparent px-10 py-7 text-lg uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {t("hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Panel 4: Stacked Books Image + Bookmark */}
        <motion.div
          style={{ y: y4 }}
          className="relative h-[300px] md:h-[120%] md:-top-[10%] overflow-hidden"
        >
          <img
            src="/images/hero/panel-4-books.webp"
            alt="Stacked Books"
            className="h-full w-full object-cover"
          />


        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 mix-blend-difference text-white">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </div>
  );
}
