'use client';

import { useInView } from '@/hooks/useInView';
import { RevealPropsType } from '@/types/ui';

export function Reveal({ children, className }: RevealPropsType) {
 const { ref, isVisible } = useInView<HTMLDivElement>();

 return (
  <div
   ref={ref}
   className={`
        transition-all duration-900 ease-out 
        transform opacity-0 translate-y-8
        ${isVisible ? 'opacity-100 translate-y-0' : ''}
        ${className || ''}
      `}
  >
   {children}
  </div>
 );
}
