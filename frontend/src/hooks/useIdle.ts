import { useEffect, useState } from "react";

// 遅延評価
export const useIdle = () => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleCallback = window.requestIdleCallback || setTimeout;
      const handle = idleCallback(() => {
        setIsIdle(true);
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(handle);
        } else {
          clearTimeout(handle);
        }
      };
    } else {
      setIsIdle(true);
    }
  }, []);

  return isIdle;
};
