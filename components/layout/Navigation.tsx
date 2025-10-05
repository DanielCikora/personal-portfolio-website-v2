'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { navigationItems } from '@/constants/constants';

export default function Navigation() {
 const [open, setOpen] = useState<boolean>(false);

 useEffect(() => {
  if (open) {
   setTimeout(() => {
    document.body.style.overflow = 'hidden';
   }, 300);
  } else {
   document.body.style.overflow = '';
  }

  return () => {
   document.body.style.overflow = '';
  };
 }, [open]);

 return (
  <nav className='fixed top-0 left-0 w-full z-50'>
   <div className='flex items-center justify-between p-4'>
    <Button
     type='button'
     ariaLabel='Hamburger Button'
     className='flex relative z-[9999] flex-col justify-between w-8 h-6'
     onClick={() => setOpen(!open)}
    >
     <span
      className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${
       open ? 'rotate-45 translate-y-3' : ''
      }`}
     />
     <span
      className={`block rounded-md h-1 w-full bg-white duration-700 transition-opacity ${open ? 'opacity-0' : ''}`}
     />
     <span
      className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${
       open ? '-rotate-45 -translate-y-2' : ''
      }`}
     />
    </Button>
   </div>
   <div
    className={`fixed flex flex-col md:gap-8 gap-4 inset-0 bg-black bg-opacity-80 md:text-6xl text-5xl items-center justify-center text-white transition-transform duration-700 z-50 ${
     open ? 'translate-x-0' : 'translate-x-full'
    }`}
   >
    <Link href='/' className='block'>
     <img className='w-full h-auto' src='/images/logo/daniel-logo-white.png' alt='log' />
    </Link>
    {navigationItems.map(({ text, href }) => (
     <Link
      key={text}
      href={href}
      onClick={() => setOpen(false)}
      className='group relative overflow-hidden font-bold uppercase'
     >
      {text.split('').map((letter, i) => (
       <span
        key={i}
        className='inline-block transition-transform duration-500 group-hover:translate-y-[-100%]'
        style={{ transitionDelay: `${i * 50}ms` }}
       >
        {letter}
       </span>
      ))}
      <span className='absolute left-0 top-0'>
       {text.split('').map((letter, i) => (
        <span
         key={i}
         className='inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0'
         style={{ transitionDelay: `${i * 50}ms` }}
        >
         {letter}
        </span>
       ))}
      </span>
     </Link>
    ))}
   </div>
  </nav>
 );
}
