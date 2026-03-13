import React, { useEffect, useState } from 'react'
import { FiClock, FiX } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import * as S from './styles'
import type { WarehouseItemRow } from '../../index'

interface WarehouseMovementRow {
  id: number
  item_id: number
  movement_type: 'in' | 'out' | 'adjustment'
  quantity: number
  previous_quantity: number | null
  new_quantity: number | null
  notes: string | null
  user_id: string | null
  user_name: string | null
  created_at: string
}

interface WarehouseHistoryProps {
  item: WarehouseItemRow
  onClose: () => void
}

const movementLabelMap: Record<WarehouseMovementRow['movement_type'], string> = {
  in: 'Entrada',
  out: 'Saída',
  adjustment: 'Ajuste',
}

const WarehouseHistory: React.FC<WarehouseHistoryProps> = ({
  item,
  onClose,
}) => {
  const [history, setHistory] = useState<WarehouseMovementRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('warehouse_movements')
          .select('*')
          .eq('item_id', item.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro ao buscar histórico:', error)
          setHistory([])
          return
        }

        setHistory((data ?? []) as WarehouseMovementRow[])
      } catch (error) {
        console.error('Erro ao buscar histórico:', error)
        setHistory([])
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [item.id])

  let content;
  if (loading) {
    content = <S.EmptyMessage>Carregando histórico...</S.EmptyMessage>;
  } else if (history.length === 0) {
    content = <S.EmptyMessage>Nenhuma movimentação encontrada.</S.EmptyMessage>;
  } else {
    content = (
      <S.HistoryList>
        {history.map(entry => (
          <S.HistoryCard key={entry.id}>
            <S.HistoryTop>
              <S.HistoryType>{movementLabelMap[entry.movement_type]}</S.HistoryType>
              <S.HistoryDate>
                <FiClock size={14} />
                {new Date(entry.created_at).toLocaleString('pt-BR')}
              </S.HistoryDate>
            </S.HistoryTop>

            <S.HistoryGrid>
              <div>
                <span>Quantidade</span>
                <strong>{entry.quantity}</strong>
              </div>

              <div>
                <span>Antes</span>
                <strong>{entry.previous_quantity ?? '-'}</strong>
              </div>

              <div>
                <span>Depois</span>
                <strong>{entry.new_quantity ?? '-'}</strong>
              </div>

              <div>
                <span>Usuário</span>
                <strong>{entry.user_name || 'Usuário desconhecido'}</strong>
              </div>
            </S.HistoryGrid>

            {entry.notes && (
              <S.HistoryNotes>{entry.notes}</S.HistoryNotes>
            )}
          </S.HistoryCard>
        ))}
      </S.HistoryList>
    );
  }

  return (
    <S.Backdrop>
      <S.Modal>
        <S.ModalHeader>
          <div>
            <h2>Histórico de Movimentações</h2>
            <p>{item.item_name}</p>
          </div>

          <S.CloseButton type="button" onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        {content}
      </S.Modal>
    </S.Backdrop>
  )
}

export default WarehouseHistory