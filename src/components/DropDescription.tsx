import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropDescriptionProps {
  description: string;
}

export default function DropDescription({ description }: DropDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 120;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto my-4 max-w-lg w-full bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-[#8A00D4]"
              style={{ boxShadow: "0 0 24px 2px #8A00D4, 0 0 8px 1px #581c87" }}
    >
      <div className="text-white text-base font-medium">
        {isLong && !expanded ? description.slice(0, 120) + "..." : description}
      </div>
      {isLong && (
        <button
          className="mt-2 text-xs text-[#581c87] underline font-bold"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </motion.div>
  );
} 