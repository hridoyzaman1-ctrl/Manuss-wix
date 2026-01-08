import { motion } from "framer-motion";
import { Calendar, Clock, User, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function MentalHealth() {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Wellness & Support</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">
              Mental Health <br />
              <span className="italic text-primary">Counseling</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              We offer mental health counseling by certified professionals for both parents and students. Understanding the importance of mental well-being is crucial for academic success and personal growth.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-300 cursor-pointer hover-lift">
                <div className="p-3 bg-secondary rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">For Students</h3>
                  <p className="text-muted-foreground">Managing exam stress, peer pressure, and building emotional resilience.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-300 cursor-pointer hover-lift">
                <div className="p-3 bg-secondary rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">For Parents</h3>
                  <p className="text-muted-foreground">Guidance on parenting strategies and supporting your child's development.</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop"
                alt="Counseling session"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 shadow-lg relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h3 className="font-serif text-2xl font-bold mb-6">Schedule an Appointment</h3>

            <form className="space-y-6">
              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup defaultValue="student" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent">Parent</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-uid">Child UID (if Parent)</Label>
                  <Input id="child-uid" placeholder="e.g. AIM-1234" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+880..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <div className="relative">
                    <Input type="date" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                      <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Reason for Visit</Label>
                <Textarea id="message" placeholder="Briefly describe your concerns..." />
              </div>

              <Button className="w-full text-lg py-6">Book Appointment</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
