'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SlidingTransition() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(leftRef.current, {
        x: '0%',
        duration: 1,
        ease: 'power2.inOut',
      })
        .to(
          rightRef.current,
          {
            x: '0%',
            duration: 1,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to({}, { duration: 0.2 })
        .to(leftRef.current, {
          x: '-100%',
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(
          rightRef.current,
          {
            x: '100%',
            duration: 1,
            ease: 'power2.inOut',
          },
          '<'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-dvh overflow-hidden bg-black">
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-neutral-900 -translate-x-full"
      ></div>
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-neutral-900 translate-x-full"
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <h2 className="text-5xl font-bold text-center">Services Section</h2>
      </div>
    </section>
  );
}
