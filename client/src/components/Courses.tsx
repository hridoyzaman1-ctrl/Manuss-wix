import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Search, ChevronLeft, ChevronRight, FolderTree, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

// Sample courses to always display alongside database courses
const sampleCourses = [
  {
    id: -1,
    title: "English Medium - Class 5",
    category: "Academic",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    price: "2500",
    description: "Comprehensive curriculum covering all major subjects for Class 5 English Medium students."
  },
  {
    id: -2,
    title: "Preschool Discovery",
    category: "Tiny Explorers",
    thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2072&auto=format&fit=crop",
    price: "1800",
    description: "Fun and interactive learning sessions designed for preschoolers to spark curiosity."
  },
  {
    id: -3,
    title: "Autism Support - Level 1",
    category: "Special Needs",
    thumbnail: "https://images.unsplash.com/photo-1555819206-7b30da4f1506?q=80&w=2071&auto=format&fit=crop",
    price: "3000",
    description: "Tailored educational support for children with Level 1 Autism, focusing on social skills."
  },
  {
    id: -4,
    title: "Professional Spoken English",
    category: "Spoken English & Grammar",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    price: "2200",
    description: "Master the art of communication with our professional spoken English course."
  },
  {
    id: -5,
    title: "Pottery Workshop",
    category: "Skills and Creativities",
    thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop",
    price: "1500",
    description: "Hands-on pottery workshop to unleash your creativity and learn a new skill."
  },
  {
    id: -6,
    title: "Bangla Medium - Class 8",
    category: "Academic",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    price: "2800",
    description: "In-depth academic support for Class 8 Bangla Medium students across all subjects."
  },
  {
    id: -7,
    title: "Kindergarten Fun Learning",
    category: "Tiny Explorers",
    thumbnail: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop",
    price: "2000",
    description: "Engaging activities and games to make learning fun for kindergartners."
  },
  {
    id: -8,
    title: "English Version - Class 10",
    category: "Academic",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
    price: "3500",
    description: "Complete SSC preparation for English Version students with expert guidance."
  },
  {
    id: -9,
    title: "Art & Craft for Kids",
    category: "Skills and Creativities",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    price: "1200",
    description: "Creative art and craft sessions to develop fine motor skills and imagination."
  },
  {
    id: -10,
    title: "Autism Support - Level 2",
    category: "Special Needs",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032&auto=format&fit=crop",
    price: "3500",
    description: "Specialized support program for children with Level 2 Autism spectrum."
  },
  {
    id: -11,
    title: "Basic English Grammar",
    category: "Spoken English & Grammar",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop",
    price: "1500",
    description: "Build a strong foundation in English grammar from basics to intermediate."
  },
  {
    id: -12,
    title: "Music & Dance for Youth",
    category: "Skills and Creativities",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    price: "2000",
    description: "Express yourself through music and dance with our youth program."
  }
];

export default function Courses() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Track window size for responsive carousel
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch categories and courses from database
  const { data: categoryHierarchy, isLoading: categoriesLoading } = trpc.category.getHierarchy.useQuery();
  const { data: publishedCourses, isLoading: coursesLoading } = trpc.course.getPublished.useQuery();

  // Build category list from database
  const categories = ["All", ...(categoryHierarchy?.map(c => c.name) || [])];
  
  // Combine sample courses with published courses from database
  const dbCourses = publishedCourses?.map(course => {
    // Find category name for the course
    const category = categoryHierarchy?.find(c => c.id === course.categoryId);
    return {
      ...course,
      categoryName: category?.name || course.category || 'Uncategorized'
    };
  }) || [];
  
  // Always show sample courses + any real courses from database
  const coursesToShow = [
    ...sampleCourses.map(c => ({ ...c, categoryName: c.category })),
    ...dbCourses
  ];

  const filteredCourses = coursesToShow.filter(course => {
    const matchesCategory = activeCategory === "All" || course.categoryName === activeCategory;
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate visible items based on screen size
  const visibleItems = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, filteredCourses.length - visibleItems);

  // Auto-swipe functionality for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredCourses.length > visibleItems) {
        setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(interval);
  }, [filteredCourses.length, maxIndex, visibleItems]);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const isLoading = categoriesLoading || coursesLoading;

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
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              categories.map((category, index) => (
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
              ))
            )}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {/* Main Course Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <FolderTree className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No courses found in this category.</p>
              </div>
            ) : (
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
                        src={course.thumbnail || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        {course.categoryName}
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
                        <span className="font-bold text-primary">
                          {parseFloat(course.price || '0') > 0 ? `৳${course.price}` : 'Free'}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                        {course.description || "Explore this comprehensive course designed to help you achieve your learning goals."}
                      </p>

                      <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{(course as any).totalLessons || 0} Lessons</span>
                          </div>

                          <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-premium-hover text-xs">
                            View Details
                            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>

                        <Link href={user ? "/student/catalog" : "/auth"}>
                          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] font-medium tracking-wide shadow-sm hover:shadow-md">
                            <span>{user ? "Browse & Enroll" : (t("courses.enroll") || "Enroll Now")}</span>
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex justify-center mb-16">
              <Link href={user ? "/student/catalog" : "/auth"}>
                <Button
                  variant="outline"
                  className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-12 py-5 sm:py-7 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium transition-all duration-300 hover-magnetic touch-manipulation active:scale-95"
                >
                  View All Courses
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Extra Courses Carousel Section */}
            {filteredCourses.length > 3 && (
              <div className="border-t border-border pt-8 sm:pt-16">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold">More to Explore</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrev}
                      className="rounded-full hover:bg-primary hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      className="rounded-full hover:bg-primary hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div 
                  className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-y" 
                  ref={carouselRef}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <motion.div
                    className="flex gap-3 sm:gap-6 cursor-grab active:cursor-grabbing"
                    animate={{ x: -carouselIndex * (isMobile ? 83 : 100 / 3) + "%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {filteredCourses.map((course) => (
                      <div
                        key={`carousel-${course.id}`}
                        className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px] flex-shrink-0 bg-card border border-border p-4 sm:p-5 lg:p-6 hover:border-primary transition-colors rounded-lg shadow-sm hover:shadow-md"
                      >
                        <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden rounded-md">
                          <img
                            src={course.thumbnail || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"}
                            alt={course.title}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-semibold mb-2 text-base sm:text-lg line-clamp-2">{course.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {course.description || "Explore this comprehensive course."}
                        </p>
                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <span className="font-bold text-primary text-base sm:text-lg">
                            {parseFloat(course.price || '0') > 0 ? `৳${course.price}` : 'Free'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(course as any).totalLessons || 0} Lessons
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
