import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, Globe, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t("nav.home"), href: "#top" },
    { name: t("nav.courses"), href: "#courses" },
    { name: t("nav.specialNeeds"), href: "#special-needs" },
    { name: t("nav.tinyExplorers"), href: "#tiny-explorers" },
    { name: t("nav.mentalHealth"), href: "#mental-health" },
    { name: t("nav.aimVerse"), href: "#aimverse" },
    { name: t("nav.gallery"), href: "#gallery" },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 left-0 right-0 z-50 bg-white dark:bg-background border-b-0 py-3 sm:py-4 transition-shadow duration-300 ${isScrolled ? 'shadow-sm' : ''}`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center gap-2 group cursor-pointer touch-manipulation"
        >
          <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden bg-foreground text-background flex items-center justify-center font-serif font-bold text-lg sm:text-xl transition-transform duration-500 group-hover:rotate-180 group-active:scale-95">
            <span>A</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-base sm:text-lg font-bold leading-none tracking-tight">AIM Centre 360</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-bold tracking-wide transition-colors hover:text-foreground whitespace-nowrap cursor-pointer hover-trigger px-2 py-1 ${location === link.href ? "text-foreground" : "text-muted-foreground"}`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                {link.name}
              </motion.span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Language & Theme Toggles */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full hover:bg-muted transition-colors font-bold gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 h-8 sm:h-9 touch-manipulation active:scale-95"
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs md:text-sm">{language === 'en' ? 'BN' : 'EN'}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-muted transition-colors h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 touch-manipulation active:scale-95"
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
                    <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          <div className="hidden md:block h-6 w-[1px] bg-border mx-1 sm:mx-2"></div>

          {/* Auth Buttons (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary text-foreground text-sm">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-4 lg:px-6 text-sm">
                {t("nav.signup")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle - Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden ml-1 sm:ml-2 h-9 w-9 sm:h-10 sm:w-10 touch-manipulation active:scale-95 relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[57px] sm:top-[65px] z-40 bg-background/98 backdrop-blur-xl xl:hidden overflow-y-auto overscroll-contain"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="container py-6 sm:py-8 flex flex-col gap-4 sm:gap-6 min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-65px)]"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="text-xl sm:text-2xl font-serif font-bold py-3 sm:py-4 border-b border-border text-foreground hover:text-primary active:text-primary transition-colors cursor-pointer touch-manipulation active:bg-muted/50 -mx-4 px-4"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Auth Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6"
              >
                <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-foreground text-background py-5 sm:py-6 text-base sm:text-lg touch-manipulation active:scale-[0.98] transition-transform">
                    {t("nav.signup")}
                  </Button>
                </Link>
                <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full border-foreground text-foreground py-5 sm:py-6 text-base sm:text-lg touch-manipulation active:scale-[0.98] transition-transform">
                    {t("nav.login")}
                  </Button>
                </Link>
              </motion.div>

              {/* Spacer to push content up */}
              <div className="flex-grow" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
