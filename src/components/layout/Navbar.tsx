"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", path: "/collections" },
    { name: "AI Stylist", path: "/dashboard?tab=ai-stylist" },
    { name: "Performance Lab", path: "/dashboard" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-40 px-4 py-4 transition-all duration-500 md:px-8 ${
          isScrolled ? "top-2" : "top-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/5 px-6 py-3 transition-all duration-500 backdrop-blur-xl ${
            isScrolled
              ? "bg-zinc-950/60 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Glowing PCI Logo */}
          <Link href="/" className="relative flex items-center gap-2 group">
            <motion.span 
              className="text-2xl font-black tracking-widest text-white font-sans"
              whileHover={{ scale: 1.05 }}
            >
              PCI
            </motion.span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 shadow-[0_0_10px_#fff]" />
            <div className="absolute -inset-2 rounded-full bg-white/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="relative text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors duration-300 hover:text-white"
                  data-cursor="magnetic"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white shadow-[0_0_8px_#fff]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* AI Assistant shortcut */}
            <Link
              href="/dashboard?tab=ai-stylist"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.05)] md:flex"
              data-cursor="spark"
            >
              <Sparkles size={11} className="animate-pulse" />
              AI Stylist
            </Link>

            {/* User Dashboard icon */}
            <Link
              href="/dashboard"
              className="relative p-2 text-zinc-400 transition-colors duration-300 hover:text-white"
              aria-label="User Dashboard"
              data-cursor="magnetic"
            >
              <User size={18} />
            </Link>

            {/* Shopping Bag Button with Glowing Count Badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-zinc-400 transition-colors duration-300 hover:text-white"
              aria-label="Open Shopping Cart"
              data-cursor="bag"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-black text-black shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 transition-colors duration-300 hover:text-white md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-black/90 p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  key={link.name}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-2xl font-bold tracking-widest text-zinc-400 hover:text-white"
                  >
                    {link.name}
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 border-t border-white/10 pt-8"
            >
              <Link
                href="/dashboard?tab=ai-stylist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-4 text-xs font-bold uppercase tracking-widest text-white"
              >
                <Sparkles size={14} />
                Access AI Stylist
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
