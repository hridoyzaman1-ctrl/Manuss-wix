import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-secondary/50 pt-24 pb-12 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <div className="relative h-10 w-10 overflow-hidden bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-serif font-bold text-xl">
                  <span>A</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold leading-none tracking-tight">AIM Centre</span>
                  <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">360</span>
                </div>
              </a>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Aim High, Achieve Infinity! An innovative e-learning platform dedicated to providing unique and effective learning experiences for everyone.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: t("nav.about"), href: "/about" },
                { name: t("nav.courses"), href: "/courses" },
                { name: t("nav.specialNeeds"), href: "/special-needs" },
                { name: t("nav.mentalHealth"), href: "/mental-health" },
                { name: t("nav.aimVerse"), href: "/aimverse" },
                { name: t("footer.contact"), href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="h-px w-4 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info (Simplified) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-lg font-bold mb-6">{t("footer.contact")}</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="block text-foreground mb-1">Email:</strong>
                info@aimcentre360.com
              </li>
              <li>
                <strong className="block text-foreground mb-1">Phone:</strong>
                +880 1234 567890
              </li>
            </ul>
          </motion.div>

          {/* Empty Column for Balance or Additional Links if needed */}
          <div>
             {/* Placeholder for future content or just spacing */}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 AIM Centre 360. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
