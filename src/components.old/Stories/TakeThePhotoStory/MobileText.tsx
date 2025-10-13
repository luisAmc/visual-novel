import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Action } from "~/components/Action";

interface MobileTextProps {
  src?: string;
  speaker?: string;
  children: ReactNode;
}

export function MobileText({ children, speaker, src }: MobileTextProps) {
  return (
    <Action name="MobileText">
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: 0.3 },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeOut",
              },
            },
          }}
          className="pointer-events-none select-none absolute inset-0"
        >
          {src && <img src={src} alt="background" className="shadow-md" />}

          <div className="absolute flex flex-col gap-y-0.5 inset-x-8 bottom-16 rounded-md">
            <SpeakerTag content={speaker} />
            <TextBubble>{children}</TextBubble>
          </div>
        </motion.div>
      )}
    </Action>
  );
}

function SpeakerTag({ content }: { content?: string }) {
  if (!content) {
    return null;
  }

  return (
    <div className="w-fit bg-gray-950/90 px-4 py-1 text-lg rounded-md">
      {content}
    </div>
  );
}

function TextBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-gray-950/80 rounded-md">
      <div className="text-lg px-6 py-6 flex-1">{children}</div>

      <div className="flex items-end text-base animate-pulse p-2">▶</div>
    </div>
  );
}
