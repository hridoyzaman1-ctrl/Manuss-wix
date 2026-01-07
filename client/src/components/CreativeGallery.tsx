import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const galleryItems = [
  {
    id: 1,
    title: "Abstract Emotions",
    student: "Sarah Ahmed",
    age: 12,
    category: "Paintings",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2028&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Urban Perspectives",
    student: "Rahim Khan",
    age: 15,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Paper Crane",
    student: "Aisha Rahman",
    age: 10,
    category: "Paper Crafts",
    image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Clay Vase",
    student: "Karim Uddin",
    age: 14,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Digital Dreams",
    student: "Nadia Islam",
    age: 16,
    category: "Digital Art",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Nature's Patterns",
    student: "Tanvir Hasan",
    age: 13,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop"
  }
];

export default function CreativeGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = galleryItems.find(item => item.id === selectedId);
  const selectedIndex = galleryItems.findIndex(item => item.id === selectedId);

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % galleryItems.length;
    setSelectedId(galleryItems[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedId(galleryItems[prevIndex].id);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Student Showcase</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">
              Creative Exploration
            </h2>
            <p className="text-lg text-muted-foreground">
              Celebrating the artistic talents of our students across various mediums.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-3">
              <motion.div
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedId(item.id)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg hover-lift"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>
              </motion.div>
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="px-8">View More Creations</Button>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full h-12 w-12"
              onClick={() => setSelectedId(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 hidden md:flex"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 hidden md:flex"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative max-w-5xl w-full max-h-[85vh] bg-background rounded-lg overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/3 h-[50vh] md:h-auto bg-black">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-card">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{selectedItem.category}</span>
                <h3 className="text-3xl font-serif font-bold mb-4">{selectedItem.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Artist</span>
                    <span className="font-medium">{selectedItem.student}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">{selectedItem.age} years</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Class</span>
                    <span className="font-medium">Standard 8</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm italic">
                  "Art is not what you see, but what you make others see."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
