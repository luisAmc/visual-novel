import { Measures, useMeasure, useWindowSize } from "@react-hookz/web";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MD_BREAKPOINT = 768;

interface MobileBoundsContextType {
  rect?: Measures;
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
  const [containerRect, containerRef] = useMeasure<HTMLDivElement>();

  // _, true to measure onMount, solves SSR height 0
  const windowSize = useWindowSize(undefined, true);

  const [ratio, setRatio] = useState(0);

  const isMD = (containerRect?.width ?? 0) < MD_BREAKPOINT;

  return (
    <MobileBoundsContext.Provider
      value={{
        rect: containerRect,
        ratio,
        setRatio,
        isMD: (containerRect?.width ?? 0) < MD_BREAKPOINT,
      }}
    >
      <div
        ref={containerRef}
        className="flex w-screen flex-col bg-teal-100"
        style={{ height: windowSize.height }}
      >
        {containerRect &&
          (isMD ? (
            children
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-green-100">
              <SmallRender>{children}</SmallRender>
            </div>
          ))}
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
  const { rect, setRatio } = useMobileBounds();
  const height = (rect?.height ?? 0) - 2 * 32;
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
