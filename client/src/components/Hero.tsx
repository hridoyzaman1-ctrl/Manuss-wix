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
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-1 h-[800px] bg-white">
        
        {/* Panel 1: Texture Background + Tagline */}
        <motion.div 
          style={{ y: y1 }}
          className="relative h-[120%] -top-[10%] flex flex-col items-center justify-center overflow-hidden border-r border-gray-200"
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
              className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-black tracking-tight"
            >
              Aim High,<br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="italic font-light text-6xl md:text-8xl block my-2"
              >
                Achieve
              </motion.span>
              Infinity!
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Panel 2: Video Background (Hands on Book) */}
        <motion.div 
          style={{ y: y2 }}
          className="relative h-[120%] -top-[10%] overflow-hidden"
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
          className="relative h-[120%] -top-[10%] flex flex-col items-center justify-center bg-[#F4F4F4] text-center px-4 border-r border-gray-200"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-12"
          >
            <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tighter text-black leading-[0.9]">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                AIM Centre
              </motion.span>
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-8xl md:text-[10rem] font-light block mt-2"
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
          className="relative h-[120%] -top-[10%] overflow-hidden"
        >
          <img 
            src="/images/hero/panel-4-books.jpg" 
            alt="Stacked Books" 
            className="h-full w-full object-cover"
          />
          
          {/* Yellow Bookmark */}
          <div className="absolute right-12 top-0 h-48 w-16 bg-[#FFEB3B] shadow-xl flex flex-col items-center pt-8 pb-4">
            <div className="flex flex-col gap-4 font-serif text-2xl font-bold text-black">
              <span>A</span>
              <span>I</span>
              <span>M</span>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[32px] border-r-[32px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#F4F4F4] transform translate-y-[1px]"></div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 mix-blend-difference text-white">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </div>
  );
}
