"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, Activity, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#050507] py-16 text-zinc-500 overflow-hidden">
      {/* Decorative background grid and spotlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.015),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand & Technical Pitch */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-black tracking-widest text-white">PCI</span>
            <p className="max-w-xs text-xs leading-relaxed text-zinc-400">
              Forging the interface of human kinetics and space-grade fabric tech. Designed to sustain, accelerate, and protect the modern interstellar athlete.
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40">
              <span className="flex items-center gap-1">
                <Activity size={10} className="text-emerald-500 animate-pulse" />
                GRID SYNC: ACTIVE
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className="text-2xs font-bold uppercase tracking-widest text-white">System Directories</span>
            <Link href="/collections" className="text-xs transition-colors duration-300 hover:text-white">Aether Collections</Link>
            <Link href="/collections" className="text-xs transition-colors duration-300 hover:text-white">Quantum Compression</Link>
            <Link href="/dashboard" className="text-xs transition-colors duration-300 hover:text-white">Performance Lab</Link>
            <Link href="/dashboard?tab=ai-stylist" className="text-xs transition-colors duration-300 hover:text-white">AI Diagnostic Center</Link>
          </div>

          {/* Luxury Specifications */}
          <div className="flex flex-col gap-3">
            <span className="text-2xs font-bold uppercase tracking-widest text-white">Material Specs</span>
            <span className="text-xs text-zinc-400">Superhydrophobic Nano-pores</span>
            <span className="text-xs text-zinc-400">Phosphorescent Aurora Fibers</span>
            <span className="text-xs text-zinc-400">Carbon-Fiber Kinetic Trajectories</span>
            <span className="text-xs text-zinc-400">Ultrasonic Seamless Bondings</span>
          </div>

          {/* System Terminal Console */}
          <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-4 font-mono text-[10px] text-zinc-400 shadow-2xl">
            <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2 text-[8px] uppercase tracking-widest text-white/30">
              <span className="flex items-center gap-1">
                <Terminal size={10} />
                PCI SYSTEM TERMINAL
              </span>
              <span>v9.2.4</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div>&gt; HOST: pci-lab-central</div>
              <div>&gt; LATENCY: 0.04 ms (FIBER_SYNC)</div>
              <div>&gt; ENCRYPTION: QUANTUM_SSL</div>
              <div className="flex items-center gap-1 text-emerald-400">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                &gt; CONNECTION: SECURE_ESTABLISHED
              </div>
            </div>
          </div>
        </div>

        {/* Base Copyright and Technical Indicators */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] font-mono uppercase tracking-widest md:flex-row">
          <span>© {currentYear} PCI SYSTEM INC. ALL RIGHTS SECURED.</span>
          <span className="flex items-center gap-4 text-zinc-600">
            <span>SECURE SHIELD SECURED</span>
            <span>|</span>
            <span>OS SYSTEM: HIGH-FPS_ACTIVE</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
