import React from "react";
import { motion } from "framer-motion";

interface DropMediaViewerProps {
  type: "image" | "video" | "audio";
  mediaUrl: string;
}

export default function DropMediaViewer({ type, mediaUrl }: DropMediaViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full flex justify-center items-center my-4"
    >
      {type === "image" && (
        <img
          src={mediaUrl}
          alt="Drop content"
          className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-[#8A00D4] object-cover"
          style={{ aspectRatio: "4/3" }}
        />
      )}
      {type === "video" && (
        <video
          src={mediaUrl}
          controls
          className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-[#8A00D4] object-cover bg-black"
          style={{ aspectRatio: "16/9" }}
        />
      )}
      {type === "audio" && (
        <div className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-[#8A00D4] bg-black flex flex-col items-center p-6">
          <audio src={mediaUrl} controls className="w-full" />
          {/* Placeholder for waveform animation */}
          <div className="mt-2 w-full h-6 bg-gradient-to-r from-[#8A00D4] to-[#FF9900] rounded-full opacity-40 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
} 