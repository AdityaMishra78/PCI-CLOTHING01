"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Heart, Eye } from "lucide-react";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pointer-events-none overflow-hidden bg-black/10">
      {/* Dynamic radial shadow overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_20%,rgba(5,5,7,0.7)_80%)]" />

      {/* Floating System HUD (Outer metrics to make it look like a cockpit or visor overlay) */}
      <div className="absolute inset-x-6 top-28 z-10 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-zinc-500 hidden md:flex">
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5">
            <Heart size={10} className="text-zinc-600 animate-pulse" />
            HEART_SYNC: 84 BPM
          </span>
          <span>ATMOSPHERE: NEBULA-DENSE</span>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <span>COORDINATES: 48° 52' N | 2° 21' E</span>
          <span className="text-white/40">CALIBRATING APPAREL SHELL...</span>
        </div>
      </div>

      {/* Main Overlay Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-8 pointer-events-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Glowing Pill Release Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-inner backdrop-blur-md"
          >
            <Sparkles size={11} className="text-white" />
            PCI LABS INITIALIZATION COMPLETE
          </motion.div>

          {/* Huge Brand Headline with custom HSL glowing accents */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl font-sans"
          >
            NEXT-GEN <br />
            <span className="bg-gradient-to-r from-zinc-300 via-white to-zinc-500 bg-clip-text text-transparent font-sans">
              ACTIVEWEAR
            </span>
          </motion.h1>

          {/* Bullet Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-md text-xs leading-relaxed text-zinc-500 uppercase tracking-widest sm:max-w-lg"
          >
            Forging space-tech garments engineered with dynamic thermal matrices and zonal biometrics compression. Designed for the athlete of the future.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/collections"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4.5 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
              data-cursor="explore"
            >
              Access Collections
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/dashboard?tab=ai-stylist"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4.5 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/25"
              data-cursor="spark"
            >
              <Eye size={13} />
              AI Diagnostics
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating telemetry widget at bottom right */}
      <div className="absolute bottom-12 right-8 z-10 rounded-xl border border-white/5 bg-zinc-950/40 p-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden lg:block">
        <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2 text-white">
          <span className="flex items-center gap-1">
            <Shield size={10} className="text-zinc-400" />
            VISOR SHELL SYSTEM
          </span>
          <span className="text-[7px]">GRID SYNC</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between gap-8">
            <span>Core Compression</span>
            <span className="text-white">Active (Zonal)</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>Thermal Insulation</span>
            <span className="text-white">Optimized (L1)</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>Zero-G Stabilization</span>
            <span className="text-white">Standby</span>
          </div>
        </div>
      </div>

      {/* Scroll Down mouse animation at bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[8px] font-mono uppercase tracking-widest text-zinc-500 hidden sm:flex">
        <span>Scroll to Calibrate</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-5 w-3 rounded-full border border-zinc-700 flex justify-center p-1"
        >
          <div className="h-1 w-1 rounded-full bg-white" />
        </motion.div>
      </div>
    </div>
  );
};
export default Hero;
