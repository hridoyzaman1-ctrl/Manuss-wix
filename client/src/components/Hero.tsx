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
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-[20px] h-[800px] bg-white">
        
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
              className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-black tracking-tight cursor-default"
            >
              <motion.span 
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                Aim High,
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: -2, color: "#333" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block my-2 origin-center"
              >
                Achieve
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05, x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                Infinity!
              </motion.span>
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
            <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tighter text-black leading-[0.9] cursor-default perspective-1000 flex flex-col items-center">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  y: -5
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="block"
              >
                AIM
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  y: -5
                }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="block"
              >
                Centre
              </motion.span>
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateX: 10,
                  color: "#1a1a1a"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-[10rem] md:text-[12rem] font-light block mt-[-1rem] origin-bottom"
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
          

        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 mix-blend-difference text-white">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </div>
  );
}
