import React, { useEffect, useRef, useState } from "react";

export function useElementOnScreen(): [
  React.RefObject<HTMLDivElement | null>,
  boolean
] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 1度表示されたら監視終了
        }
      },
      {
        threshold: 0.1, // 要素の10%が見えたら表示
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return [ref, isVisible];
}
