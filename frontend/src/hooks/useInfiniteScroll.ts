import { useEffect, useRef } from "react";

type Props = {
  hasMore: boolean;
  loadMore: () => void;
};

// 無限スクロール
export const useInfiniteScroll = ({ hasMore, loadMore }: Props) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });

    const target = sentinelRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loadMore]);

  return { sentinelRef };
};
