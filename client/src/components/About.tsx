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

        {/* Standout Features Grid (Restyled) */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border pb-8">
            <div>
              <span className="text-muted-foreground font-medium tracking-[0.2em] uppercase text-xs block mb-4">Why Choose Us</span>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-none">The AIM<br/>Advantage</h3>
            </div>
            <p className="text-muted-foreground max-w-md text-right mt-6 md:mt-0 leading-relaxed">
              A holistic ecosystem designed to nurture every aspect of a learner's journey, from academic excellence to emotional well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { title: "Live Classes & Academics", desc: "Interactive real-time learning with comprehensive academic curriculum.", number: "01" },
              { title: "Tiny Explorers", desc: "Curiosity-driven early childhood education for our youngest learners.", number: "02" },
              { title: "Special Needs Innovation", desc: "Sensory-induced teaching tailored for Autism Levels 1-3 & developmental needs.", number: "03" },
              { title: "Mental Health Support", desc: "Professional counseling for both students and parents for holistic well-being.", number: "04" },
              { title: "AIMVerse & Gamification", desc: "Animated educational episodes and fun, gamified learning elements.", number: "05" },
              { title: "Skill-Based Learning", desc: "Practical skills development with quizzes and real-time progress tracking.", number: "06" },
              { title: "AIMbot: AI Tutor", desc: "Smart 24/7 AI companion for personalized guidance and instant doubts resolution.", number: "07" },
              { title: "Accessibility First", desc: "Customizable interface options to suit every learner's unique needs.", number: "08" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group flex flex-col items-start"
              >
                <span className="text-xs font-bold text-muted-foreground/50 mb-6 font-serif tracking-widest group-hover:text-primary transition-colors duration-500">{feature.number}</span>
                <h4 className="font-serif text-2xl font-bold mb-4 text-foreground group-hover:translate-x-2 transition-transform duration-500">{feature.title}</h4>
                <div className="w-12 h-[1px] bg-border mb-4 group-hover:w-full group-hover:bg-primary transition-all duration-700 ease-in-out"></div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
