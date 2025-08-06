//! File: src/components/CountUp.jsx

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const CountUp = ({
  to,
  from = 0,
  delay = 0,
  duration = 1.5,
  className = "",
}) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(from);
    }
  }, [from, to]);

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, motionValue, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span className={className} ref={ref} />;
};

export default CountUp;