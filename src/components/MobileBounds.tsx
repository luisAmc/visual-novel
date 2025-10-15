"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const MD_BREAKPOINT = 768;

interface MobileBoundsContextType {
  dimensions: { width: number; height: number };
  ratio: number;
  setRatio: (ratio: number) => void;
  isMD: boolean;
}

const MobileBoundsContext = createContext<MobileBoundsContextType | undefined>(
  undefined
);

interface MobileBoundsProps {
  children: ReactNode;
}

export function MobileBounds({ children }: MobileBoundsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();

    setContainerDimensions({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  }, [containerRef.current]);

  const [ratio, setRatio] = useState(0);

  return (
    <MobileBoundsContext.Provider
      value={{
        dimensions: containerDimensions,
        ratio,
        setRatio,
        isMD: containerDimensions.width < MD_BREAKPOINT,
      }}
    >
      <div
        ref={containerRef}
        className="flex w-screen flex-col bg-teal-100 h-svh"
      >
        <div className="block md:hidden">{children}</div>

        <div className="md:flex hidden h-full w-full flex-col items-center justify-center bg-green-100">
          <SmallRender>{children}</SmallRender>
        </div>
      </div>
    </MobileBoundsContext.Provider>
  );
}

export function useMobileBounds() {
  const context = useContext(MobileBoundsContext);

  if (!context) {
    throw new Error(
      "`useMobleBounds` can only be use inside a SmallRender component."
    );
  }

  return context;
}

interface SmallRenderProps {
  children: ReactNode;
}

function SmallRender({ children }: SmallRenderProps) {
  const { dimensions, setRatio } = useMobileBounds();
  const height = dimensions.height - 2 * 32;
  const ratio = height / 451;

  useEffect(() => {
    setRatio(ratio);
  }, [ratio]);

  return (
    <div className="relative" style={{ width: ratio * 212, height }}>
      <div
        className="absolute flex flex-col overflow-hidden"
        style={{
          top: ratio * 32,
          right: ratio * 9,
          bottom: ratio * 32,
          left: ratio * 9,
          isolation: "isolate",
        }}
      >
        {children}
      </div>
    </div>
  );
}
