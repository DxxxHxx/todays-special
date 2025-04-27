import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import useFixedScroll from "@/hooks/useFixedScroll";
import { ChatMessage as IChatMessage } from "@/page/Home";

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
export default function ChatBox({
  messages,
  loading,
}: {
  messages: IChatMessage[];
  loading: boolean;
}) {
  const anchoringRef = useFixedScroll(messages);
  return (
    <div className="space-y-2 px-5 md:px-0 overflow-y-auto max-h-[400px] flex flex-col ">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} role={msg.role} content={msg.content} />
      ))}
      {loading && <ChatMessage role="assistant" content="추천 중이에요..." />}
      {messages.length === 0 && (
        <div className="h-[400px] flex justify-center items-center flex-col gap-y-3">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          <h1 className="text-5xl">뭐 먹고싶어?</h1>
        </div>
      )}
      <div ref={anchoringRef}></div>
    </div>
  );
}
