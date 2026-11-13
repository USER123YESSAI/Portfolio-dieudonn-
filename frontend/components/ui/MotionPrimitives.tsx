"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.15,
} as const;

/**
 * Global MotionConfig honoring the user's `prefers-reduced-motion` preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
}

/**
 * Scroll-triggered entrance animation using only GPU-friendly opacity and transform.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 20,
  x = 0,
  scale = 1,
  className,
  style,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, delay, ease: MOTION_EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

/**
 * Coordinates staggered entrance animations for child StaggerItem elements.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className,
  style,
  ...rest
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  y?: number;
}

export function StaggerItem({
  children,
  y = 18,
  className,
  style,
  ...rest
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: MOTION_EASE },
        },
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface BotanicalFloatProps {
  children: ReactNode;
  duration?: number;
  distance?: number;
  delay?: number;
  className?: string;
}

/**
 * Subtle ambient floating motion for botanical/health badges and decorative elements.
 * Automatically disabled when the user prefers reduced motion.
 */
export function BotanicalFloat({
  children,
  duration = 5,
  distance = 6,
  delay = 0,
  className,
}: BotanicalFloatProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
