import React from 'react'
import * as S from './styles'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  title?: string
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  primary = false,
  variant,
  size = 'medium',
  title,
  children,
  ...props
}) => {
  return (
    <S.ActionButton $primary={primary} $variant={variant} $size={size} {...props}>
      {children ?? title}
    </S.ActionButton>
  )
}

export { Button }
export default Button
