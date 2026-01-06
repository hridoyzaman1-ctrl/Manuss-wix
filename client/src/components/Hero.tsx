import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-4">
        {/* Panel 1: Tagline */}
        <motion.div 
          style={{ y: y1 }}
          className="relative flex h-full flex-col items-center justify-center bg-[#F5F5DC] p-8 text-center dark:bg-[#0A0A0A]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-10"
          >
            <h2 className="font-serif text-4xl font-bold leading-tight text-black md:text-6xl dark:text-white">
              Aim High,<br />
              <span className="italic">Achieve</span><br />
              Infinity!
            </h2>
          </motion.div>
          <div className="absolute inset-0 bg-[url('/images/hero/texture.png')] opacity-10 mix-blend-multiply"></div>
        </motion.div>

        {/* Panel 2: Hands on Book */}
        <motion.div 
          style={{ y: y2 }}
          className="relative h-full overflow-hidden"
        >
          <img 
            src="/images/hero/book-pages-hands.webp" 
            alt="Hands turning book pages" 
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-transparent"></div>
        </motion.div>

        {/* Panel 3: Title & CTA */}
        <motion.div 
          style={{ y: y3 }}
          className="relative flex h-full flex-col items-center justify-center bg-white p-8 text-center dark:bg-[#111]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            <h1 className="font-serif text-5xl font-bold tracking-tight text-black md:text-7xl dark:text-white">
              AIM Centre<br />
              <span className="text-6xl md:text-8xl">360</span>
            </h1>
            
            <Button 
              size="lg"
              className="group relative overflow-hidden rounded-none border border-black bg-transparent px-8 py-6 text-lg text-black transition-all hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enroll Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Panel 4: Stacked Books */}
        <motion.div 
          style={{ y: y4 }}
          className="relative h-full overflow-hidden"
        >
          <img 
            src="/images/hero/stacked-books-bookmark.webp" 
            alt="Stacked antique books" 
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute right-8 top-0 h-32 w-12 bg-yellow-300 shadow-lg transition-all hover:h-40">
            <div className="flex h-full flex-col items-center justify-center gap-2 py-4 font-serif text-xl font-bold text-black">
              <span>A</span>
              <span>I</span>
              <span>M</span>
            </div>
            <div className="absolute -bottom-6 left-0 h-0 w-0 border-l-[24px] border-r-[24px] border-t-[24px] border-l-transparent border-r-transparent border-t-yellow-300"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="h-12 w-[1px] bg-muted-foreground/50">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-primary origin-top scale-y-0"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
