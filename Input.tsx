import React from 'react';
import clsx from 'clsx';
import type { Element } from '../../types';
import { getElementStyles } from '../../theme/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  element?: Element;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  element,
  className,
  ...props
}) => {
  const elementStyles = element ? getElementStyles(element) : null;
  const id = props.id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className={clsx(
          'block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors',
          'focus:border-transparent focus:outline-none focus:ring-2',
          element
            ? `focus:ring-${elementStyles.primary}`
            : 'focus:ring-gray-500',
          error
            ? 'border-red-300 focus:ring-red-500'
            : '',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};