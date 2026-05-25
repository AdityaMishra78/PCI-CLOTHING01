"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpaceScene } from "@/components/canvas/SpaceScene";
import { products, Product } from "@/utils/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function CollectionsPage() {
  useSmoothScroll(); // Butler smooth scroll physics
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All Gear");

  const categories = ["All Gear", "Aether Series", "Nebula Active", "Quantum Elite", "Chronos Street"];

  // Filter products by category
  const filteredProducts = activeCategory === "All Gear"
    ? products
    : products.filter((p) => p.collection === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-white selection:text-black">
      {/* Dynamic star field background */}
      <SpaceScene cameraZ={7} />

      <CustomCursor />
      <Navbar />
      <CartDrawer />

      <main className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Header Title section */}
          <div className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-400">
                <SlidersHorizontal size={10} />
                PCI CATEGORY FILTERS
              </div>
              <h1 className="text-3xl font-black uppercase tracking-widest text-white md:text-4xl font-sans">
                Laboratory Inventory
              </h1>
              <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500 font-medium">
                Calibrated sportswear gears classified by kinetic trajectories.
              </p>
            </div>

            {/* Total items stats counter */}
            <div className="rounded-lg border border-white/5 bg-zinc-950/40 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Active Coordinates: <span className="text-white font-bold">{filteredProducts.length}</span>
            </div>
          </div>

          {/* Filtering Navigation capsule */}
          <div className="mb-12 flex flex-wrap gap-2.5 border-b border-white/5 pb-6">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-full px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "border border-white/5 bg-zinc-950/40 text-zinc-500 hover:border-white/15 hover:text-white"
                  }`}
                  data-cursor="filter"
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid list container with Framer Motion layout shift animations */}
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  key={p.id}
                >
                  <GlassCard className="group flex h-full flex-col justify-between" glowColor="rgba(255,255,255,0.06)">
                    {/* Visual Renders Preview overlay linking to configuration details */}
                    <Link
                      href={`/product/${p.id}`}
                      className="relative block overflow-hidden rounded-xl bg-black/60 p-6 border border-white/5 shadow-inner"
                      data-cursor="magnetic"
                    >
                      <div
                        className="mx-auto flex h-48 w-48 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105"
                        style={{
                          background: `radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%), ${p.colors[0].hex}`,
                        }}
                      >
                        <span className="font-mono text-2xs font-bold text-white/30 uppercase tracking-widest">
                          {p.id.toUpperCase()}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-black shadow-lg">
                          <Eye size={12} />
                          Configure 3D
                        </span>
                      </div>
                    </Link>

                    {/* Details content */}
                    <div className="mt-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-zinc-500">
                          <span>{p.collection}</span>
                          <span className="text-[10px] font-bold text-white">${p.price}</span>
                        </div>

                        <h3 className="mt-2 text-sm font-black uppercase tracking-widest text-white">
                          {p.name}
                        </h3>

                        <p className="mt-3 text-[10px] leading-relaxed text-zinc-400 uppercase tracking-wide">
                          {p.description}
                        </p>

                        {/* Detail bullets list */}
                        <div className="mt-4 flex flex-col gap-1.5 border-t border-white/5 pt-4">
                          {p.specs.slice(0, 3).map((spec) => (
                            <span
                              key={spec}
                              className="text-[8px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"
                            >
                              <span className="h-1 w-1 rounded-full bg-white/40" />
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA operations row */}
                      <div className="mt-6 flex items-center gap-3">
                        <Link
                          href={`/product/${p.id}`}
                          className="flex-1 rounded-full border border-white/10 py-3 text-center text-[9px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                        >
                          Configurator
                        </Link>
                        <button
                          onClick={() => addToCart(p, p.sizes[1], p.colors[0].name)}
                          className="rounded-full bg-white p-3 text-black transition-colors duration-300 hover:bg-zinc-200"
                          aria-label="Add to cart"
                          data-cursor="bag"
                        >
                          <ShoppingBag size={13} />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
