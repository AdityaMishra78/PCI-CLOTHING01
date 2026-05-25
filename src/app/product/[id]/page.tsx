"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpaceScene } from "@/components/canvas/SpaceScene";
import { ApparelModel } from "@/components/canvas/ApparelModel";
import { products } from "@/utils/products";
import { useCart } from "@/context/CartContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function ProductDetailsPage() {
  useSmoothScroll();
  const router = useRouter();
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find product by id or fallback to first product
  const product = useMemo(() => {
    return products.find((p) => p.id === id) || products[0];
  }, [id]);

  // Selected State
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || "M");

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor.name);
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-white selection:text-black">
      {/* 3D Space Scene with star particles */}
      <SpaceScene cameraZ={3.2}>
        <ApparelModel productId={product.id} activeColorHex={selectedColor.threeHex} />
      </SpaceScene>

      <CustomCursor />
      <Navbar />
      <CartDrawer />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8">
        {/* Back Link trigger button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
          data-cursor="magnetic"
        >
          <ArrowLeft size={14} />
          Inventory List
        </button>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: 3D Configurator Canvas display */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative h-[480px] w-full rounded-2xl border border-white/5 bg-zinc-950/30 overflow-hidden shadow-inner backdrop-blur-3xs">
              {/* Telemetry info layout overlays */}
              <div className="absolute left-6 top-6 z-10 flex flex-col font-mono text-[8px] uppercase tracking-widest text-zinc-500 gap-1">
                <span>CONFIGURATOR: ACTIVE</span>
                <span>MODEL SHADER: GLOSSY METALLIC</span>
                <span>MESH RENDERS: PROCEDURAL_V2</span>
              </div>

              <div className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-400">
                <RefreshCw size={9} className="animate-spin" />
                Real-Time 3D Engine
              </div>

              {/* Instructions layer overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center font-mono text-[7px] uppercase tracking-widest text-zinc-500">
                Drag to rotate apparel • Scroll to inspect fabric zoom
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Spec configuration details panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard className="flex flex-col gap-6" glowColor="rgba(255,255,255,0.06)">
              {/* Header Title price row */}
              <div>
                <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-zinc-500">
                  <span>{product.collection}</span>
                  <span className="text-sm font-bold text-white uppercase">${product.price}</span>
                </div>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-widest text-white font-sans">
                  {product.name}
                </h1>
              </div>

              <p className="text-xs leading-relaxed text-zinc-400 uppercase tracking-widest">
                {product.description}
              </p>

              {/* Color Configuration selection row */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Select Custom Color: <span className="text-white font-bold font-sans">{selectedColor.name}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`relative h-6 w-6 rounded-full border transition-all duration-300 ${
                          isSelected ? "border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]" : "border-white/10 hover:border-white/30"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={`Select ${c.name}`}
                        data-cursor="color"
                      >
                        {isSelected && (
                          <span className="absolute inset-0.5 rounded-full border border-black/20" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Configuration selection row */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Select Dimension Size: <span className="text-white font-bold font-sans">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`h-10 min-w-10 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                          isSelected
                            ? "border-white bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                            : "border-white/5 bg-black/40 text-zinc-500 hover:border-white/20 hover:text-white"
                        }`}
                        data-cursor="size"
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical high-tech material descriptors grid */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                  Physical Specifications
                </span>
                <div className="flex flex-col gap-2 font-mono text-[9px] text-zinc-400 uppercase">
                  {product.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-zinc-600" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="mt-4 flex w-full items-center justify-between rounded-full bg-white px-6 py-4.5 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-200"
                data-cursor="bag"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={14} />
                  Initiate Order Lock
                </span>
                <span>${product.price}</span>
              </button>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
