"use client";
import React from "react";
import { motion } from "framer-motion";

interface StatsWidgetProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'orange' | 'purple' | 'green' | 'blue';
}

export default function StatsWidget({ 
  label, 
  value, 
  icon,
  trend,
  trendValue,
  color = 'orange'
}: StatsWidgetProps) {
  const getColorClasses = () => {
    switch (color) {
          case 'orange': return 'text-accent-orange';
    case 'purple': return 'text-accent-purple';
      case 'green': return 'text-green-400';
      case 'blue': return 'text-blue-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'neutral': return '→';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'neutral': return 'text-gray-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="rounded-xl bg-surface p-4 flex flex-col items-center shadow-md mb-2 border border-gray-700 hover:border-gray-600 transition-all duration-300"
    >
      {/* Icon */}
      {icon && (
        <motion.div 
          className="text-2xl mb-2"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Value */}
      <motion.div 
        className={`text-2xl font-medium text-premium mb-1 ${getColorClasses()}`}
        whileHover={{ scale: 1.1 }}
        style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="text-xs text-secondary capitalize text-center mb-2" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>
        {label}
      </div>

      {/* Trend */}
      {trend && trendValue && (
        <motion.div 
          className={`flex items-center text-xs font-bold ${getTrendColor()}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="mr-1">{getTrendIcon()}</span>
          <span>{trendValue}</span>
        </motion.div>
      )}
    </motion.div>
  );
} 