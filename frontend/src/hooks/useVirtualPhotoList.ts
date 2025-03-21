import { useEffect, useRef, useState } from "react";
import { useInfinitePhotos } from "./useInfinitePhotos";

// Virtual表示制御用のカスタムフック
export const useVirtualPhotoList = () => {
  const { photos, isLoading, error } = useInfinitePhotos();
  const [displayCount, setDisplayCount] = useState(10);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => prev + 10);
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [photos]);

  const visiblePhotos = photos.slice(0, displayCount);

  return { visiblePhotos, observerRef, isLoading, error };
};
