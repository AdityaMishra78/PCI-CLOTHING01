"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { products, Product } from "@/utils/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";

export const ProductShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 3); // Take top 3 products for main page preview

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-black/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
              Lab Releases
            </span>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-widest text-white md:text-3xl font-sans">
              Flagship Gear
            </h2>
          </div>
          <Link
            href="/collections"
            className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
          >
            Access All Series
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* 3D Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              key={p.id}
            >
              <GlassCard className="group relative flex h-full flex-col justify-between" glowColor="rgba(255,255,255,0.06)">
                {/* Image / Simulated 3D Renders Panel */}
                <Link href={`/product/${p.id}`} className="relative block overflow-hidden rounded-xl bg-black/60 p-6 border border-white/5 shadow-inner">
                  <div
                    className="mx-auto flex h-48 w-48 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%), ${p.colors[0].hex}`,
                    }}
                  >
                    <span className="font-mono text-xs font-black text-white/40 uppercase tracking-widest">
                      {p.id.split("-")[1].toUpperCase()}
                    </span>
                  </div>

                  {/* Diagnostic details panel overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-black shadow-lg">
                      <Eye size={12} />
                      3D Configurator
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">
                      {p.collection}
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase">
                      ${p.price}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-black uppercase tracking-widest text-white">
                    {p.name}
                  </h3>

                  <p className="mt-3 text-[10px] leading-relaxed text-zinc-400 line-clamp-2 uppercase tracking-wide">
                    {p.description}
                  </p>

                  {/* Specifications snippet */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                    {p.specs.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="rounded bg-white/5 px-2 py-1 text-[8px] font-mono uppercase tracking-wider text-zinc-500"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={`/product/${p.id}`}
                      className="flex-1 rounded-full border border-white/10 py-3 text-center text-[9px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                    >
                      Inspect
                    </Link>
                    <button
                      onClick={() => addToCart(p, p.sizes[1], p.colors[0].name)}
                      className="rounded-full bg-white p-3 text-black transition-colors duration-300 hover:bg-zinc-200"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductShowcase;
