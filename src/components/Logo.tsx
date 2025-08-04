import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showTypewriter?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "lg", 
  animated = true,
  showTypewriter = false 
}) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl", 
    lg: "text-6xl",
    xl: "text-8xl"
  };

  const LoopingTypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isTyping, setIsTyping] = React.useState(true);

    React.useEffect(() => {
      if (isTyping && currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 300); // Increased from 150ms to 300ms for slower effect

        return () => clearTimeout(timer);
      } else if (currentIndex >= text.length) {
        setIsTyping(false);
        const fadeTimer = setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setIsTyping(true);
        }, 2000);

        return () => clearTimeout(fadeTimer);
      }
    }, [currentIndex, text, isTyping]);

    return (
      <motion.span 
        animate={!isTyping ? { opacity: [1, 0] } : { opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="inline-block min-h-[1.2em]"
        style={{
          color: '#ffffff',
          fontWeight: 900,
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
        }}
      >
        {displayText}
      </motion.span>
    );
  };

  return (
    <motion.div
      className={`font-black tracking-[0.2em] uppercase text-center ${sizeClasses[size]} ${className}`}
      style={{
        textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)',
        fontWeight: 900
      }}
      whileHover={animated ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span 
        style={{
          color: '#ffffff',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
          fontWeight: 900,
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
        }}
      >
        {showTypewriter ? (
          <LoopingTypewriterText text="PEEPZ" />
        ) : (
          "PEEPZ"
        )}
      </span>
    </motion.div>
  );
};

export default Logo; 