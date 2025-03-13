"use client";

import { type Measures, useMeasure, useWindowSize } from "@react-hookz/web";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface MobileBoundsContextType {
  rect?: Measures;

  ratio: number;
  setRatio(ratio: number): void;

  isMD: boolean;
}

const MobileBoundsContent = createContext<MobileBoundsContextType | null>(null);

const MD_BREAKPOINT = 768;
const CHROME_ORIGINAL_SIZE = [212, 451] as const;

interface MobileBoundsProps {
  children: ReactNode;
}

export function MobileBounds({ children }: MobileBoundsProps) {
  const [containerRect, containerRef] = useMeasure<HTMLDivElement>();

  // _, true to measure onMount, solves SSR height 0
  const windowSize = useWindowSize(undefined, true);

  const [ratio, setRatio] = useState(0);

  const context = useMemo(
    () => ({
      rect: containerRect,
      ratio: ratio,
      setRatio,
      isMD: (containerRect?.width ?? 0) < MD_BREAKPOINT,
    }),
    [containerRect, ratio, setRatio]
  );

  return (
    <MobileBoundsContent.Provider value={context}>
      <div
        ref={containerRef}
        className="flex w-screen flex-col bg-black"
        style={{ height: windowSize.height }}
      >
        {containerRect &&
          (containerRect.width < MD_BREAKPOINT ? (
            children
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-8">
              <Frame rect={containerRect}>{children}</Frame>
            </div>
          ))}
      </div>
    </MobileBoundsContent.Provider>
  );
}

interface FrameProps {
  rect: Measures;
  children: ReactNode;
}

function Frame({ rect, children }: FrameProps) {
  const { setRatio } = useMobileBounds();
  const height = rect.height - 2 * 32;
  const ratio = height / CHROME_ORIGINAL_SIZE[1];

  useEffect(() => {
    setRatio(ratio);
  }, [ratio]);

  return (
    <div
      className="relative"
      style={{ width: ratio * CHROME_ORIGINAL_SIZE[0], height }}
    >
      <div
        className="absolute flex flex-col overflow-hidden"
        style={{
          top: ratio * 32,
          right: ratio * 9,
          bottom: ratio * 17,
          left: ratio * 9,
          isolation: "isolate",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function useMobileBounds() {
  const context = useContext(MobileBoundsContent);
  if (!context) {
    throw new Error(
      "`useMobleBounds` can only be use inside a MobileBound component."
    );
  }

  return context;
}
