import React, { useState } from 'react'
import { FiX, FiTrendingUp, FiTrendingDown, FiRefreshCw } from 'react-icons/fi'
import { Modal } from '../../../components/Modal'
import { Button } from '../../../components/Button'
import { useStockItems } from '../../../hooks/useStockItems'
import { useToast } from '../../../hooks/useToast'
import type { StockItem } from '../../../types'
import * as S from './StockMovementModal.styles'

interface StockMovementModalProps {
  item: StockItem
  onClose: () => void
  onSuccess: () => void
}

const StockMovementModal: React.FC<StockMovementModalProps> = ({ item, onClose, onSuccess }) => {
  const { updateQuantity } = useStockItems()
  const { addToast } = useToast()

  const [movementType, setMovementType] = useState<'in' | 'out' | 'adjustment'>('in')
  const [quantity, setQuantity] = useState<number>(0)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (quantity <= 0) {
      addToast('error', 'Quantidade deve ser maior que zero')
      return
    }

    setLoading(true)

    try {
      let newQuantity = item.quantity

      if (movementType === 'in') {
        newQuantity = item.quantity + quantity
      } else if (movementType === 'out') {
        newQuantity = item.quantity - quantity
        if (newQuantity < 0) {
          addToast('error', 'Quantidade insuficiente em estoque')
          setLoading(false)
          return
        }
      } else if (movementType === 'adjustment') {
        newQuantity = quantity
      }

      const result = await updateQuantity(item.id, newQuantity, reason || undefined)

      if (result.success) {
        addToast('success', 'Movimentação registrada com sucesso!')
        onSuccess()
      } else {
        addToast('error', result.error || 'Erro ao registrar movimentação')
      }
    } catch (err) {
      addToast('error', 'Erro inesperado ao processar movimentação')
    } finally {
      setLoading(false)
    }
  }

  const getNewQuantity = () => {
    if (movementType === 'in') {
      return item.quantity + quantity
    } else if (movementType === 'out') {
      return Math.max(0, item.quantity - quantity)
    } else {
      return quantity
    }
  }

  return (
    <Modal onClose={onClose} maxWidth="500px">
      <S.ModalHeader>
        <div>
          <h2>Movimentar Estoque</h2>
          <S.ItemName>{item.item_name}</S.ItemName>
        </div>
        <S.CloseButton onClick={onClose}>
          <FiX size={24} />
        </S.CloseButton>
      </S.ModalHeader>

      <S.CurrentStock>
        <S.StockLabel>Quantidade Atual</S.StockLabel>
        <S.StockValue critical={item.quantity <= item.min_quantity}>
          {item.quantity} unidades
        </S.StockValue>
        {item.quantity <= item.min_quantity && (
          <S.CriticalBadge>Estoque Crítico</S.CriticalBadge>
        )}
      </S.CurrentStock>

      <S.Form onSubmit={handleSubmit}>
        <S.TypeSelector>
          <S.TypeButton
            type="button"
            active={movementType === 'in'}
            onClick={() => setMovementType('in')}
            color="green"
          >
            <FiTrendingUp size={20} />
            <div>
              <strong>Entrada</strong>
              <span>Adicionar ao estoque</span>
            </div>
          </S.TypeButton>

          <S.TypeButton
            type="button"
            active={movementType === 'out'}
            onClick={() => setMovementType('out')}
            color="red"
          >
            <FiTrendingDown size={20} />
            <div>
              <strong>Saída</strong>
              <span>Retirar do estoque</span>
            </div>
          </S.TypeButton>

          <S.TypeButton
            type="button"
            active={movementType === 'adjustment'}
            onClick={() => setMovementType('adjustment')}
            color="blue"
          >
            <FiRefreshCw size={20} />
            <div>
              <strong>Ajuste</strong>
              <span>Definir quantidade exata</span>
            </div>
          </S.TypeButton>
        </S.TypeSelector>

        <S.Field>
          <label>
            {movementType === 'adjustment' ? 'Nova Quantidade *' : 'Quantidade *'}
          </label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            required
            min="0"
            step="1"
            placeholder="0"
          />
        </S.Field>

        <S.Field>
          <label>Motivo</label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={3}
            placeholder="Descreva o motivo da movimentação (opcional)"
          />
        </S.Field>

        <S.Preview>
          <S.PreviewLabel>Nova quantidade após movimentação:</S.PreviewLabel>
          <S.PreviewValue critical={getNewQuantity() <= item.min_quantity}>
            {getNewQuantity()} unidades
            {getNewQuantity() <= item.min_quantity && ' (Crítico)'}
          </S.PreviewValue>
        </S.Preview>

        <S.Actions>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Confirmar Movimentação'}
          </Button>
        </S.Actions>
      </S.Form>
    </Modal>
  )
}

export default StockMovementModal
