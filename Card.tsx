import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Element } from '../../types';
import { getElementStyles } from '../../theme/colors';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  element?: Element;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  element,
  hoverable = false,
  padding = 'md',
}) => {
  const elementStyles = element ? getElementStyles(element) : null;

  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200';
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const motionProps = hoverable
    ? {
        whileHover: { y: -2, scale: 1.02 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <motion.div
      className={clsx(
        baseStyles,
        paddingStyles[padding],
        {
          [`${elementStyles?.glow}`]: element,
          'cursor-pointer': hoverable,
        },
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};