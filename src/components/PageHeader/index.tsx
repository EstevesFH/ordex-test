import type { ReactNode } from 'react'
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi'
import * as S from './styles'

interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  badge?: string

  breadcrumbs?: BreadcrumbItem[]

  backButton?: {
    label?: string
    onClick: () => void
  }

  actions?: ReactNode
}

export const PageHeader = ({
  title,
  subtitle,
  description,
  badge,
  breadcrumbs,
  backButton,
  actions,
}: PageHeaderProps) => {
  return (
    <S.Container>
      
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <S.Breadcrumbs>
          {breadcrumbs.map((item, index) => (
            <S.BreadcrumbItem
              key={item.label}
              onClick={item.onClick}
              $clickable={!!item.onClick}
            >
              {item.label}

              {index < breadcrumbs.length - 1 && (
                <FiChevronRight size={14} />
              )}
            </S.BreadcrumbItem>
          ))}
        </S.Breadcrumbs>
      )}

      {/* Back Button */}
      {backButton && (
        <S.BackButton onClick={backButton.onClick}>
          <FiArrowLeft size={16} />
          {backButton.label || 'Voltar'}
        </S.BackButton>
      )}

      <S.Row>
        <S.Left>
          <S.TitleRow>
            <h1>{title}</h1>

            {badge && <S.Badge>{badge}</S.Badge>}
          </S.TitleRow>

          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}

          {description && <S.Description>{description}</S.Description>}
        </S.Left>

        {actions && <S.Actions>{actions}</S.Actions>}
      </S.Row>
    </S.Container>
  )
}