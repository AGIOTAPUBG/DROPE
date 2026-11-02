import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Brand Symbol */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 shadow-sm shadow-blue-500/20 shrink-0 text-white`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
        >
          {/* Data droplet / converging nodal vectors */}
          <path d="M12 2.5C12 2.5 5 11 5 15.5C5 19.0899 8.13401 22 12 22C15.866 22 19 19.0899 19 15.5C19 11 12 2.5 12 2.5Z" />
          <circle cx="12" cy="14" r="2.2" className="fill-white" />
          <path d="M12 7.5V11" />
          <path d="M8.5 14H6.5" />
          <path d="M17.5 14H15.5" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`${textSizes[size]} font-extrabold tracking-tight text-slate-900 dark:text-white font-sans`}
          >
            DROPE
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-600 dark:text-blue-400">
            Intelligent Data
          </span>
        </div>
        {showSlogan && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 tracking-tight">
            Conectando dados, acelerando decisões.
          </span>
        )}
      </div>
    </div>
  );
};
