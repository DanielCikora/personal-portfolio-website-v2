'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { navigationItems } from '@/constants/constants';
import { useMediaQuery } from 'react-responsive';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // ✅ fixed this

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between">

      {/* <Link href="/" className="block">
        <img
          className="w-28 h-auto"
          src="/images/logo/daniel-logo-white.png"
          alt="log"
        />
      </Link> */}

      {/* Mobile Hamburger */}
      {isMobile ? (
        <>
          <Button
            type="button"
            ariaLabel="Hamburger Button"
            className="flex relative z-[9999] flex-col justify-between w-8 h-6"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${
                open ? 'rotate-45 translate-y-3' : ''
              }`}
            />
            <span
              className={`block rounded-md h-1 w-full bg-white duration-700 transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block rounded-md h-1 w-full bg-white duration-700 transition-transform ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </Button>
          <div
            className={`fixed flex flex-col gap-6 inset-0 bg-black bg-opacity-90 text-4xl items-center justify-center text-white transition-transform duration-700 z-40 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {navigationItems.map(({ text, href }) => (
              <Link
                key={text}
                href={href}
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden font-bold uppercase"
              >
                {text.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-500 group-hover:translate-y-[-100%]"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="absolute left-0 top-0">
                  {text.split('').map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </div>
        </>
      ) : (
         <div
            className='absolute right-24 top-2 flex flex-col gap-6 2xl:text-8xl items-end justify-center z-40'
          >
            {navigationItems.map(({ text, href }) => (
              <Link
                key={text}
                href={href}
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden font-extrabold uppercase"
              >
                {text.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-500 group-hover:translate-y-[-100%]"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="absolute left-0 top-0">
                  {text.split('').map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </div>
      )}
    </nav>
  );
}
