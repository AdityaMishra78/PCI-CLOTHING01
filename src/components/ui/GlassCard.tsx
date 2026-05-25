"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  hoverIntensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.1)",
  onClick,
  hoverIntensity = 1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.015, y: -4 } : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Interactive Mouse Hover Spotlight Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(${
              180 * hoverIntensity
            }px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Aurora Corner Light (Static background) */}
      <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-white/[0.01] blur-[100px] pointer-events-none" />

      {/* Main Content container */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
