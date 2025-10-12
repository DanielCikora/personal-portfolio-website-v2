'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type InfoPropsType = {
  infoText: string;
  infoNumber: string;
  borderRight?: boolean;
};

export default function Info({ infoText, infoNumber, borderRight }: InfoPropsType) {
  const [displayNumber, setDisplayNumber] = useState('0');
  const numberRef = useRef<{ value: number }>({ value: 0 });

  useEffect(() => {
    const numberPart = parseFloat(infoNumber.replace(/[^\d.]/g, ''));
    const suffix = infoNumber.replace(/[\d.\s]/g, '');

    if (isNaN(numberPart)) {
      setDisplayNumber(infoNumber);
      return;
    }

    gsap.to(numberRef.current, {
      value: numberPart,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        const formatted = numberPart > 1000
          ? numberRef.current.value.toLocaleString(undefined, { maximumFractionDigits: 0 })
          : numberRef.current.value.toFixed(2);
        setDisplayNumber(`${formatted}${suffix}`);
      },
    });
  }, [infoNumber]);

  return (
    <span
      className={`flex gap-1 text-lg items-center text-white px-3 ${
        borderRight ? 'border-r-2 border-white' : ''
      }`}
    >
      <p>{infoText}</p>
      <strong>
        <p>{displayNumber}</p>
      </strong>
    </span>
  );
}
