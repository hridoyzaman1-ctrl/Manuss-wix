import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "./ui/button";

export default function Hero() {
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

  // Mouse parallax transforms
  const xMove = useTransform(mouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const yMove = useTransform(mouseY, [-0.5, 0.5], ["-2%", "2%"]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-[20px] h-auto md:h-[800px] bg-white">
        
        {/* Panel 1: Texture Background + Tagline */}
        <motion.div 
          style={{ y: y1 }}
          className="relative h-[500px] md:h-[120%] md:-top-[10%] flex flex-col items-center justify-center overflow-hidden border-r border-gray-200"
        >
          <div className="absolute inset-0">
            <img 
              src="/images/hero/panel-1-texture.jpg" 
              alt="Paper Texture" 
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div 
            style={{ x: xMove, y: yMove }}
            className="relative z-10 text-center px-6"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-3xl md:text-5xl font-light leading-tight text-foreground tracking-[0.15em] uppercase cursor-default relative z-20 flex flex-col gap-4"
            >
              <motion.span 
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block text-primary"
              >
                Aim High,
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-12 h-[1px] bg-muted-foreground self-center"
              ></motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="block text-muted-foreground tracking-[0.25em]"
              >
                Achieve
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05, x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block font-normal text-foreground tracking-[0.2em]"
              >
                Infinity!
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
          style={{ y: y3 }}
          className="relative h-[600px] md:h-[120%] md:-top-[10%] flex flex-col items-center justify-center bg-[#F4F4F4] text-center px-4 border-r border-gray-200 py-12 md:py-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-12"
          >
            {/* Option B: Minimalist Luxury (Refined) */}
            <h1 className="font-sans text-center text-foreground cursor-default flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.8em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-xs md:text-sm uppercase font-medium tracking-[0.8em] block text-muted-foreground ml-2"
              >
                EST. 2026
              </motion.span>
              <div className="flex flex-col items-center relative py-6">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase block"
                >
                  AIM
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
                  Centre
                </motion.span>
              </div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-[5rem] md:text-[7rem] font-thin tracking-tighter leading-none block text-primary font-serif -mt-4"
              >
                360
              </motion.span>
            </h1>
            
            <Button 
              variant="outline"
              className="rounded-none border-black bg-transparent px-10 py-7 text-lg uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Panel 4: Stacked Books Image + Bookmark */}
        <motion.div 
          style={{ y: y4 }}
          className="relative h-[300px] md:h-[120%] md:-top-[10%] overflow-hidden"
        >
          <img 
            src="/images/hero/panel-4-books.jpg" 
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
