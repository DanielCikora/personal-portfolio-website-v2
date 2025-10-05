import { ReactNode } from "react";

export type ButtonPropsType = {
 onClick: () => void;
 children?: React.ReactNode;
 type: 'submit' | 'button';
 className?: string;
 ariaLabel: string;
};

export type AccordionItemType = {
  id: string;
  title: string;
  content: string;
};

export type AccordionPropsType = {
  items: AccordionItem[];
};

export type RevealPropsType = {
 children: ReactNode;
 className?: string;
};

export type TitlePropsType = {
    className?: string;
    titleText: string;
}