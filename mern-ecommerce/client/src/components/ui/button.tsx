import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'black' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'custom'; 
}

const baseStyles =
  'rounded-md font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variantStyles = {
  black: 'bg-black text-white hover:bg-gray-800',
  white: 'bg-white text-black border border-gray-300 hover:bg-gray-100',
  outline: 'border border-black text-black hover:bg-black hover:text-white',
};

const sizeStyles = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'black',
  size = 'md',
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        size !== 'custom' && sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
