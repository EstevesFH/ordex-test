import React from 'react'
import { FiAlertTriangle, FiTool, FiRefreshCw } from 'react-icons/fi'
import * as S from './styles'

interface MaintenanceProps {
  type?: 'maintenance' | 'error'
  title?: string
  message?: string
  showRetry?: boolean
}

const Maintenance: React.FC<MaintenanceProps> = ({ 
  type = 'maintenance',
  title,
  message,
  showRetry = true
}) => {
  const isMaintenanceMode = type === 'maintenance'

  const defaultTitle = isMaintenanceMode 
    ? 'Sistema em Manutenção' 
    : 'Página Indisponível'

  const defaultMessage = isMaintenanceMode
    ? 'Estamos realizando melhorias no sistema. Voltaremos em breve!'
    : 'Ops! Algo deu errado. Tente novamente mais tarde.'

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <S.Container>
      <S.Card>
        <S.IconWrapper $type={type}>
          {isMaintenanceMode ? (
            <FiTool size={64} />
          ) : (
            <FiAlertTriangle size={64} />
          )}
        </S.IconWrapper>

        <S.Title>{title || defaultTitle}</S.Title>
        <S.Message>{message || defaultMessage}</S.Message>

        {isMaintenanceMode ? (
          <S.InfoBox>
            <p><strong>O que está acontecendo?</strong></p>
            <p>
              Nossa equipe está trabalhando para melhorar sua experiência. 
              O sistema estará disponível novamente em breve.
            </p>
          </S.InfoBox>
        ) : (
          showRetry && (
            <S.RetryButton onClick={handleRetry}>
              <FiRefreshCw size={18} />
              Tentar Novamente
            </S.RetryButton>
          )
        )}

        <S.Footer>
          {isMaintenanceMode ? (
            <>
              <S.StatusIndicator $active />
              <span>Manutenção em andamento</span>
            </>
          ) : (
            <>
              <S.StatusIndicator $active={false} />
              <span>Sistema temporariamente indisponível</span>
            </>
          )}
        </S.Footer>
      </S.Card>

      <S.BackgroundBlobs>
        <S.Blob $position="top-left" />
        <S.Blob $position="bottom-right" />
      </S.BackgroundBlobs>
    </S.Container>
  )
}

export default Maintenance
