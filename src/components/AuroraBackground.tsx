import { motion } from "framer-motion";

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="aurora-orb w-[600px] h-[600px] -top-40 -left-40"
        style={{ background: "hsl(152 76% 55% / 0.5)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-orb w-[500px] h-[500px] top-1/3 -right-40"
        style={{ background: "hsl(268 85% 65% / 0.45)" }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-orb w-[450px] h-[450px] bottom-0 left-1/3"
        style={{ background: "hsl(195 90% 55% / 0.4)" }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
