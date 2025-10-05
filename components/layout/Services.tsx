import Accordion from '../ui/Accordion';
import { servicesAccordionItems } from '@/constants/constants';
import { Reveal } from '../ui/Reveal';

export default function Services() {
 return (
  <section className='bg-black py-20'>
   <div className='wrapper'>
    <Reveal>
     <div className='services-content grid place-items-center'>
      <Accordion items={servicesAccordionItems} />
     </div>
    </Reveal>
   </div>
  </section>
 );
}
