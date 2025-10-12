'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LineY from '../ui/LineY';
import LineX from '../ui/LineX';
import Info from '../ui/Info';
import { saturnInfo } from '@/constants/constants';
gsap.registerPlugin(ScrollTrigger);

function Saturn() {
 const planetRef = useRef<THREE.Mesh>(null);
 const ringRef = useRef<THREE.Mesh>(null);

 const texture = useMemo(() => {
  const tex = new THREE.TextureLoader().load('/images/hero/hero-image.png');
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
 }, []);

 const ringTexture = useMemo(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
   const gradient = ctx.createRadialGradient(256, 256, 120, 256, 256, 256);
   gradient.addColorStop(0.45, 'rgba(255,255,255,0)');
   gradient.addColorStop(0.55, 'rgba(255,255,255,0.3)');
   gradient.addColorStop(0.7, 'rgba(255,255,255,0.1)');
   gradient.addColorStop(1, 'rgba(255,255,255,0)');
   ctx.fillStyle = gradient;
   ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
 }, []);

 useFrame(() => {
  if (planetRef.current) planetRef.current.rotation.y += 0.002;
  if (ringRef.current) ringRef.current.rotation.z += 0.001;
 });

 return (
  <group>
   {/* Saturn planet */}
   <mesh ref={planetRef}>
  <sphereGeometry args={[2, 64, 64]} />
  <meshPhongMaterial
    map={texture}
    color={'#e0e0e0'}
    shininess={5}
    emissive={'#aaaaaa'}
    emissiveIntensity={0.5}
    flatShading={false}
  />
</mesh>


   {/* Saturn ring */}
   <mesh
    ref={ringRef}
    rotation={[Math.PI / 2.3, 0, 0]}
    position={[0, 0, 0]}
    renderOrder={-1} // 👈 helps avoid overdraw
   >
    <ringGeometry args={[2.7, 4.3, 128]} /> {/* a bit larger, so it's not intersecting */}
    <meshBasicMaterial
     map={ringTexture}
     transparent
     opacity={0.85}
     side={THREE.DoubleSide}
     depthWrite={false} // 👈 prevents ring from covering planet
     blending={THREE.AdditiveBlending} // 👈 gives a nice glow effect
    />
   </mesh>
  </group>
 );
}


export default function Hero() {
 const fullText: string = 'DANIEL';
 const [displayedText, setDisplayedText] = useState<string>('');
 const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
 const leftCurtain = useRef<HTMLDivElement>(null);
 const rightCurtain = useRef<HTMLDivElement>(null);
 const sectionRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  let idx = 0;
  const interval = setInterval(() => {
   setDisplayedText(fullText.slice(0, idx + 1));
   idx++;
   if (idx === fullText.length) {
    clearInterval(interval);
    setTimeout(() => setShowSubtitle(true), 800);
   }
  }, 150);
  return () => clearInterval(interval);
 }, []);

 useEffect(() => {
  const ctx = gsap.context(() => {
   const tl = gsap.timeline({
    scrollTrigger: {
     trigger: sectionRef.current,
     start: 'top top',
     end: '+=80%',
     scrub: true,
    },
   });
   tl
    .to(leftCurtain.current, { x: '0%', duration: 1, ease: 'power2.inOut' })
    .to(rightCurtain.current, { x: '0%', duration: 1, ease: 'power2.inOut' }, '<');
  }, sectionRef);

  return () => ctx.revert();
 }, []);

 return (
  <section ref={sectionRef} className='relative w-full h-dvh overflow-hidden bg-black'>
   <LineY className='right-20' />
   <div className='absolute 2xl:bottom-[112px] bottom-[106px]'>
    <LineX className='' />

    <div className='flex flex-wrap items-center justify-center pt-2'>
     {saturnInfo.map(({ infoNumber, borderRight, infoText }) => (
      <Info key={infoText} infoNumber={infoNumber} infoText={infoText} borderRight={borderRight} />
     ))}
    </div>
   </div>

   <Canvas camera={{ position: [0, 0, 7], fov: 45 }} className='absolute inset-0'>
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 2, 5]} intensity={1.3} />
    <directionalLight position={[-3, -2, -4]} intensity={0.8} color={'#aaaaaa'} />
    <Saturn />
   </Canvas>

   <div ref={leftCurtain} className='absolute top-0 left-0 w-1/2 h-full bg-black -translate-x-full z-30'></div>
   <div ref={rightCurtain} className='absolute top-0 right-0 w-1/2 h-full bg-black translate-x-full z-30'></div>

   <div className='absolute inset-0 z-20 flex flex-col items-center justify-center'>
    <h1 className='md:text-8xl text-5xl font-semibold text-black text-center tracking-wider porter-sans-block'>
     {displayedText}
    </h1>
   </div>
   <h3
    className={`2xl:text-5xl uppercase inter text-3xl bg-black py-3 px-5 bottom-28 absolute right-0 text-white mt-4 transition-opacity duration-1000 text-center ${
     showSubtitle ? 'opacity-100' : 'opacity-0'
    }`}
   >
    Frontend Developer
   </h3>
  </section>
 );
}
