import { motion } from "framer-motion";
import { Play, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AIMVerse() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden">
      {/* Subtle Texture Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:invert dark:opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground font-medium tracking-[0.3em] uppercase text-sm">{t("aimverse.tag")}</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold mt-4 mb-6 text-foreground">
              {t("aimverse.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("aimverse.desc")}
            </p>
          </motion.div>
        </div>

        {/* Video Trailer Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video w-full max-w-5xl mx-auto bg-gray-100 rounded-none overflow-hidden shadow-xl mb-16 group"
        >
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" 
            alt="AIMVerse Trailer" 
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
            <Button 
              size="icon" 
              className="h-24 w-24 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 border-none"
            >
              <Play className="h-8 w-8 ml-1 fill-current" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 className="text-2xl font-bold mb-2 font-serif">Episode 1: The Quantum Realm</h3>
            <p className="text-gray-200">Discover the secrets of subatomic particles with Captain Quantum.</p>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3 text-foreground">
              <Timer className="h-8 w-8" />
              {t("aimverse.nextEpisode")}
            </h3>
            <p className="text-muted-foreground mb-8">
              {t("aimverse.nextEpisodeDesc")}
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-lg uppercase tracking-widest transition-all duration-300 hover:scale-105">
              {t("aimverse.reminder")}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Power Glossary Section */}
        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-muted-foreground font-medium tracking-[0.3em] uppercase text-sm">{t("aimverse.glossaryTag")}</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold mt-2 text-foreground">{t("aimverse.glossaryTitle")}</h3>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t("aimverse.glossaryDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hero Profile */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 shadow-lg relative overflow-hidden group hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-widest">Hero</div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-3xl font-serif font-bold text-foreground">Photon</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Episode 04: "Light Speed"</p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wide text-foreground mb-2 border-b border-border pb-1">Power: Light Manipulation</h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ability to control and solidify photons, creating hard-light constructs and moving at relativistic speeds.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-bold uppercase text-muted-foreground/70 mb-1">Scientific Theory</h5>
                    <p className="text-sm font-medium text-foreground">Wave-Particle Duality</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-muted-foreground/70 mb-1">Plausibility</h5>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                      <div className="bg-green-500 h-2 rounded-full w-[40%]"></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-muted-foreground">Theoretical</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-muted-foreground/70 mb-1">Mechanism</h5>
                  <p className="text-sm text-muted-foreground">
                    Utilizes a quantum field generator to collapse the wave function of light into tangible matter (Bose-Einstein Condensates).
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-muted-foreground/70 mb-1">Future Possibility</h5>
                  <p className="text-sm text-muted-foreground italic">
                    "Photonics computing and laser cooling are early steps toward controlling light as matter."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Villain Profile */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary text-secondary-foreground border border-border p-8 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 bg-foreground text-background text-xs font-bold px-3 py-1 uppercase tracking-widest">Villain</div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-3xl font-serif font-bold">Entropy</h4>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mt-1">Episode 07: "Heat Death"</p>
                </div>
                <div className="text-4xl">🌀</div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wide text-secondary-foreground mb-2 border-b border-border pb-1">Power: Decay Acceleration</h5>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                    Can instantly increase the disorder (entropy) of any closed system, causing structures to crumble and energy to dissipate.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-bold uppercase text-secondary-foreground/60 mb-1">Scientific Theory</h5>
                    <p className="text-sm font-medium text-secondary-foreground">Second Law of Thermodynamics</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-secondary-foreground/60 mb-1">Plausibility</h5>
                    <div className="w-full bg-gray-800 h-2 rounded-full mt-1">
                      <div className="bg-red-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-secondary-foreground/60">High (Natural Law)</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-secondary-foreground/60 mb-1">Mechanism</h5>
                  <p className="text-sm text-secondary-foreground/80">
                    Acts as a catalyst for thermodynamic equilibrium, bypassing activation energy barriers to speed up natural decay.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-secondary-foreground/60 mb-1">Future Possibility</h5>
                  <p className="text-sm text-secondary-foreground/80 italic">
                    "Understanding entropy is key to energy efficiency, but weaponizing it remains pure sci-fi... for now."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
