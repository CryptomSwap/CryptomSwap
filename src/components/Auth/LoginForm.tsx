import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoleToggle from "./RoleToggle";
import GlowingSlideButton from "../Shared/GlowingSlideButton";

interface LoginFormProps {
  onLogin: (email: string, password: string, role: "fan" | "creator") => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"fan" | "creator">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("peepz_role") as "fan" | "creator") || "fan";
    }
    return "fan";
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [focusField, setFocusField] = useState<"email" | "password" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    localStorage.setItem("peepz_role", role);
  }, [role]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError(null);
    await onLogin(email, password, role);
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative w-full max-w-sm mx-auto px-4 py-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg flex flex-col gap-6 min-h-[400px] ${shake ? "animate-shake" : ""}`}
      aria-label="Login form"
      style={{ minHeight: '400px' }}
    >
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <motion.div
          className="relative"
          animate={focusField === "email" ? { scale: 1.03 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M4 4h16v16H4z"/><path stroke="#fff" strokeWidth="2" d="M4 4l8 8 8-8"/></svg>
          </span>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border shadow-inner transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 ${focusField === "email" ? "ring-2" : ""} ${emailError || error ? "border-red-500 ring-red-500" : focusField === "email" ? "ring-[#FF9900] border-[#8A00D4]" : "border-white/20"}`}
            placeholder="you@email.com"
            value={email}
            onChange={handleEmailChange}
            aria-label="Email address"
            aria-invalid={!!emailError}
            aria-describedby="email-error"
            required
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField(null)}
            style={{ minHeight: 44 }}
          />
        </motion.div>
        {emailError && <span id="email-error" className="text-red-500 text-xs mt-1">{emailError}</span>}
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="password" className="sr-only">Password</label>
        <motion.div
          className="relative"
          animate={focusField === "password" ? { scale: 1.03 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path stroke="#fff" strokeWidth="2" d="M8 12a4 4 0 1 1 8 0v2H8v-2z"/></svg>
          </span>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border shadow-inner transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 ${focusField === "password" ? "ring-2" : ""} ${error ? "border-red-500 ring-red-500" : focusField === "password" ? "ring-[#8A00D4] border-[#FF9900]" : "border-white/20"}`}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="Password"
            required
            onFocus={() => setFocusField("password")}
            onBlur={() => setFocusField(null)}
            style={{ minHeight: 44 }}
          />
        </motion.div>
      </div>
      {/* Centered toggle outside the form submit scope */}
      <div className="flex justify-center w-full mt-4 items-center">
        <RoleToggle role={role} setRole={setRole} />
      </div>
      <div className="mt-6">
        <GlowingSlideButton
          onSlide={() => handleSubmit(new Event("submit") as any)}
          loading={isLoading}
          label="Slide to Login"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold z-10 border border-red-500"
            role="alert"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default LoginForm; 