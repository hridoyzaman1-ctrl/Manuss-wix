import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MissionStatement() {
  const { t } = useLanguage();
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
            <motion.h2
              className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight tracking-tight drop-shadow-2xl"
              initial={{ textShadow: "0px 0px 0px rgba(255,255,255,0)" }}
              whileInView={{ textShadow: "0px 0px 30px rgba(255,255,255,0.3)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {t("mission.text").split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                  viewport={{ once: true }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <div className="mt-12 flex justify-center">
              <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
