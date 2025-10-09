'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import Button from '../ui/Button';

function WeirdShape() {
 const ref = useRef<THREE.Mesh>(null);

 const geometry = useMemo(() => {
  const geo = new THREE.BufferGeometry();
  const verts: number[] = [];
  const faces: number[] = [];

  const vertCount = 20;
  for (let i = 0; i < vertCount; i++) {
   const x = (Math.random() - 0.5) * 2;
   const y = (Math.random() - 0.5) * 2;
   const z = (Math.random() - 0.5) * 2;
   verts.push(x, y, z);
  }

  for (let i = 0; i < vertCount * 2; i++) {
   const a = Math.floor(Math.random() * vertCount);
   const b = Math.floor(Math.random() * vertCount);
   const c = Math.floor(Math.random() * vertCount);
   faces.push(
    verts[a * 3],
    verts[a * 3 + 1],
    verts[a * 3 + 2],
    verts[b * 3],
    verts[b * 3 + 1],
    verts[b * 3 + 2],
    verts[c * 3],
    verts[c * 3 + 1],
    verts[c * 3 + 2]
   );
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(faces, 3));
  geo.computeVertexNormals();
  return geo;
 }, []);

 useFrame((state) => {
  const t = state.clock.getElapsedTime();
  if (!ref.current) return;
  ref.current.rotation.x = Math.sin(t * 0.5) * 0.4;
  ref.current.rotation.y = t * 0.5;
  ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
 });

 return (
  <mesh ref={ref} geometry={geometry}>
   <meshStandardMaterial color='#ffffff' wireframe opacity={0.9} />
  </mesh>
 );
}

// circular particle texture
function createCircleTexture() {
 const size = 64;
 const canvas = document.createElement('canvas');
 canvas.width = size;
 canvas.height = size;
 const ctx = canvas.getContext('2d')!;
 const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
 gradient.addColorStop(0, 'rgba(255,255,255,1)');
 gradient.addColorStop(1, 'rgba(255,255,255,0)');
 ctx.fillStyle = gradient;
 ctx.fillRect(0, 0, size, size);
 const texture = new THREE.CanvasTexture(canvas);
 return texture;
}

function Particles({ count = 700 }) {
 const pointsRef = useRef<THREE.Points>(null);
 const texture = useMemo(() => createCircleTexture(), []);

 const positions = useMemo(() => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
   const r = 4 + Math.random() * 3;
   const theta = Math.random() * 2 * Math.PI;
   const phi = Math.acos(2 * Math.random() - 1);
   arr[i] = r * Math.sin(phi) * Math.cos(theta);
   arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
   arr[i + 2] = r * Math.cos(phi);
  }
  return arr;
 }, [count]);

 useFrame((state) => {
  const t = state.clock.getElapsedTime();
  const mesh = pointsRef.current;
  if (!mesh) return;
  mesh.rotation.y = t * 0.1;
  mesh.rotation.x = Math.sin(t * 0.3) * 0.2;
 });

 return (
  <points ref={pointsRef}>
   <bufferGeometry>
    <bufferAttribute
     args={[positions, 3]}
     attach='attributes-position'
     count={positions.length / 3}
     array={positions}
     itemSize={3}
    />
   </bufferGeometry>
   <pointsMaterial
    color='#ffffff'
    size={0.05}
    map={texture}
    transparent
    opacity={0.9}
    alphaTest={0.01}
    depthWrite={false}
    sizeAttenuation
   />
  </points>
 );
}

export default function Hero() {
 const fullText = 'I AM DANIEL';
 const [displayedText, setDisplayedText] = useState('');
 const [showSubtitle, setShowSubtitle] = useState(false);
 const [hasEntered, setHasEntered] = useState(false);

 useEffect(() => {
  const entered = localStorage.getItem('hasEntered') === 'true';
  setHasEntered(entered);
  if (!hasEntered) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = ''; 
  }

  return () => {
   document.body.style.overflow = '';
  };
 }, []);

 useEffect(() => {
  if (!hasEntered) return;
  let idx = 0;
  const interval = setInterval(() => {
   setDisplayedText(fullText.slice(0, idx + 1));
   idx++;
   if (idx === fullText.length) {
    clearInterval(interval);
    setTimeout(() => setShowSubtitle(true), 400);
   }
  }, 150);
  return () => clearInterval(interval);
 }, [hasEntered]);

 const handleEnter = () => {
  localStorage.setItem('hasEntered', 'true');
  setHasEntered(true);
 };

 return (
  <section className='relative w-full h-dvh overflow-hidden'>
   {/* only show canvas after click */}
   {hasEntered && (
    <>
     <Canvas className='absolute top-0 left-0 w-full h-full -z-10' camera={{ position: [0, 0, 6], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <WeirdShape />
      <Particles count={1000} />
     </Canvas>
     <div className='absolute top-0 left-0 w-full h-full bg-black/70 -z-5'></div>
     <div className='absolute inset-0 z-10 flex flex-col items-center justify-center'>
      <h1 className='md:text-8xl text-5xl font-semibold text-white text-center tracking-wider'>{displayedText}</h1>
      <h3
       className={`md:text-3xl text-2xl text-white mt-4 transition-opacity duration-1000 text-center ${
        showSubtitle ? 'opacity-90' : 'opacity-0'
       }`}
      >
       Frontend Developer
      </h3>
     </div>
    </>
   )}

   {/* initial begin button */}
   {!hasEntered && (
    <div className='absolute inset-0 flex items-center justify-center z-10'>
     <Button type='button' ariaLabel='Enter Website' onClick={handleEnter}>
      Begin Journey
     </Button>
    </div>
   )}
  </section>
 );
}
