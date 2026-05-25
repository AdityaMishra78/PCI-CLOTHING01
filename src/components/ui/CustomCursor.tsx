"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trailing spring physics for the spotlight halo
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        'button, a, [role="button"], [data-cursor]'
      );

      hoverElements.forEach((el) => {
        const text = el.getAttribute("data-cursor") || "";

        el.addEventListener("mouseenter", () => {
          setIsHovered(true);
          setCursorText(text);
        });

        el.addEventListener("mouseleave", () => {
          setIsHovered(false);
          setCursorText("");
        });
      });
    };

    // Run listeners on mount and set up observer for dynamic content
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spotlight Halo */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 80 : 36,
          height: isHovered ? 80 : 36,
          border: isHovered ? "1px solid rgba(255, 255, 255, 1)" : "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold tracking-widest text-white uppercase font-sans"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] w-2 h-2 bg-white rounded-full mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};
