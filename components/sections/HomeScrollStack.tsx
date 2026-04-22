"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked 3D flip for the home route.
 *
 *   Hero (front)  → rotateY 0°   — visible on load
 *   CTA  (back)   → rotateY 180° — revealed as the card flips
 *
 * The whole thing lives inside a tall sticky zone. As the user scrolls,
 * scrollYProgress drives rotateY from 0 → 180°. The flip completes at
 * ~60% scroll, then the CTA "holds" pinned for the remaining ~40% so
 * the user has time to read it before leaving the zone.
 *
 * Respects prefers-reduced-motion: renders Hero then CTA stacked, no
 * 3D transforms, no pinning.
 */
export function HomeScrollStack({
  hero,
  cta,
}: {
  hero: ReactNode;
  cta: ReactNode;
}) {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start start", "end start"],
  });

  // Flip completes at 35% of scroll; CTA then holds flat for the remaining
  // 65%, giving a clear "fully flipped, no footer yet" window before the
  // zone ends and the footer begins to enter the viewport.
  const rotateY = useTransform(scrollYProgress, [0, 0.35, 1], [0, 180, 180]);

  if (reduce) {
    return (
      <>
        {hero}
        {cta}
      </>
    );
  }

  const pinClass =
    "sticky top-16 lg:top-20 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]";

  return (
    <div
      ref={zoneRef}
      className="relative"
      style={{ height: "220vh", perspective: "2000px", perspectiveOrigin: "center center" }}
    >
      <motion.div
        style={{
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={pinClass}
      >
        {/* Front face — Hero */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="w-full">{hero}</div>
        </div>

        {/* Back face — CTA, pre-rotated so it's readable once the card flips */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full">{cta}</div>
        </div>
      </motion.div>
    </div>
  );
}
