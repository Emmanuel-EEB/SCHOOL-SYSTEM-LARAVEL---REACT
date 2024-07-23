import React from 'react';

export default function ArrowIcon({ className, color, rotated }){
  const rotationClass = rotated ? 'rotate-180' : '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationClass}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

 ArrowIcon;
