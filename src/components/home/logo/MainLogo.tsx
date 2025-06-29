import { motion } from "framer-motion";

const svgVariants = {
  init: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};
export default function MainLogo() {
  return (
    <div className="h-[400px] flex justify-center items-center flex-col gap-y-3">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed size-32"
      >
        <motion.path
          variants={svgVariants}
          initial="init"
          animate="animate"
          d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"
        />
        <motion.path
          variants={svgVariants}
          initial="init"
          animate="animate"
          d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"
        />
        <motion.path
          variants={svgVariants}
          initial="init"
          animate="animate"
          d="m2.1 21.8 6.4-6.3"
        />
        <motion.path
          variants={svgVariants}
          initial="init"
          animate="animate"
          d="m19 5-7 7"
        />
      </motion.svg>
      <h1 className="text-5xl">오늘 뭐 먹지?</h1>
    </div>
  );
}
