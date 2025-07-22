"use client";
import React from "react";

const filters = [
  { label: 'Trending', color: 'bg-accent-orange text-black' },
  { label: 'New', color: 'bg-accent-orange text-black' },
];

export default function FilterPills({ selected, onSelect }: { selected: string; onSelect: (label: string) => void }) {
  return (
    <div className="flex gap-2 my-4">
      {filters.map(f => (
        <button
          key={f.label}
          className={`px-4 py-1 rounded-full font-bold text-sm transition-all ${f.color} ${selected === f.label ? 'ring-2 ring-white' : ''}`}
          onClick={() => onSelect(f.label)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
} 