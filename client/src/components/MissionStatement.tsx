import { motion } from "framer-motion";

export default function MissionStatement() {
  return (
    <section className="py-32 bg-[#1A1A1A] text-[#EAEAEA] relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#D4AF37] blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C0C0C0] blur-[120px]"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight tracking-tight drop-shadow-2xl">
              "Knowledge for <span className="italic text-[#D4AF37]">anybody</span>, <br className="hidden md:block" />
              <span className="italic text-[#D4AF37]">anywhere</span>, <span className="italic text-[#D4AF37]">anytime</span>."
            </h2>
            
            <div className="mt-12 flex justify-center">
              <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
