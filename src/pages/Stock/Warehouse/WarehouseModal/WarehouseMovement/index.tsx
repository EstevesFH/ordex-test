import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Button } from '@/components/Button'
import { getSessionUser } from '@/utils/session'
import * as S from './styles'
import type { WarehouseItemRow } from '../../index'

interface WarehouseMovementProps {
  item: WarehouseItemRow
  onClose: () => void
  onSuccess: () => void
}

const movementLabelMap: Record<string, string> = {
  in: 'Entrada',
  out: 'Saída',
  adjustment: 'Ajuste',
}

const WarehouseMovement: React.FC<WarehouseMovementProps> = ({
  item,
  onClose,
  onSuccess,
}) => {
  const currentUser = getSessionUser()

  const [movementType, setMovementType] = useState<'in' | 'out' | 'adjustment'>('out')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const calculateNewQuantity = () => {
    const qty = Number(quantity || 0)

    if (movementType === 'in') return item.quantity + qty
    if (movementType === 'out') return item.quantity - qty
    return qty
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const qty = Number(quantity || 0)
      const previousQuantity = item.quantity
      const newQuantity = calculateNewQuantity()

      if (qty <= 0) {
        setSaving(false)
        return
      }

      if (movementType === 'out' && qty > item.quantity) {
        setSaving(false)
        return
      }

      let newStatus: 'available' | 'reserved' | 'unavailable' = item.status

      if (newQuantity <= 0) {
        newStatus = 'unavailable'
      } else if (item.status === 'unavailable') {
        newStatus = 'available'
      }

      const { error: updateError } = await supabase
        .from('warehouse_items')
        .update({
          quantity: newQuantity,
          status: newStatus,
        })
        .eq('id', item.id)

      if (updateError) throw updateError

      const { error: movementError } = await supabase
        .from('warehouse_movements')
        .insert({
          item_id: item.id,
          movement_type: movementType,
          quantity: qty,
          previous_quantity: previousQuantity,
          new_quantity: newQuantity,
          notes: notes.trim() || null,
          user_id: currentUser?.id || null,
          user_name: currentUser?.name || 'Usuário',
        })

      if (movementError) throw movementError

      onSuccess()
    } catch (error) {
      console.error('Erro ao registrar movimentação:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <S.Backdrop>
      <S.Modal>
        <S.ModalHeader>
          <h2>Movimentar Item</h2>

          <S.CloseButton type="button" onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ItemInfo>
          <strong>{item.item_name}</strong>
          <span>Quantidade atual: {item.quantity}</span>
        </S.ItemInfo>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <label htmlFor="movement-type-select">Tipo de movimentação</label>
            <select
              id="movement-type-select"
              value={movementType}
              onChange={e =>
                setMovementType(e.target.value as 'in' | 'out' | 'adjustment')
              }
            >
              <option value="in">Entrada</option>
              <option value="out">Saída</option>
              <option value="adjustment">Ajuste</option>
            </select>
          </S.Field>

          <S.Field>
            <label htmlFor="quantity-input">
              {movementType === 'adjustment' ? 'Nova quantidade' : 'Quantidade'}
            </label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </S.Field>

          <S.Field>
            <label htmlFor="notes-textarea">Observações</label>
            <textarea
              id="notes-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ex.: saída para OS, ajuste de contagem..."
            />
          </S.Field>

          <S.PreviewBox>
            <span>Tipo:</span>
            <strong>{movementLabelMap[movementType]}</strong>

            <span>Quantidade atual:</span>
            <strong>{item.quantity}</strong>

            <span>Quantidade final:</span>
            <strong>
              {Number.isNaN(calculateNewQuantity()) ? item.quantity : calculateNewQuantity()}
            </strong>
          </S.PreviewBox>

          <S.Actions>
            <Button
              type="button"
              variant="secondary"
              title="Cancelar"
              onClick={onClose}
            />

            <Button
              type="submit"
              title={saving ? 'Salvando...' : 'Confirmar movimentação'}
              disabled={saving}
            />
          </S.Actions>
        </S.Form>
      </S.Modal>
    </S.Backdrop>
  )
}

export default WarehouseMovement