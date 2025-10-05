'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
 const ref = useRef<T | null>(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  if (!ref.current) return;

  const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
   threshold: 0.1,
   ...options,
  });

  observer.observe(ref.current);

  return () => {
   if (ref.current) observer.unobserve(ref.current);
  };
 }, [options]);

 return { ref, isVisible };
}
