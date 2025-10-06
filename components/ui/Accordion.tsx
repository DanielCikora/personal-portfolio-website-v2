'use client';

import { AccordionPropsType } from '@/types/ui';
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Accordion({ items }: AccordionPropsType) {
 const [openItem, setOpenItem] = useState<string | null>(null);

 const toggleItem = (id: string) => {
  setOpenItem(openItem === id ? null : id);
 };

 return (
  <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 '>
   {items.map(({ id, title, content, icon: Icon }) => (
    <div key={id} className='overflow-hidden md:min-h-[200px] min-h-[400px]'>
     <button
      onClick={() => toggleItem(id)}
      className='w-full flex items-center justify-between px-4 py-3 font-medium hover:bg-gray-50 transition'
     >
      <span className='flex items-center gap-2'>
       <Icon size={30} className='text-white' />
       <h3 className='text-2xl'>{title}</h3>
      </span>
      <ArrowUpIcon
       size={24}
       className={` transform transition-transform duration-300 ${openItem === id ? 'rotate-180' : ''}`}
      />
     </button>
     <div
      className={`grid transition-all duration-300 ease-in-out ${
       openItem === id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
     >
      <div className='overflow-hidden px-4 pb-3 text-gray-300'>{content}</div>
     </div>
    </div>
   ))}
  </div>
 );
}
