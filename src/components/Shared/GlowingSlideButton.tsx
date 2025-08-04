import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlowingSlideButtonProps {
  onSlide: () => void;
  loading?: boolean;
  label?: string;
}

const GlowingSlideButton: React.FC<GlowingSlideButtonProps> = ({ onSlide, loading, label }) => {
  const [dragging, setDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (info.point.x > (trackRef.current?.offsetWidth || 200) * 0.6) {
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        onSlide();
      }, 200);
    } else {
      setDragging(false);
    }
  };

  return (
    <div className="w-full select-none" ref={trackRef} aria-label={label || "Slide to login"}>
      <motion.div
        className="relative h-14 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center px-2 shadow-lg overflow-hidden group"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 0 32px 8px rgba(168, 85, 247, 0.4), 0 0 16px 4px rgba(168, 85, 247, 0.2)" 
        }}
        style={{ 
          minHeight: 56,
          background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)'
        }}
      >
        {/* Glowing trail background on hover */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: dragging ? 0.5 : 0.2 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 70%), radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 70%)"
          }}
        />
        
        {/* Centered label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-white font-bold uppercase tracking-wider text-sm">
            <AnimatePresence mode="wait">
              {loading || pressed ? (
                <motion.span
                  key="dots"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-block"
                >
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </motion.span>
              ) : (
                <motion.span
                  key="label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>
        
        <motion.div
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0.2}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ scale: dragging ? 0.97 : 1 }}
          className={`relative z-20 flex items-center justify-center w-12 h-12 bg-white/20 rounded-full shadow-lg cursor-pointer transition-transform duration-150 ${completed ? "scale-90" : ""}`}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          tabIndex={0}
          aria-label="Slide to login"
          style={{ 
            minHeight: 44, 
            minWidth: 44,
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
        >
          {loading || pressed ? (
            <motion.svg
              className="animate-spin h-6 w-6 text-white"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </motion.svg>
          ) : (
            <motion.svg
              width="28" height="28" viewBox="0 0 24 24" fill="none"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: dragging ? 90 : 0, 
                scale: dragging ? 1.2 : 1, 
                filter: dragging ? "drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))" : "none" 
              }}
              whileHover={{ rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 1 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlowingSlideButton; 