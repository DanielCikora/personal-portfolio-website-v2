'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
 const [displayedText, setDisplayedText] = useState<string>('');
 const fullText: string = 'I AM DANIEL';

 useEffect(() => {
  let i: number = 0;
  const interval = setInterval(() => {
   setDisplayedText(fullText.slice(0, i + 1));
   i++;
   if (i === fullText.length) clearInterval(interval);
  }, 200);

  return () => clearInterval(interval);
 }, []);

 return (
  <section className='relative w-full h-screen overflow-hidden hero -z-10'>
   <video className='fixed top-0 left-0 w-full h-full object-cover grayscale' autoPlay loop muted playsInline>
    <source src='/videos/hero/hero-video.webm' type='video/webm' />
    Your browser does not support the video tag.
   </video>
   <div className='fixed z-10 flex flex-col items-center justify-center w-full h-full'>
    <h1 className='text-8xl font-semibold text-white text-center'>{displayedText}</h1>
    <h3 className='text-3xl text-white mt-4'>Frontend Developer</h3>
   </div>
   <div className='absolute top-0 left-0 w-full h-full bg-black/50'></div>
  </section>
 );
}
