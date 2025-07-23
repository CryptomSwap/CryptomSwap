import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoleToggleProps {
  role: "fan" | "creator";
  setRole: (role: "fan" | "creator") => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ role, setRole }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setRole(role === "fan" ? "creator" : "fan");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[200px] h-10 bg-zinc-900/70 rounded-full border border-white/10 shadow-inner flex items-center select-none focus-within:ring-2 focus-within:ring-orange-400"
      aria-label="Select user role"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
    >
      {/* Sliding pill */}
      <motion.div
        layout
        className={`absolute top-1 ${role === "fan" ? "left-1" : "left-[calc(100%-104px)]"} h-8 w-24 rounded-full flex items-center justify-center font-semibold text-white shadow-[0_0_12px_rgba(255,153,0,0.4)] transition-all duration-200 ease-in-out`}
        style={{
          background: "linear-gradient(90deg, #f59e42 0%, #8A00D4 100%)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        whileTap={{ scale: 0.95 }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={role}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="text-xs px-4 py-2 w-full text-center"
          >
            {role.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      {/* Clickable areas */}
      <button
        className="z-10 w-1/2 h-full rounded-l-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        aria-label="Select Fan role"
        tabIndex={-1}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setRole("fan");
        }}
        style={{ background: "transparent" }}
        type="button"
      />
      <button
        className="z-10 w-1/2 h-full rounded-r-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        aria-label="Select Creator role"
        tabIndex={-1}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setRole("creator");
        }}
        style={{ background: "transparent" }}
        type="button"
      />
    </div>
  );
};

export default RoleToggle; 