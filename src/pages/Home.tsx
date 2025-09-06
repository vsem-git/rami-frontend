import { useEffect, useState } from "react";
import { CircleText } from "../components/CircleText";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Home({ scrollRef }: { scrollRef: React.RefObject<HTMLElement> }) {
  const { scrollY } = useScroll({ target: scrollRef });

  const rotation = useTransform(scrollY, [0, 1000], [0, -220]);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 20 });

  return (
    <section className="fixed top-0 left-0 w-full h-screen z-10" >
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <motion.div
        style={{ rotate: smoothRotation }}
        className="w-96 h-96 flex items-center justify-center"
      >
        <CircleText text="RAMICLINIC RESIDENCE " radius={150} />
      </motion.div>
    </div>
    </section>
  );
}
