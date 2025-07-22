import React, { useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = [
  { emoji: "🔥", key: "fire" },
  { emoji: "❤️", key: "heart" },
  { emoji: "👁️", key: "eye" },
];

interface DropEngagementProps {
  dropId: string;
}

export default function DropEngagement({ dropId }: DropEngagementProps) {
  const [reactions, setReactions] = useState(() => {
    const saved = localStorage.getItem(`reactions_${dropId}`);
    return saved ? JSON.parse(saved) : { fire: 0, heart: 0, eye: 0 };
  });
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);

  const handleReact = (key: string) => {
    const updated = { ...reactions, [key]: reactions[key] + 1 };
    setReactions(updated);
    localStorage.setItem(`reactions_${dropId}`, JSON.stringify(updated));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto my-4 max-w-lg w-full bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-[#FF9900] flex flex-col gap-4"
      style={{ boxShadow: "0 0 16px 2px #FF9900, 0 0 8px 1px #8A00D4" }}
    >
      {/* Emoji Reactions */}
      <div className="flex justify-center gap-6 mb-2">
        {EMOJIS.map(({ emoji, key }) => (
          <button
            key={key}
            className="text-2xl md:text-3xl p-2 rounded-full bg-black/30 border-2 border-transparent hover:border-[#FF9900] shadow hover:scale-110 transition-all"
            onClick={() => handleReact(key)}
          >
            <span>{emoji}</span>
            <span className="ml-1 text-sm text-white font-bold">{reactions[key]}</span>
          </button>
        ))}
      </div>
      {/* Comment Field */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="flex-1 rounded-full px-4 py-2 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-[#FF9900]"
        />
        <button
          className="bg-[#FF9900] text-black font-bold px-4 py-2 rounded-full hover:bg-orange-400 transition"
          onClick={() => setComment("")}
        >
          Send
        </button>
      </div>
      {/* Copy Link */}
      <button
        className="mt-2 text-xs text-[#FF9900] underline font-bold self-end"
        onClick={handleCopy}
      >
        {copied ? "Link Copied!" : "Copy Link"}
      </button>
    </motion.div>
  );
} 