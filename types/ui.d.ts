export type ButtonPropsType = {
 onClick: () => void;
 children?: React.ReactNode;
 type: 'submit' | 'button' | 'reset';
 className?: string;
 ariaLabel: string;
};