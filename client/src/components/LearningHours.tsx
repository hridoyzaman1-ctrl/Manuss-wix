import { Command, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function LearningHours() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={containerRef} className="w-full bg-[#F4F4F4] py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Left: Learning Hours */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Command className="h-12 w-12 text-black" />
            </div>
            <h3 className="font-sans text-sm tracking-widest uppercase text-gray-800">
              Learning Hours
            </h3>
          </div>

          {/* Center: Arched Image */}
          <div className="flex justify-center relative">
            <motion.div style={{ y: imageY }} className="relative w-64 h-96 overflow-hidden rounded-t-full z-10">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                alt="Library Archway"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Right: 24/7 Access */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Command className="h-12 w-12 text-black" />
            </div>
            <p className="font-sans text-sm text-gray-600 max-w-[200px] leading-relaxed">
              24/7 access to online learning resources and course materials
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
