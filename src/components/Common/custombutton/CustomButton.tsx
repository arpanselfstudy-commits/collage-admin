import './custombutton.css';
import { Button } from '@mui/material';
import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
type CustomButtonProps = {
  label: any;
  // onClick?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  className?: string;
  icon?: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'submit' | 'reset' | 'button';
  buttonLink?: string;
  disabled?: boolean;
};

const CustomButton = ({
  label,
  onClick,
  className = '',
  icon,
  variant = 'contained',
  type = 'button',
  buttonLink,
  disabled,
}: CustomButtonProps) => {
  const baseClasses = 'btn';

  const variantClasses = {
    contained: 'btn-contained',
    outlined: 'btn-outlined',
    text: 'btn-text',
  };

  const resolvedIcon = icon ?? <MdOutlineArrowForwardIos />;

  if (buttonLink) {
    return (
      <Button
        component={Link}
        to={buttonLink}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        disabled={disabled}
      >
        <label>{label}</label>
        {resolvedIcon && <span className="btn-icon">{resolvedIcon}</span>}
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type={type}
      disabled={disabled}
    >
      <label>{label}</label>
      {resolvedIcon && <span className="btn-icon">{resolvedIcon}</span>}
    </Button>
  );
};

export default CustomButton;
