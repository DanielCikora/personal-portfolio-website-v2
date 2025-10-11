'use client';
import Accordion from '../ui/Accordion';
import { servicesAccordionItems } from '@/constants/constants';
import { Reveal } from '../ui/animations/Reveal';

export default function Services() {
 return (
  <section className='bg-black min-h-dvh grid place-items-center'>
   <div className='wrapper'>
    <Reveal>
     <div className='services-content '>
      <Accordion items={servicesAccordionItems} />
     </div>
    </Reveal>
   </div>
  </section>
 );
}
