"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { CornerDownRightIcon } from "lucide-react";
import { cn } from "~/utils/cn";

interface DotCursorContextType {
  isHovering: (val: boolean) => void;
}

const DotCursorContext = createContext<DotCursorContextType | undefined>(
  undefined
);

interface DotCursorProviderProps {
  children: ReactNode;
}

export function DotCursorProvider({ children }: DotCursorProviderProps) {
  const [_isHovering, setIsHovering] = useState(false);

  //   console.log({ _isHovering });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      setTimeout(() => {
        setPosition({ x: mouseX, y: mouseY });
        setIsVisible(true);
      }, 75);
    });
  }, []);

  const context: DotCursorContextType = {
    isHovering: (val: boolean) => {
      setIsHovering(val);
    },
  };

  return (
    <DotCursorContext.Provider value={context}>
      <motion.div
        className={cn(
          "absolute hidden sm:flex items-center justify-center bg-[#e8e8e3] rounded-full pointer-events-none z-10 mix-blend-difference",
          _isHovering ? "size-12" : "size-4"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.1s, opacity 0.2s",
        }}
        animate={{
          width: _isHovering ? "3rem" : "1rem",
          height: _isHovering ? "3rem" : "1rem",
        }}
      >
        <CornerDownRightIcon className="size-10 p-2 " />
      </motion.div>

      {children}
    </DotCursorContext.Provider>
  );
}

export function useDotCursor() {
  const context = useContext(DotCursorContext);

  if (!context) {
    throw new Error(
      "`useDotCursor` can only be use inside the Home component."
    );
  }

  return context;
}
