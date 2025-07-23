"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center px-4 py-3 bg-background border-b border-surface">
      <span className="font-black text-base tracking-wider peepz-logo" style={{ letterSpacing: '0.2px', lineHeight: 1.4, color: '#ffa31a' }}>PEEPZ</span>
    </header>
  );
} 