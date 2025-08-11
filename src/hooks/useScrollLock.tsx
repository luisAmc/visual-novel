import { useEffect, useState } from "react";

export default function useScrollLock() {
  const [locked, setLocked] = useState(true);

  const [originalState, setOriginalState] = useState({
    overflow: "",
    height: "",
    position: "",
  });

  useEffect(() => {
    setOriginalState({
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      position: document.body.style.position,
    });
  }, []);

  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    if (!locked) {
      document.body.style.overflow = originalState.overflow;
      document.body.style.height = originalState.height;
      document.body.style.position = originalState.position;
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = originalState.overflow;
      document.body.style.height = originalState.height;
      document.body.style.position = originalState.position;
      document.body.style.width = "";
    };
  }, [locked]);

  return { unlock: () => setLocked(false) };
}
