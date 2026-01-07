import { Button } from "./ui/button";

export default function About() {
  return (
    <section className="w-full bg-background py-24">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[0.9]">
                About AIM Centre<br />360
              </h2>
              <div className="text-6xl font-serif">*</div>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-xl text-justify">
              <p>
                AIM Centre 360 is an innovative e-learning platform offering a wide range of academic courses, live classes, and skill-based programs for students of all ages.
              </p>
              <p>
                We are dedicated to providing a unique and effective learning experience for children with special needs, tailoring our approach to each individual based on their Autism Level 1, 2, 3 categories.
              </p>
              <p>
                Our exclusive mental health counseling services are designed to support both students and parents, ensuring a holistic approach to education and well-being.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                variant="outline" 
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-sm uppercase tracking-widest transition-all duration-300"
              >
                Explore More
              </Button>
            </div>
          </div>

          {/* Right Column: Image (Relevant Alternative) */}
          <div className="relative h-[600px] w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Learning Environment" 
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </div>

        {/* Standout Features Grid */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Why Choose Us</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2">The AIM Advantage</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Live Classes & Academics", desc: "Interactive real-time learning with comprehensive academic curriculum.", icon: "🎓" },
              { title: "Tiny Explorers", desc: "Curiosity-driven early childhood education for our youngest learners.", icon: "🌱" },
              { title: "Special Needs Innovation", desc: "Sensory-induced teaching tailored for Autism Levels 1-3 & developmental needs.", icon: "🧩" },
              { title: "Mental Health Support", desc: "Professional counseling for both students and parents for holistic well-being.", icon: "🧠" },
              { title: "AIMVerse & Gamification", desc: "Animated educational episodes and fun, gamified learning elements.", icon: "🎮" },
              { title: "Skill-Based Learning", desc: "Practical skills development with quizzes and real-time progress tracking.", icon: "⚡" },
              { title: "AIMbot: AI Tutor", desc: "Smart 24/7 AI companion for personalized guidance and instant doubts resolution.", icon: "🤖" },
              { title: "Accessibility First", desc: "Customizable interface options to suit every learner's unique needs.", icon: "♿" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
