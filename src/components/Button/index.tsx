import React from 'react';
import * as S from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ primary = false, children, ...props }) => {
  return (
    <S.ActionButton 
      $primary={primary} 
      {...props}
    >
      {children}
    </S.ActionButton>
  );
};

export default Button;