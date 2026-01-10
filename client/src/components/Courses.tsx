import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const categories = [
  "All",
  "Academic",
  "Tiny Explorers",
  "Special Needs",
  "Spoken English",
  "Creative Exploration"
];

const courses = [
  {
    id: 1,
    title: "English Medium - Class 5",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    price: "৳2,500",
    description: "Comprehensive curriculum covering all major subjects for Class 5 English Medium students."
  },
  {
    id: 2,
    title: "Preschool Discovery",
    category: "Tiny Explorers",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2072&auto=format&fit=crop",
    price: "৳1,800",
    description: "Fun and interactive learning sessions designed for preschoolers to spark curiosity."
  },
  {
    id: 3,
    title: "Autism Support - Level 1",
    category: "Special Needs",
    image: "https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=2071&auto=format&fit=crop",
    price: "৳3,000",
    description: "Tailored educational support for children with Level 1 Autism, focusing on social skills."
  },
  {
    id: 4,
    title: "Professional Spoken English",
    category: "Spoken English",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    price: "৳2,200",
    description: "Master the art of communication with our professional spoken English course."
  },
  {
    id: 5,
    title: "Pottery Workshop",
    category: "Creative Exploration",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop",
    price: "৳1,500",
    description: "Hands-on pottery workshop to unleash your creativity and learn a new skill."
  },
  {
    id: 6,
    title: "Bangla Medium - Class 8",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    price: "৳2,800",
    description: "In-depth academic support for Class 8 Bangla Medium students across all subjects."
  }
];

export default function Courses() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredCourses.length > 3) {
        setCarouselIndex((prev) => (prev + 1) % (filteredCourses.length - 2));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredCourses.length]);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(filteredCourses.length - 3, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-transparent">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-widest uppercase text-sm"
            >
              {t("courses.subtitle")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2"
            >
              {t("courses.title")}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-72 mt-4 md:mt-0"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="flex flex-wrap justify-start gap-1 sm:gap-2 bg-transparent p-0 mb-8 sm:mb-12 h-auto overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <TabsTrigger
                  value={category}
                  className="rounded-none border-b-2 border-transparent px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-300 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 touch-manipulation whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {/* Main Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-24">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-card border border-border overflow-hidden hover-lift transition-all duration-500 flex flex-col cursor-pointer active:border-primary touch-manipulation"
                >
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                      {course.category}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500 z-20">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-xl font-bold text-premium-hover">
                        {course.title}
                      </h3>
                      <span className="font-bold text-primary">{course.price}</span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>12 Lessons</span>
                        </div>

                        <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-premium-hover text-xs">
                          View Details
                          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>

                      <Link href="/auth">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] font-medium tracking-wide shadow-sm hover:shadow-md">
                          {t("courses.enroll") || "Enroll Now"}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mb-16">
              <Button
                variant="outline"
                className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-12 py-5 sm:py-7 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium transition-all duration-300 hover-magnetic touch-manipulation active:scale-95"
              >
                View More Courses
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </div>

            {/* Extra Courses Carousel Section */}
            <div className="border-t border-border pt-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold">More to Explore</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    className="rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden" ref={carouselRef}>
                <motion.div
                  className="flex gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
                  drag="x"
                  dragConstraints={{ right: 0, left: -((courses.length * 2) * 320 - 1000) }}
                  animate={{ x: `-${carouselIndex * 320}px` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                >
                  {[...courses, ...courses].map((course, idx) => (
                    <div key={`${course.id}-${idx}`} className="min-w-[300px] w-[300px]">
                      <motion.div
                        whileTap={{ scale: 0.96 }}
                        className="group relative bg-card border border-border overflow-hidden hover-lift transition-all duration-500 h-full hover:shadow-xl dark:hover:shadow-primary/10 cursor-pointer active:border-primary"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 text-[10px] font-medium uppercase tracking-wider">
                            {course.category}
                          </div>
                          {/* Wishlist Button for Carousel */}
                          <button className="absolute top-3 right-3 p-1.5 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500 z-20">
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="p-4 flex flex-col h-auto min-h-[200px]">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-serif text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h4>
                            <span className="text-sm font-bold text-primary">{course.price}</span>
                          </div>
                          <div className="mt-auto space-y-2">
                            <Button size="sm" variant="ghost" className="w-full hover:bg-transparent text-premium-hover text-xs p-0 h-auto justify-start font-medium">
                              View Details
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                            <Link href="/auth">
                              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] font-medium tracking-wide shadow-sm hover:shadow-md">
                                {t("courses.enroll") || "Enroll Now"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
