"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  BarChart2, 
  Plus, 
  Mail, 
  User, 
  DollarSign 
} from "lucide-react";

export default function CreatorNavbar() {
  const path = usePathname();

  const isActive = (href: string) => path === href || path.startsWith(href);

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/creator",
      badge: null
    },
    {
      icon: BarChart2,
      label: "Analytics",
      path: "/creator/analytics",
      badge: null
    },
    {
      icon: Mail,
      label: "Inbox",
      path: "/creator/inbox",
      badge: "3"
    },
    {
      icon: User,
      label: "Profile",
      path: "/creator/profile",
      badge: null
    },
    {
      icon: DollarSign,
      label: "Revenue",
      path: "/creator/referrals",
      badge: null
    }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.1
      }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#ffffff0a] border-t border-white/10 shadow-2xl"
    >
      {/* Main Navigation Container */}
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:px-10 relative">
        
        {/* Left side tabs */}
        <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
          {navItems.slice(0, 2).map((item, index) => (
            <NavItem 
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              badge={item.badge}
              index={index}
            />
          ))}
        </div>

        {/* Center spacer for button */}
        <div className="flex-1 flex justify-center relative">
          {/* Floating Create Drop Button */}
          <CreateDropButton />
        </div>

        {/* Right side tabs */}
        <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
          {navItems.slice(2).map((item, index) => (
            <NavItem 
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              badge={item.badge}
              index={index + 2}
            />
          ))}
        </div>
      </div>

      {/* Bottom padding for floating button */}
      <div className="h-6" />
    </motion.div>
  );
}

// Create Drop Button Component with Ripple Effect
function CreateDropButton() {
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.3
      }}
      className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="relative">
        {/* Ripple Layer */}
        {ripple && (
          <span className="absolute inset-0 animate-ripple z-0 rounded-full bg-purple-600/30"></span>
        )}

        <Link href="/creator/upload" className="relative z-10">
          <button
            onClick={handleClick}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 shadow-[0_0_25px_rgba(88,28,135,0.6)] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 border-2 border-black/20"
          >
            <Plus className="text-white w-6 h-6" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// Individual Navigation Item Component
function NavItem({ 
  icon: Icon, 
  label, 
  path, 
  isActive, 
  badge, 
  index 
}: {
  icon: any;
  label: string;
  path: string;
  isActive: boolean;
  badge: string | null;
  index: number;
}) {
  return (
    <Link href={path}>
              <motion.div
          className={`flex flex-col items-center text-[10px] sm:text-xs relative transition-all duration-300 ease-in-out group cursor-pointer ${
            isActive ? "text-purple-400" : "text-white/70"
          }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ 
          scale: 1.05,
          color: isActive ? "#f97316" : "#ffffff"
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon Container */}
        <motion.div
          className={`relative p-2 rounded-full transition-all duration-300 ${
            isActive 
              ? "bg-purple-600/20 ring-2 ring-purple-400/40" 
              : "bg-transparent"
          }`}
          whileHover={{
            backgroundColor: isActive ? "rgba(251, 146, 60, 0.3)" : "rgba(255, 255, 255, 0.1)"
          }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          
          {/* Active indicator glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-600/20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>

        {/* Label */}
        <span className="mt-1 font-medium transition-all duration-300 hidden sm:block">
          {label}
        </span>

        {/* Badge */}
        {badge && (
          <motion.span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            {badge}
          </motion.span>
        )}

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-purple-700/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
} 