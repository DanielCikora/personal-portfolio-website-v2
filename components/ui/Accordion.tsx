"use client";

import { AccordionPropsType } from "@/types/ui";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Accordion({ items }: AccordionPropsType) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-50 transition"
          >
            <span>{item.title}</span>
            <ArrowDownIcon
              className={`h-5 w-5 transform transition-transform duration-300 ${
                openItem === item.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openItem === item.id
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden px-4 pb-3 text-gray-600">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
