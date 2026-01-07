import { Button } from "./ui/button";

export default function About() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-black uppercase leading-[0.9]">
                About AIM Centre<br />360
              </h2>
              <div className="text-6xl font-serif">*</div>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-800 max-w-xl text-justify">
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
                className="rounded-none border-black text-black hover:bg-black hover:text-white px-8 py-6 text-sm uppercase tracking-widest transition-all duration-300"
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
      </div>
    </section>
  );
}
