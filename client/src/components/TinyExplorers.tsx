import { motion } from "framer-motion";
import { Gamepad2, Palette, Rocket } from "lucide-react";
import { Button } from "./ui/button";

export default function TinyExplorers() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px" 
        }}
      ></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Preschool & Kindergarten</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mt-2 mb-6">
              Tiny Explorers
            </h2>
            <p className="text-lg text-muted-foreground">
              A beautiful fun and learn concept with workshops and games designed to spark curiosity in our youngest learners.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Rocket,
              title: "Fun Workshops",
              desc: "Interactive sessions where learning meets play through hands-on activities.",
              image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2072&auto=format&fit=crop"
            },
            {
              icon: Gamepad2,
              title: "Educational Games",
              desc: "Gamified learning experiences that make complex concepts easy to grasp.",
              image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=2083&auto=format&fit=crop"
            },
            {
              icon: Palette,
              title: "Creative Arts",
              desc: "Expressive arts and crafts to develop fine motor skills and imagination.",
              image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[400px] overflow-hidden border border-border hover-lift cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-4 p-3 bg-white/10 backdrop-blur-md w-fit rounded-full">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.desc}
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Explore More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
