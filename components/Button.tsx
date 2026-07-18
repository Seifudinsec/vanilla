import type { ButtonHTMLAttributes, ReactNode } from 'react';
import ArrowIcon from './ArrowIcon';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; solid?: boolean };
export default function Button({ children, solid = false, className = '', ...props }: Props) {
  return <button className={`button ${solid ? 'button-solid' : ''} ${className}`} {...props}><span>{children}</span><ArrowIcon className="button-arrow" /></button>;
}
