"use client";

import React from "react";
import { motion } from "framer-motion";

interface TextAnimationProps {
  text: string | React.ReactNode;
  type?: "fadeIn" | "slideUp" | "typewriter" | "staggered" | "highlight";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  staggerChildren?: number;
}

export default function TextAnimation({
  text,
  type = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  staggerChildren = 0.04,
}: TextAnimationProps) {
  // Animation variants
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration, delay } },
    },

    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, transition: { duration, delay } },
    },

    typewriter: {
      initial: { width: "0%" },
      animate: {
        width: "100%",
        transition: {
          duration: typeof text === "string" ? text.length * 0.06 : 0.5,
          delay,
          ease: "linear",
        },
      },
    },

    staggered: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    },

    highlight: {
      initial: { backgroundSize: "0% 100%", backgroundPosition: "0 100%" },
      animate: {
        backgroundSize: "100% 100%",
        transition: { duration: 0.8, delay },
      },
    },
  };

  // For staggered animation of individual characters
  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  // Convert string text to array of characters for staggered animation
  const renderStaggeredText = (text: string) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  // Handle null or undefined text
  if (!text) {
    return null;
  }

  // Render based on animation type
  if (type === "staggered" && typeof text === "string") {
    return (
      <motion.div
        className={className}
        variants={animations.staggered}
        initial="initial"
        whileInView="animate"
        viewport={{ once }}
      >
        {renderStaggeredText(text as string)}
      </motion.div>
    );
  }

  if (type === "typewriter" && typeof text === "string") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          className="inline-block whitespace-nowrap"
          variants={animations.typewriter}
          initial="initial"
          whileInView="animate"
          viewport={{ once }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  if (type === "highlight" && typeof text === "string") {
    return (
      <motion.span
        className={`bg-gradient-to-r from-secondary/20 to-primary/20 bg-no-repeat ${className}`}
        style={{ backgroundPosition: "0 100%" }}
        variants={animations.highlight}
        initial="initial"
        whileInView="animate"
        viewport={{ once }}
      >
        {text}
      </motion.span>
    );
  }

  // Default fade and slide animations
  return (
    <motion.div
      className={className}
      variants={animations[type]}
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
    >
      {text}
    </motion.div>
  );
}
