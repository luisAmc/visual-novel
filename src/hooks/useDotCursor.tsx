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

  const { x, y, isIdle } = useMousePosition();

  const context: DotCursorContextType = {
    isHovering: (val: boolean) => {
      setIsHovering(val);
    },
  };

  return (
    <DotCursorContext.Provider value={context}>
      <motion.div
        className="absolute hidden sm:flex items-center justify-center bg-[#e8e8e3] rounded-full pointer-events-none z-10 mix-blend-difference"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          transition: "transform 0.1s, opacity 0.2s",
          opacity: isIdle ? 0 : 1,
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

function useMousePosition() {
  const [isIdle, setIsIdle] = useState(true);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  useEffect(() => {
    let positionHandler: NodeJS.Timeout;
    let idleHandler: NodeJS.Timeout;

    const idleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleHandler);
      idleHandler = setTimeout(() => setIsIdle(true), 5_000);
    };

    const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
      positionHandler = setTimeout(() => {
        setPosition({ x: pageX, y: pageY });
      }, 75);

      idleTimer();
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      clearTimeout(positionHandler);
      clearTimeout(idleHandler);
    };
  }, []);

  return { ...position, isIdle };
}
