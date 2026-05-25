"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("");

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep("SYNCHRONIZING SECURE PAYMENT NODE...");

    setTimeout(() => {
      setCheckoutStep("CONFIRMING BIOMETRIC CLEARANCE...");
      setTimeout(() => {
        setCheckoutStep("ORDER LOGGED IN QUANTUM TRAJECTORY!");
        setTimeout(() => {
          setIsCheckingOut(false);
          setCheckoutStep("");
          clearCart();
          setCartOpen(false);
          alert("Order established successfully! Trajectory logged in Performance Lab.");
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isCheckingOut && setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Sliding Cart Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full flex-col border-l border-white/5 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-2xl sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-widest text-white">Cart Chamber</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Secure Quantum Locker
                </span>
              </div>
              <button
                onClick={() => !isCheckingOut && setCartOpen(false)}
                className="rounded-full border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                disabled={isCheckingOut}
              >
                <X size={16} />
              </button>
            </div>

            {/* Checkout loading screen */}
            {isCheckingOut ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center font-mono">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-white animate-spin" />
                  <Activity size={24} className="text-white animate-pulse" />
                </div>
                <div className="text-xs uppercase tracking-widest text-white animate-pulse">
                  {checkoutStep}
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto py-4 pr-1 scrollbar-thin">
                  {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                        Chamber Empty
                      </span>
                      <p className="max-w-xs text-[10px] text-zinc-600 uppercase tracking-wider">
                        Load futuristic sportswear coordinates to activate.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                          className="relative flex gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-3.5"
                        >
                          {/* Mini CSS glowing product avatar */}
                          <div
                            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/5 shadow-inner"
                            style={{
                              background: `radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 80%), ${
                                item.product.colors.find((c) => c.name === item.selectedColor)
                                  ?.hex || "#000"
                              }`,
                            }}
                          >
                            <span className="font-mono text-[9px] font-bold text-white/50 uppercase">
                              PCI
                            </span>
                          </div>

                          {/* Info */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-bold text-white line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <div className="mt-1 flex flex-wrap gap-2 text-[9px] font-mono text-zinc-500 uppercase">
                                  <span>SZ: {item.selectedSize}</span>
                                  <span>•</span>
                                  <span>CL: {item.selectedColor}</span>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-white">
                                ${item.product.price}
                              </span>
                            </div>

                            {/* Quantity Controls & Remove */}
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-black/40 px-2.5 py-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      item.quantity - 1
                                    )
                                  }
                                  className="text-zinc-500 transition-colors hover:text-white"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="font-mono text-[10px] font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      item.quantity + 1
                                    )
                                  }
                                  className="text-zinc-500 transition-colors hover:text-white"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  removeFromCart(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                                className="text-zinc-500 transition-colors hover:text-rose-500"
                                aria-label="Remove item"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer calculations */}
                {cartItems.length > 0 && (
                  <div className="border-t border-white/5 pt-4">
                    <div className="flex flex-col gap-2 font-mono text-[10px] text-zinc-400 uppercase">
                      <div className="flex justify-between">
                        <span>Locker Subtotal</span>
                        <span className="text-white">${totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Space Clearance Tax</span>
                        <span className="text-white">$0.00 (EXEMPT)</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-2 text-xs font-bold text-white">
                        <span>Total Charge</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="mt-6 flex w-full items-center justify-between rounded-full bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-200"
                      data-cursor="checkout"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck size={14} />
                        Execute Checkout
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
