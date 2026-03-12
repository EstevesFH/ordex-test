import type { ReactNode } from 'react'
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import * as S from './styles'

interface PageHeaderProps {
  title: string
  badge?: string
  actions?: ReactNode
  showBreadcrumbs?: boolean
  backButton?: {
    label?: string
    onClick?: () => void
  }
}

const segmentLabelMap: Record<string, string> = {
  dashboard: 'Painel de Controles',
  tickets: 'Ordens de Serviço',
  stock: 'Estoque',
  register: 'Registrar OS',
  settings: 'Parametrizações',
  accesses: 'Acessos',
  locations: 'Locais',
  products: 'Produtos',
  profile: 'Meu Perfil',
}

const toTitleCase = (value: string) =>
  value
    .replaceAll('-', ' ')
    .replaceAll(/\b\w/g, char => char.toUpperCase())

export const PageHeader = ({
  title,
  badge,
  actions,
  showBreadcrumbs = true,
  backButton,
}: PageHeaderProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const pathSegments = location.pathname
    .split('/')
    .filter(Boolean)

  const breadcrumbs = [
    {
      label: 'Painel de Controles',
      path: '/dashboard',
    },
    ...pathSegments
      .filter(segment => segment !== 'dashboard')
      .map((segment, index) => {
        const realSegments = pathSegments.filter(s => s !== 'dashboard').slice(
          0,
          index + 1,
        )

        const path = `/${realSegments.join('/')}`

        return {
          label: segmentLabelMap[segment] || toTitleCase(segment),
          path,
        }
      }),
  ]

  const dedupedBreadcrumbs = breadcrumbs.filter(
    (item, index, array) =>
      index === array.findIndex(other => other.path === item.path),
  )

  return (
    <S.Container>
      {backButton && (
        <S.BackButton
          onClick={() => {
            if (backButton.onClick) {
              backButton.onClick()
              return
            }

            navigate(-1)
          }}
        >
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
          {showBreadcrumbs && (
            <S.Breadcrumbs>
              {dedupedBreadcrumbs.map((item, index) => {
                const isLast = index === dedupedBreadcrumbs.length - 1

                return (
                  <S.BreadcrumbItem
                    key={`${item.path}-${index}`}
                    $clickable={!isLast}
                    onClick={() => {
                      if (!isLast) navigate(item.path)
                    }}
                  >
                    <span>{item.label}</span>
                    {!isLast && <FiChevronRight size={14} />}
                  </S.BreadcrumbItem>
                )
              })}
            </S.Breadcrumbs>
          )}
        </S.Left>
        {actions && <S.Actions>{actions}</S.Actions>}
      </S.Row>
    </S.Container>
  )
}