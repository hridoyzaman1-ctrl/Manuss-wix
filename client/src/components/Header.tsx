import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, ShoppingCart, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Special Needs", href: "/special-needs" },
    { name: "Tiny Explorers", href: "/tiny-explorers" },
    { name: "Mental Health", href: "/mental-health" },
    { name: "AIMVerse", href: "/aimverse" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 py-4"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 overflow-hidden bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-serif font-bold text-xl transition-transform duration-500 group-hover:rotate-180">
              <span>A</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg font-bold leading-none tracking-tight">AIM Centre 360</span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className={`relative text-sm font-bold tracking-wide transition-colors hover:text-black whitespace-nowrap ${
                location === link.href ? "text-black" : "text-black/70"
              }`}>
                {link.name}
                {location === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </a>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted transition-colors"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <div className="h-6 w-[1px] bg-border mx-2"></div>

          <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary text-black">
            Log In
          </Button>
          <Button className="rounded-full bg-black text-white hover:bg-black/80 px-6">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[73px] z-40 bg-white md:hidden overflow-y-auto"
          >
            <div className="container py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a 
                      className="text-2xl font-serif font-bold py-3 border-b border-gray-100 text-black hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <Button className="w-full rounded-full bg-black text-white py-6 text-lg">
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full rounded-full border-black text-black py-6 text-lg">
                  Log In
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-100">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-12 w-12 bg-gray-100">
                  {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </Button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
