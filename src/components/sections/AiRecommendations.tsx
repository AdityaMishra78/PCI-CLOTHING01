"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldAlert, Cpu, Heart, Check, Plus } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { products, Product } from "@/utils/products";
import { useCart } from "@/context/CartContext";

export const AiRecommendations: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedGoal, setSelectedGoal] = useState("endurance");
  const [selectedEnv, setSelectedEnv] = useState("zero-g");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLabel, setScanLabel] = useState("");
  const [recommendedOutfit, setRecommendedOutfit] = useState<{
    top: Product;
    bottom: Product;
    footwear?: Product;
    description: string;
    stats: { name: string; val: number }[];
  } | null>(null);

  const goals = [
    { id: "endurance", label: "Deep Space Endurance", icon: Heart },
    { id: "agility", label: "Quantum Agility", icon: Activity },
    { id: "recovery", label: "Nebula Core Recovery", icon: Cpu },
  ];

  const envs = [
    { id: "zero-g", label: "Void Zero-G" },
    { id: "urban", label: "Urban Sector Grid" },
    { id: "cold", label: "Nebula Frost Front" },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLabel("SCANNING CARDIOVASCULAR FREQUENCY...");

    // Animate scanning progress steps
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate Outfit based on selections
            let top = products[0]; // default aether top
            let bottom = products[2]; // default quantum tights
            let footwear = products[5]; // default runner
            let description = "";
            let stats = [];

            if (selectedGoal === "endurance") {
              top = products[0]; // Aether Top
              bottom = products[2]; // Quantum Tights
              description = "Engineered for long-duration compression and thermal homeostasis in low atmospheric loads.";
              stats = [
                { name: "Thermo-Regulation", val: 98 },
                { name: "Lactic Dispersion", val: 94 },
                { name: "Aerodynamics", val: 82 },
              ];
            } else if (selectedGoal === "agility") {
              top = products[4]; // Vented Anorak
              bottom = products[3]; // Chronos Joggers
              description = "High mobility joints combined with dynamic heat-release vents for fast kinetic maneuvering.";
              stats = [
                { name: "Thermo-Regulation", val: 86 },
                { name: "Lactic Dispersion", val: 78 },
                { name: "Aerodynamics", val: 96 },
              ];
            } else {
              top = products[1]; // Nebula Active Shell
              bottom = products[3]; // Chronos Joggers
              description = "Sustained insulating fabrics and cellular repair compression lining optimized for fast warmups.";
              stats = [
                { name: "Thermo-Regulation", val: 99 },
                { name: "Lactic Dispersion", val: 85 },
                { name: "Aerodynamics", val: 70 },
              ];
            }

            setRecommendedOutfit({ top, bottom, footwear, description, stats });
            setIsScanning(false);
          }, 600);
          return 100;
        }

        const next = prev + 5;
        if (next === 30) setScanLabel("DECRPYTING LIGAMENT VELOCITY...");
        if (next === 65) setScanLabel("ALIGNED THERMO-REGULATORY FREQUENCY...");
        if (next === 85) setScanLabel("STRUCTURING HOLOGRAPHIC FABRIC MATRIX...");
        return next;
      });
    }, 80);
  };

  return (
    <section id="ai-stylist" className="py-20 relative overflow-hidden bg-black/20">
      {/* Aurora glow background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-3 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-inner">
            <Sparkles size={11} className="text-white" />
            AI DIAGNOSTIC CONSOLE
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white md:text-3xl font-sans">
            AI Biometric Styling
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-zinc-500 uppercase tracking-widest">
            Calibrate sportswear fabric matrix boundaries relative to biological trajectories.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Controls Console */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <GlassCard className="flex flex-col gap-6" glowColor="rgba(255,255,255,0.06)">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-white">Biometric Settings</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Step 01: Profile Alignment</span>
              </div>

              {/* Goal Selector */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Target Trajectory Goal
                </label>
                <div className="flex flex-col gap-2">
                  {goals.map((g) => {
                    const Icon = g.icon;
                    const isActive = selectedGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGoal(g.id)}
                        disabled={isScanning}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                          isActive
                            ? "border-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            : "border-white/5 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={12} className={isActive ? "text-black" : "text-zinc-500"} />
                          {g.label}
                        </span>
                        {isActive && <Check size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Environment Selector */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Atmospheric Core Sector
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {envs.map((e) => {
                    const isActive = selectedEnv === e.id;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setSelectedEnv(e.id)}
                        disabled={isScanning}
                        className={`rounded-lg border py-2.5 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                          isActive
                            ? "border-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                            : "border-white/5 bg-black/40 text-zinc-500 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {e.label.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Run Scan */}
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="mt-4 relative flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-4 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Activity size={14} className={isScanning ? "animate-pulse" : ""} />
                Synthesize Coordinates
              </button>
            </GlassCard>
          </div>

          {/* Results Screen */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {isScanning ? (
                /* Scanning state screen */
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-950/40 p-8 text-center font-mono"
                >
                  {/* Cyber circle matrix scanner */}
                  <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-white/5" />
                    <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-spin" />
                    <div className="absolute inset-4 rounded-full border border-white/40 animate-pulse" />
                    <Activity size={32} className="text-white animate-pulse" />
                  </div>
                  <span className="text-xs text-white uppercase tracking-widest animate-pulse">
                    {scanLabel}
                  </span>
                  <div className="mt-4 h-[2px] w-48 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <span className="mt-2 text-[10px] text-zinc-500">{scanProgress}% SECURE_LOCK</span>
                </motion.div>
              ) : recommendedOutfit ? (
                /* Recommendation Result Display */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <GlassCard className="flex flex-col gap-6 border-white/10" glowColor="rgba(255,255,255,0.08)">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-white">
                          Synthesized Alignment Successful
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          MATCH CODES ESTABLISHED
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        MATCH: 97.4%
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-zinc-400 uppercase tracking-widest">
                      {recommendedOutfit.description}
                    </p>

                    {/* Visual bar diagnostics */}
                    <div className="grid gap-3 border-t border-b border-white/5 py-4 sm:grid-cols-3">
                      {recommendedOutfit.stats.map((s) => (
                        <div key={s.name} className="flex flex-col gap-1">
                          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">
                            {s.name}
                          </span>
                          <div className="flex items-center justify-between gap-2">
                            <div className="h-[3px] flex-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.val}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-white shadow-[0_0_8px_#fff]"
                              />
                            </div>
                            <span className="font-mono text-[9px] text-white font-bold">{s.val}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Outfit Coordinate Grid */}
                    <div className="flex flex-col gap-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                        Recommended Coordinates
                      </span>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Top Product */}
                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded-lg border border-white/5"
                              style={{
                                background: `radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%), ${recommendedOutfit.top.colors[0].hex}`,
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-white uppercase line-clamp-1">
                                {recommendedOutfit.top.name}
                              </span>
                              <span className="text-[8px] font-mono text-zinc-500">
                                ${recommendedOutfit.top.price}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              addToCart(
                                recommendedOutfit.top,
                                recommendedOutfit.top.sizes[1],
                                recommendedOutfit.top.colors[0].name
                              )
                            }
                            className="rounded-full border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white hover:text-black hover:border-white"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Bottom Product */}
                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded-lg border border-white/5"
                              style={{
                                background: `radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%), ${recommendedOutfit.bottom.colors[0].hex}`,
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-white uppercase line-clamp-1">
                                {recommendedOutfit.bottom.name}
                              </span>
                              <span className="text-[8px] font-mono text-zinc-500">
                                ${recommendedOutfit.bottom.price}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              addToCart(
                                recommendedOutfit.bottom,
                                recommendedOutfit.bottom.sizes[1],
                                recommendedOutfit.bottom.colors[0].name
                              )
                            }
                            className="rounded-full border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white hover:text-black hover:border-white"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                /* Default empty state */
                <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-950/20 p-8 text-center">
                  <Activity size={24} className="mb-4 text-zinc-700" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    Console Off
                  </span>
                  <p className="mx-auto mt-1 max-w-xs text-[10px] uppercase tracking-widest text-zinc-600">
                    Input Biometric Settings and trigger synthesis mapping to activate console coordinate feed.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AiRecommendations;
