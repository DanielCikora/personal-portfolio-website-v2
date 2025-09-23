'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
 const [open, setOpen] = useState<boolean>(false);

 const navigationItems = [
  { text: 'Home', href: '/home' },
  { text: 'Projects', href: '/projects' },
  { text: 'About', href: '/about' },
  { text: 'Contacts', href: '/contacts' },
 ];

 useEffect(() => {
  if (open) {
   document.body.style.overflow = 'hidden';
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
    {/* Logo */}
    {/* Hamburger */}
    <button className='flex relative z-[9999] flex-col justify-between w-8 h-6' onClick={() => setOpen(!open)}>
     <span className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${open ? 'rotate-45 translate-y-3' : ''}`} />
     <span className={`block rounded-md h-1 w-full bg-white duration-700 transition-opacity ${open ? 'opacity-0' : ''}`} />
     <span className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
   </div>
   {/* Overlay menu */}
   <div
    className={`fixed inset-0 bg-black bg-opacity-80 flex flex-col text-6xl items-center justify-center space-y-6 text-white transition-transform duration-700 z-50 ${
     open ? 'translate-x-0' : 'translate-x-full'
    }`}
   >
    <Link href='/' className='text-xl font-bold text-white mb-20'>
     <img src='/images/logo/daniel-logo-white.png' alt='log' />
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
