import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Element } from '../../types';
import { getElementStyles } from '../../theme/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  element?: Element;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  element,
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const elementStyles = element ? getElementStyles(element) : null;

  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: element 
      ? `bg-gradient-to-r ${elementStyles.gradient} text-white hover:shadow-lg ${elementStyles.glow}`
      : 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: element
      ? `border-2 border-current text-${elementStyles.primary} hover:bg-${elementStyles.primary} hover:text-white`
      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: element
      ? `text-${elementStyles.primary} hover:bg-${elementStyles.primary}/10`
      : 'text-gray-700 hover:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      )}
      {children}
    </motion.button>
  );
};