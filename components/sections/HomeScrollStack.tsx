"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked 3D flip for the home route.
 *
 *   front → rotateY 0°   — visible on load (the contact form)
 *   back  → rotateY 180° — revealed as the card flips (the hero)
 *
 * The whole thing lives inside a tall sticky zone. As the user scrolls,
 * scrollYProgress drives rotateY from 0 → 180°. The flip completes at
 * ~60% scroll, then the back face "holds" pinned for the remaining ~40% so
 * the user has time to read it before leaving the zone.
 *
 * Respects prefers-reduced-motion: renders front then back stacked, no
 * 3D transforms, no pinning.
 */
export function HomeScrollStack({
  front,
  back,
}: {
  front: ReactNode;
  back: ReactNode;
}) {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start start", "end start"],
  });

  // Flip completes at 35% of scroll; the back face then holds flat for the remaining
  // 65%, giving a clear "fully flipped, no footer yet" window before the
  // zone ends and the footer begins to enter the viewport.
  const rotateY = useTransform(scrollYProgress, [0, 0.35, 1], [0, 180, 180]);

  if (reduce) {
    return (
      <>
        {front}
        {back}
      </>
    );
  }

  // Offsets = header height (h-16 / lg:h-20) + its 2px bottom border.
  const pinClass =
    "sticky top-[calc(4rem+2px)] lg:top-[calc(5rem+2px)] min-h-[calc(100svh-4rem-2px)] lg:min-h-[calc(100svh-5rem-2px)]";

  return (
    <div
      ref={zoneRef}
      className="relative"
      style={{
        position: "relative",
        height: "220vh",
        perspective: "2000px",
        perspectiveOrigin: "center center",
      }}
    >
      <motion.div
        style={{
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={pinClass}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex items-center-safe"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="w-full">{front}</div>
        </div>

        {/* Back face, pre-rotated so it's readable once the card flips */}
        <div
          className="absolute inset-0 flex items-center-safe"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full">{back}</div>
        </div>
      </motion.div>
    </div>
  );
}
