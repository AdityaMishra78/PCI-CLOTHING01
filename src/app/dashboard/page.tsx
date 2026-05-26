"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Heart, User, Map, ClipboardList, Target, Compass } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpaceScene } from "@/components/canvas/SpaceScene";
import { AiRecommendations } from "@/components/sections/AiRecommendations";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function UserDashboardContent() {
  useSmoothScroll();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("biometrics");

  // Read URL query tab parameter on load/change
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "ai-stylist" || tab === "biometrics" || tab === "trajectory") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Mock biometric signals data
  const biometrics = [
    { name: "Daily Fitness Index", val: "98.4%", icon: Target, desc: "Excellent workout profile" },
    { name: "Aerobic Capacity (VO2 Max)", val: "64.2 ml/kg", icon: Activity, desc: "High cardiovascular capacity" },
    { name: "Apparel Battery Sync", val: "99.8%", icon: ShieldCheck, desc: "Garment sensor fully synced" },
    { name: "Active Heart Rate", val: "72 BPM", icon: Heart, desc: "Calm baseline recovery" },
  ];

  // Neon Trajectory steps
  const orderSteps = [
    { title: "Order Received", desc: "Your order details have been successfully processed.", status: "complete" },
    { title: "Tailoring & Assembly", desc: "Precision sewing and fabric bonding is complete.", status: "complete" },
    { title: "Quality Check", desc: "Passing final visual inspection and premium stamp.", status: "active" },
    { title: "Shipped Out", desc: "Handed over to carrier for premium fast delivery.", status: "pending" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-white selection:text-black">
      {/* 3D Star scene */}
      <SpaceScene cameraZ={8} />

      <CustomCursor />
      <Navbar />
      <CartDrawer />

      <main className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Header Title */}
          <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-400">
                <User size={10} />
                ATHLETE DASHBOARD
              </div>
              <h1 className="text-3xl font-black uppercase tracking-widest text-white md:text-4xl font-sans">
                Performance Lab
              </h1>
              <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500 font-medium">
                Review your daily fitness metrics and track active orders.
              </p>
            </div>

            {/* User profile brief badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/40 p-4">
              <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-mono text-xs text-white">
                P-1
              </div>
              <div className="flex flex-col font-mono text-[9px] uppercase">
                <span className="text-white font-bold">USER_ATHLETE_01</span>
                <span className="text-emerald-400">STATUS: ACTIVE MEMBERSHIP</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-12 flex flex-wrap gap-2.5 border-b border-white/5 pb-6">
            <button
              onClick={() => setActiveTab("biometrics")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "biometrics"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "border border-white/5 bg-zinc-950/40 text-zinc-500 hover:border-white/15 hover:text-white"
              }`}
            >
              <Activity size={12} />
              My Fitness HUD
            </button>
            <button
              onClick={() => setActiveTab("ai-stylist")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "ai-stylist"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "border border-white/5 bg-zinc-950/40 text-zinc-500 hover:border-white/15 hover:text-white"
              }`}
            >
              <Sparkles size={12} />
              AI Style Recommendations
            </button>
            <button
              onClick={() => setActiveTab("trajectory")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "trajectory"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "border border-white/5 bg-zinc-950/40 text-zinc-500 hover:border-white/15 hover:text-white"
              }`}
            >
              <Map size={12} />
              Order Tracker
            </button>
          </div>

          {/* Active Tab Screen Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "biometrics" && (
                <motion.div
                  key="biometrics"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {biometrics.map((bio, index) => {
                    const Icon = bio.icon;
                    return (
                      <GlassCard key={bio.name} glowColor="rgba(255,255,255,0.06)">
                        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">
                            Signal {index + 1}
                          </span>
                          <Icon size={14} className="text-zinc-400" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white font-mono">
                          {bio.val}
                        </span>
                        <h3 className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white">
                          {bio.name}
                        </h3>
                        <p className="mt-1 text-[8px] font-mono uppercase text-emerald-400/80">
                          {bio.desc}
                        </p>
                      </GlassCard>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === "ai-stylist" && (
                <motion.div
                  key="ai-stylist"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <AiRecommendations />
                </motion.div>
              )}

              {activeTab === "trajectory" && (
                <motion.div
                  key="trajectory"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto max-w-2xl"
                >
                  <GlassCard glowColor="rgba(255,255,255,0.06)">
                    <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex flex-col font-mono text-[9px] uppercase">
                         <span className="text-white font-bold">Delivery Status Feed</span>
                         <span className="text-zinc-500">ORDER ID: #PCI-2950-A</span>
                      </div>
                      <span className="flex items-center gap-1.5 rounded bg-emerald-500/10 px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                        <Compass size={10} className="animate-spin" />
                         IN TRANSIT: EXPEDITED
                      </span>
                    </div>

                    {/* Stepped vertical neon tracker */}
                    <div className="relative pl-6 flex flex-col gap-8">
                      {/* Central vertical track line */}
                      <div className="absolute left-[3px] bottom-6 top-1 w-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "66%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="w-full bg-white shadow-[0_0_8px_#fff]"
                        />
                      </div>

                      {orderSteps.map((step, idx) => {
                        const isComplete = step.status === "complete";
                        const isActive = step.status === "active";
                        return (
                          <div key={step.title} className="relative flex gap-4">
                            {/* Bullet state indicator */}
                            <div className="absolute -left-6 top-1 flex h-2 w-2 items-center justify-center rounded-full">
                              <motion.div
                                animate={isActive ? { scale: [1, 1.6, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`h-2 w-2 rounded-full ${
                                  isComplete
                                    ? "bg-white shadow-[0_0_6px_#fff]"
                                    : isActive
                                    ? "bg-white ring-2 ring-white/30 animate-pulse shadow-[0_0_10px_#fff]"
                                    : "bg-zinc-800"
                                }`}
                              />
                            </div>

                            <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase">
                              <h3
                                className={`font-bold tracking-wider ${
                                  isComplete || isActive ? "text-white" : "text-zinc-600"
                                }`}
                              >
                                {step.title}
                              </h3>
                              <p className="text-[8px] text-zinc-500 leading-relaxed max-w-sm">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#030305] text-white font-mono text-[9px] uppercase tracking-widest animate-pulse">
        Calibrating Portal...
      </div>
    }>
      <UserDashboardContent />
    </Suspense>
  );
}
