import { Command, Clock } from "lucide-react";

export default function LearningHours() {
  return (
    <section className="w-full bg-[#F4F4F4] py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Left: Learning Hours */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Command className="h-12 w-12 text-black" />
            </div>
            <h3 className="font-sans text-sm tracking-widest uppercase text-gray-800">
              Learning Hours
            </h3>
          </div>

          {/* Center: Arched Image */}
          <div className="flex justify-center">
            <div className="relative w-64 h-96 overflow-hidden rounded-t-full">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
                alt="Library Archway" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: 24/7 Access */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Command className="h-12 w-12 text-black" />
            </div>
            <p className="font-sans text-sm text-gray-600 max-w-[200px] leading-relaxed">
              24/7 access to online learning resources and course materials
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
