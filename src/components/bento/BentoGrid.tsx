import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 p-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  variant?: 'default' | 'gradient' | 'glow' | 'shine';
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
}) => {
  const colSpanClasses: Record<number, string> = {
    1: 'col-span-4 md:col-span-3 lg:col-span-3',
    2: 'col-span-4 md:col-span-3 lg:col-span-4',
    3: 'col-span-4 md:col-span-6 lg:col-span-6',
    4: 'col-span-4 md:col-span-6 lg:col-span-8',
    6: 'col-span-4 md:col-span-6 lg:col-span-12',
  };

  const rowSpanClasses: Record<number, string> = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
  };

  const variantClasses: Record<string, string> = {
    default: 'bento-card',
    gradient: 'bento-card gradient-border',
    glow: 'bento-card glow',
    shine: 'bento-card card-shine',
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        colSpanClasses[colSpan] || colSpanClasses[1],
        rowSpanClasses[rowSpan] || rowSpanClasses[1],
        'group noise',
        className
      )}
    >
      {children}
    </div>
  );
};
