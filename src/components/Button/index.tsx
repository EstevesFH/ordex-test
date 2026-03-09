import React from 'react'
import * as S from './styles'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  variant?: ButtonVariant
  title?: string
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  primary = false,
  variant,
  title,
  children,
  ...props
}) => {
  return (
    <S.ActionButton $primary={primary} $variant={variant} {...props}>
      {children ?? title}
    </S.ActionButton>
  )
}

export { Button }
export default Button
