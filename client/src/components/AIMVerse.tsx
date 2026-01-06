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
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 font-medium tracking-[0.3em] uppercase text-sm">The Animated Universe</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white">
              AIMVerse
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Where complex scientific topics come alive through superheroes and supervillains. Join us for weekly episodic releases, quizzes, and prize giveaways!
            </p>
          </motion.div>
        </div>

        {/* Video Trailer Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video w-full max-w-5xl mx-auto bg-gray-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-16 group"
        >
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" 
            alt="AIMVerse Trailer" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="icon" 
              className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-2xl font-bold mb-2">Episode 1: The Quantum Realm</h3>
            <p className="text-gray-300">Discover the secrets of subatomic particles with Captain Quantum.</p>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
              <Timer className="h-8 w-8 text-cyan-400" />
              Next Episode Release
            </h3>
            <p className="text-gray-400 mb-8">
              Get ready for an epic journey into the world of physics. Don't miss the premiere and the chance to win exclusive merchandise!
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-6 text-lg">
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
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg text-center backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold font-mono text-cyan-400 mb-2">
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
