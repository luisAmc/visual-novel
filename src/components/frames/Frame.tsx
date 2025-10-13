import {
  AnimationControls,
  useAnimationControls,
  usePresence,
  Variant,
} from "framer-motion";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useStatement } from "../Statement/useStatement";
import { StatementType } from "../types";
import { useBranch } from "../Branch/useBranch";

export type FrameAnimationVariants = {
  initial: Variant;
  entrance: Variant;
  exit: Variant;
};

export interface FrameInstance {
  enter: () => void;
}

export interface FrameProps {
  type: StatementType;
  children: (control: AnimationControls) => ReactNode;
}

export const Frame = forwardRef(function Frame(
  { type, children }: FrameProps,
  ref
) {
  const { isCurrent } = useStatement();
  const { goToNextStatement } = useBranch();

  const controls = useAnimationControls();

  const enteredRef = useRef(false);

  const [entered, _setEntered] = useState(false);
  const [isPresent, safeToRemove] = usePresence();

  const setEntered = useCallback((hasEntered: boolean) => {
    enteredRef.current = hasEntered;
    _setEntered(hasEntered);
  }, []);

  useImperativeHandle(ref, () => ({
    enter: () => {
      if (enteredRef.current) {
        return false;
      }

      controls.stop();
      controls.set("entrance");
      setEntered(true);
    },
  }));

  useEffect(() => {
    if (isPresent) {
      setEntered(false);

      requestAnimationFrame(() =>
        controls.start("entrance").then(() => setEntered(true))
      );
    } else {
      controls.start("exit").then(() => safeToRemove());
    }

    return () => controls.stop();
  }, [isPresent]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    if (type.variation === "skippable_timed" && entered && isCurrent) {
      interval = setInterval(() => {
        if (isCurrent) {
          goToNextStatement();
        }
      }, type.durationMs);
    }

    return () => {
      clearInterval(interval);
    };
  }, [entered, isCurrent]);

  return <div className="absolute inset-0 flex">{children(controls)}</div>;
});
