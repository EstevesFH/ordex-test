import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean;
  children?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  size?: string;
}