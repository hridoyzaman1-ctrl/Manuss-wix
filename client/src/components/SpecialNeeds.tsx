import { motion } from "framer-motion";
import { Brain, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function SpecialNeeds() {
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
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Inclusive Education</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">
              Children with <br />
              <span className="italic text-primary">Special Needs</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our innovative sensory-induced teaching method ensures that each lesson is customized and tailored for every unique individual. We believe in unlocking the potential within every child through understanding and specialized care.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Brain className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">Sensory Learning</h3>
                <p className="text-sm text-muted-foreground">Tailored environments that respect sensory sensitivities while promoting engagement.</p>
              </div>
              
              <div className="bg-background p-6 border border-border hover:border-primary transition-colors duration-300 group">
                <Heart className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">Emotional Support</h3>
                <p className="text-sm text-muted-foreground">Building confidence and emotional resilience through positive reinforcement.</p>
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
    </section>
  );
}
