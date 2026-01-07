import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, ShoppingCart, Sun, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.courses"), href: "/courses" },
    { name: t("nav.specialNeeds"), href: "/special-needs" },
    { name: t("nav.tinyExplorers"), href: "/tiny-explorers" },
    { name: t("nav.mentalHealth"), href: "/mental-health" },
    { name: t("nav.aimVerse"), href: "/aimverse" },
    { name: t("nav.gallery"), href: "/gallery" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative top-0 left-0 right-0 z-50 bg-white dark:bg-background border-b-0 py-4"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 overflow-hidden bg-foreground text-background flex items-center justify-center font-serif font-bold text-xl transition-transform duration-500 group-hover:rotate-180">
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
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-sm font-bold tracking-wide transition-colors hover:text-foreground whitespace-nowrap cursor-pointer hover-trigger px-2 py-1 ${
                  location === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
                {location === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language & Theme Toggles (Visible on Mobile) */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full hover:bg-muted transition-colors font-bold gap-2 px-2 md:px-4"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs md:text-sm">{language === 'en' ? 'BN' : 'EN'}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-muted transition-colors h-8 w-8 md:h-10 md:w-10"
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
                    <Sun className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          <div className="hidden md:block h-6 w-[1px] bg-border mx-2"></div>

          {/* Auth Buttons (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary text-foreground">
              {t("nav.login")}
            </Button>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6">
              {t("nav.signup")}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[73px] z-40 bg-background md:hidden overflow-y-auto"
          >
            <div className="container py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a 
                      className="text-2xl font-serif font-bold py-3 border-b border-border text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <Button className="w-full rounded-full bg-foreground text-background py-6 text-lg">
                  {t("nav.signup")}
                </Button>
                <Button variant="outline" className="w-full rounded-full border-foreground text-foreground py-6 text-lg">
                  {t("nav.login")}
                </Button>
              </div>

              {/* Toggles removed from here as they are now in the top bar */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
