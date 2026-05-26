"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldAlert, Cpu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { AiRecommendations } from "@/components/sections/AiRecommendations";
import { SpaceScene } from "@/components/canvas/SpaceScene";
import { AthleticModel } from "@/components/canvas/AthleticModel";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function HomePage() {
  useSmoothScroll(); // Initialize Lenis smooth scroll
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState("LOADING PLATFORM...");

  useEffect(() => {
    // Simulated system diagnostic bootloader progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
          return 100;
        }

        const next = prev + 4;
        if (next === 24) setLoadingLabel("CONFIGURING APPAREL LAYOUT...");
        if (next === 52) setLoadingLabel("PREPARING 3D INTERACTIVE MANNEQUIN...");
        if (next === 80) setLoadingLabel("ESTABLISHING CONNECTION. DEPLOYING WEBSITE...");
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-white selection:text-black">
      {/* Cinematic Intro Diagnostic Bootloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm w-full px-6">
              {/* Spinning tech logo */}
              <div className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/5" />
                <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-spin" />
                <span className="text-xs font-black tracking-widest text-white animate-pulse">
                  PCI
                </span>
              </div>

              {/* Progress Text */}
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-[10px] font-bold tracking-widest text-white uppercase animate-pulse">
                  PCI WEBSITE LOADING...
                </span>
                <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                  {loadingLabel}
                </span>
              </div>

              {/* Loading Bar */}
              <div className="h-[2px] w-48 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-white shadow-[0_0_10px_#fff]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <span className="text-[9px] text-zinc-500">{loadingProgress}% COMPLETE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Centerpiece Space Scene */}
      {!isLoading && (
        <SpaceScene cameraZ={5.5}>
          <AthleticModel />
        </SpaceScene>
      )}

      {/* Primary HUD Visual Overlays */}
      <CustomCursor />
      <Navbar />
      <CartDrawer />

      {/* Layout Content Section */}
      <main className="relative z-10">
        <Hero />
        <ProductShowcase />
        <AiRecommendations />
      </main>

      <Footer />
    </div>
  );
}
