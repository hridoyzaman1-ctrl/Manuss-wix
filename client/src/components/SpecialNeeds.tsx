import { motion } from "framer-motion";
import { Brain, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SpecialNeeds() {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">{t("special.tag")}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">
              {t("special.title")}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-justify">
              {t("special.desc")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Brain className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("special.sensory")}</h3>
                <p className="text-sm text-muted-foreground">Tailored environments that respect sensory sensitivities while promoting engagement through tactile, visual, and auditory stimuli.</p>
              </div>
              
              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Heart className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("special.emotional")}</h3>
                <p className="text-sm text-muted-foreground">Building confidence and emotional resilience through positive reinforcement, social stories, and guided interaction.</p>
              </div>
              
              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Sparkles className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("special.individualized")}</h3>
                <p className="text-sm text-muted-foreground">Customized Individualized Education Programs (IEPs) that evolve with your child's growth and milestones.</p>
              </div>

              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Brain className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("special.lifeSkills")}</h3>
                <p className="text-sm text-muted-foreground">Practical training in daily living skills, communication, and social interaction to foster independence.</p>
              </div>
            </div>

            <Button size="lg" className="rounded-none px-8">
              Learn About Our Approach
            </Button>
          </motion.div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=2071&auto=format&fit=crop" 
                alt="Child learning with sensory toys" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-background p-6 shadow-xl border border-border max-w-xs hidden md:block"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Autism Support</h4>
                    <p className="text-xs text-muted-foreground">Level 1, 2, 3 & Undefined</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/30"></div>
          </motion.div>
        </div>
      </div>

      {/* Parents Resources Section */}
      <div className="container mt-32">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Support & Community</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">{t("special.resources")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("special.resourcesDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Video Section */}
          <div className="relative group">
            <div className="aspect-video bg-black relative overflow-hidden border border-border shadow-2xl">
              <video 
                ref={videoRef}
                width="100%" 
                height="100%" 
                autoPlay 
                muted={isMuted}
                loop 
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              >
                <source src="/videos/autism-child.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Overlay for Premium Feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Sound Control */}
              <button 
                onClick={toggleMute}
                className="absolute bottom-6 right-6 bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20 text-white transition-all duration-300 z-20"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              {/* Live Indicator */}
              <div className="absolute top-6 left-6 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-bold uppercase tracking-wider">Therapy Session</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-2xl font-bold mb-2">{t("special.classroom")}</h3>
              <p className="text-muted-foreground">{t("special.classroomDesc")}</p>
            </div>
          </div>

          {/* Resources List */}
          <div className="space-y-8">
            <div className="border-l-2 border-primary pl-6 py-2">
              <h3 className="font-serif text-2xl font-bold mb-2">Recommended Reading</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <span className="font-bold block text-foreground">The Reason I Jump</span>
                  by Naoki Higashida - An inner voice of a thirteen-year-old boy with autism.
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <span className="font-bold block text-foreground">Neurotribes</span>
                  by Steve Silberman - The legacy of autism and the future of neurodiversity.
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-primary pl-6 py-2">
              <h3 className="font-serif text-2xl font-bold mb-2">Helpful Blogs & Guides</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <span className="font-bold block text-foreground">Autism Speaks Tool Kits</span>
                  Comprehensive guides for every stage of the journey, from diagnosis to adulthood.
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <span className="font-bold block text-foreground">Sensory Processing Guide</span>
                  Understanding and managing sensory sensitivities in daily life.
                </li>
              </ul>
            </div>

            <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 w-full md:w-auto">
              View All Resources
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
