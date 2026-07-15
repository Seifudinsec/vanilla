import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; solid?: boolean };
export default function Button({ children, solid = false, className = '', ...props }: Props) {
  return <button className={`button ${solid ? 'button-solid' : ''} ${className}`} {...props}><span>{children}</span><b aria-hidden>↗</b></button>;
}
