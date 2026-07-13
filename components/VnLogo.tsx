'use client';

interface VnLogoProps {
  size?: number;
  className?: string;
}

export default function VnLogo({ size = 36, className }: VnLogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-label="VN logo"
    >
      <rect x="2" y="2" width="32" height="32" rx="8" stroke="rgba(91,140,90,0.3)" strokeWidth="1" />
      <path
        d="M8 12 L18 28 L22 18 L18 28 L28 12 L28 28"
        stroke="#5B8C5A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
