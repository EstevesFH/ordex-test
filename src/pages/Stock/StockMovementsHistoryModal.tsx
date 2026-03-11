import React, { useEffect, useMemo, useState } from 'react'
import { FiClock, FiUser, FiX } from 'react-icons/fi'
import { Modal } from '@/components/Modal'
import { useStockItems } from '@/hooks/useStockItems'
import { supabase } from '@/services/supabase'
import type { StockItem, StockMovement } from '../../types'
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
  const [userNamesById, setUserNamesById] = useState<Record<string, string>>({})

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

      const ids = Array.from(
        new Set(
          loadedMovements
            .map(m => m.performed_by)
            .filter((value): value is Exclude<typeof value, null | undefined> => typeof value === 'number')
        )
      )

      if (ids.length > 0) {
        const { data } = await supabase
          .from('profiles')
          .select('id, name, email')
          .in('id', ids)

        if (data) {
          const names = data.reduce<Record<string, string>>((acc, user) => {
            acc[user.id as string] = (user.name as string) || (user.email as string) || `Usuário #${user.id}`
            return acc
          }, {})

          setUserNamesById(names)
        }
      }

      setLoading(false)
    }

    loadMovements()
  }, [fetchMovements, item.id])

  const rows = useMemo(() => {
    return movements.map(movement => {
      const userLabel = typeof movement.performed_by === 'number'
        ? userNamesById[movement.performed_by] || `Usuário #${movement.performed_by}`
        : 'Sistema'

      return {
        ...movement,
        typeLabel: movementTypeLabel[movement.movement_type],
        userLabel,
        dateLabel: new Date(movement.created_at).toLocaleString('pt-BR'),
      }
    })
  }, [movements, userNamesById])

  let content: React.ReactNode;
  if (loading) {
    content = <S.StateMessage>Carregando movimentações...</S.StateMessage>;
  } else if (error) {
    content = <S.ErrorMessage>{error}</S.ErrorMessage>;
  } else if (rows.length === 0) {
    content = <S.StateMessage>Nenhuma movimentação registrada para este item.</S.StateMessage>;
  } else {
    content = (
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
    );
  }

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
      {content}
    </Modal>
  )
}

export default StockMovementsHistoryModal
