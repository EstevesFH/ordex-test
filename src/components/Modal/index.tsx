import React from 'react'
import * as S from './styles'

export interface ModalProps {
  open?: boolean
  title?: string
  message?: string
  protocol?: number | string
  onClose: () => void
  children?: React.ReactNode
  maxWidth?: string
}

const Modal = ({ open, title, message, protocol, onClose, children, maxWidth }: ModalProps) => {
  // Se usar children (novo padrão), renderizar como container genérico
  if (children) {
    return (
      <S.Overlay onClick={onClose}>
        <S.Modal onClick={(e) => e.stopPropagation()} style={{ maxWidth: maxWidth || '600px' }}>
          {children}
        </S.Modal>
      </S.Overlay>
    )
  }

  // Padrão antigo com open, title, message (compatibilidade)
  if (!open) return null

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>

        <S.Message>
          {message}
          {protocol && (
            <>
              <br />
              <br />
              <strong>Protocolo:</strong> #{protocol}
            </>
          )}
        </S.Message>

        <S.Actions>
          <button onClick={onClose}>Entendi</button>
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  )
}

export { Modal }
