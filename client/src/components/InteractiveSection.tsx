import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface InteractiveSectionProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export default function InteractiveSection({ children, className = "", intensity = 20 }: InteractiveSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Track scroll progress for this specific section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create a subtle vertical shift (y offset)
    // Maps scroll progress [0, 1] to [-intensity, intensity]
    const yTranslate = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);

    // Smooth out the movement with a spring
    const ySpring = useSpring(yTranslate, {
        damping: 30,
        stiffness: 100,
        mass: 0.5
    });

    return (
        <div
            ref={ref}
            className={`relative w-full h-full overflow-hidden ${className}`}
        >
            <motion.div
                style={{
                    y: ySpring,
                    scale: 1.05 // Slightly larger scale to ensure no gaps appear during vertical movement
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
