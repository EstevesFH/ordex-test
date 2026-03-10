import React, { useEffect, useState } from 'react'
import { FiClock, FiUser, FiX } from 'react-icons/fi'
import { Modal } from '../../../components/Modal'
import { useStockItems } from '../../../hooks/useStockItems'
import type { StockItem, StockMovement } from '../../../types'
import * as S from './StockMovementsHistoryModal.styles'

interface StockMovementsHistoryModalProps {
  item: StockItem
  onClose: () => void
}

const movementTypeLabel: Record<StockMovement['movement_type'], string> = {
  in: 'Entrada',
  out: 'Saída',
  adjustment: 'Ajuste',
}

const StockMovementsHistoryModal: React.FC<StockMovementsHistoryModalProps> = ({ item, onClose }) => {
  const { fetchMovements } = useStockItems()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [movements, setMovements] = useState<StockMovement[]>([])

  useEffect(() => {
    const loadMovements = async () => {
      setLoading(true)
      setError(null)

      const result = await fetchMovements(item.id)

      if (!result.success) {
        setError(result.error || 'Erro ao carregar histórico de movimentações')
        setLoading(false)
        return
      }

      const loadedMovements = result.data || []
      setMovements(loadedMovements)

      setLoading(false)
    }

    loadMovements()
  }, [fetchMovements, item.id])

  const rows = movements.map(movement => ({
    ...movement,
    typeLabel: movementTypeLabel[movement.movement_type],
    userLabel: movement.performed_by || 'Sistema',
    dateLabel: new Date(movement.created_at).toLocaleString('pt-BR'),
  }))

  return (
    <Modal onClose={onClose} maxWidth="760px">
      <S.ModalHeader>
        <div>
          <h2>Histórico de Movimentações</h2>
          <S.ItemName>{item.item_name}</S.ItemName>
        </div>
        <S.CloseButton onClick={onClose}>
          <FiX size={22} />
        </S.CloseButton>
      </S.ModalHeader>

      {loading ? (
        <S.StateMessage>Carregando movimentações...</S.StateMessage>
      ) : error ? (
        <S.ErrorMessage>{error}</S.ErrorMessage>
      ) : rows.length === 0 ? (
        <S.StateMessage>Nenhuma movimentação registrada para este item.</S.StateMessage>
      ) : (
        <S.TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Data e hora</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Quem fez</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>
                    <S.InlineInfo>
                      <FiClock size={14} />
                      {row.dateLabel}
                    </S.InlineInfo>
                  </td>
                  <td>
                    <S.TypeBadge $type={row.movement_type}>{row.typeLabel}</S.TypeBadge>
                  </td>
                  <td>{row.quantity}</td>
                  <td>
                    <S.InlineInfo>
                      <FiUser size={14} />
                      {row.userLabel}
                    </S.InlineInfo>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.TableWrapper>
      )}
    </Modal>
  )
}

export default StockMovementsHistoryModal
