import { ButtonPropsType } from "@/types/ui";

export default function Button({ onClick, type, children, className, ariaLabel }: ButtonPropsType) {
 return (
  <button type={type} aria-label={children ? undefined : ariaLabel} onClick={onClick} className={`cursor-pointer ${className}`}>
   {children ?? ariaLabel}
  </button>
 );
}
