import { motion } from "framer-motion";
import { Play, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function AIMVerse() {
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
    <section className="py-24 bg-[#FAFAFA] text-black relative overflow-hidden">
      {/* Subtle Texture Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-black/60 font-medium tracking-[0.3em] uppercase text-sm">The Animated Universe</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6 text-black">
              AIMVerse
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Where complex scientific topics come alive through superheroes and supervillains. Join us for weekly episodic releases, quizzes, and prize giveaways!
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
            <h3 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3 text-black">
              <Timer className="h-8 w-8" />
              Next Episode Release
            </h3>
            <p className="text-gray-600 mb-8">
              Get ready for an epic journey into the world of physics. Don't miss the premiere and the chance to win exclusive merchandise!
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white rounded-none px-10 py-7 text-lg uppercase tracking-widest">
              Set Reminder
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 text-center shadow-sm">
                <div className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
