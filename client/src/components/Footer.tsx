import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 pt-24 pb-12 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["About Us", "Our Courses", "Special Needs", "Mental Health", "AIMVerse", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="h-px w-4 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="block text-foreground mb-1">Address:</strong>
                123 Education Lane, Knowledge City, Dhaka 1200
              </li>
              <li>
                <strong className="block text-foreground mb-1">Email:</strong>
                info@aimcentre360.com
              </li>
              <li>
                <strong className="block text-foreground mb-1">Phone:</strong>
                +880 1234 567890
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to get updates on new courses and events.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Your email address" 
                className="bg-background border-border/50 focus:border-primary transition-colors" 
                type="email"
                required
              />
              <Button type="submit" className="w-full group">
                Subscribe Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </form>
            
            {/* Antique Books Image from original site */}
            <div className="mt-8 relative h-12 overflow-hidden rounded opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src="/images/antique-books.webp" 
                alt="Antique Books" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 AIM Centre 360. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-primary transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
