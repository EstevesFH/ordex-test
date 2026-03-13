import React, { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Button } from '@/components/Button'
import * as S from './styles'
import type { WarehouseItemRow } from '../index'

interface WarehouseModalProps {
  item: WarehouseItemRow | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: () => void
}

const WarehouseModal: React.FC<WarehouseModalProps> = ({
  item,
  mode,
  onClose,
  onSuccess,
}) => {
  const isEdit = mode === 'edit'

  const [itemName, setItemName] = useState('')
  const [itemType, setItemType] = useState('')
  const [quantity, setQuantity] = useState('0')
  const [minQuantity, setMinQuantity] = useState('0')
  const [unitPrice, setUnitPrice] = useState('')
  const [status, setStatus] = useState<'available' | 'reserved' | 'unavailable'>('available')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!item) return

    setItemName(item.item_name || '')
    setItemType(item.item_type || '')
    setQuantity(String(item.quantity ?? 0))
    setMinQuantity(String(item.min_quantity ?? 0))
    setUnitPrice(
      item.unit_price !== null && item.unit_price !== undefined
        ? String(item.unit_price)
        : '',
    )
    setStatus(item.status)
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        item_name: itemName.trim(),
        item_type: itemType.trim(),
        quantity: Number(quantity || 0),
        min_quantity: Number(minQuantity || 0),
        unit_price: unitPrice ? Number(unitPrice) : null,
        status,
      }

      if (isEdit && item) {
        const { error } = await supabase
          .from('warehouse_items')
          .update(payload)
          .eq('id', item.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('warehouse_items')
          .insert(payload)

        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Erro ao salvar item:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <S.Backdrop>
      <S.Modal>
        <S.ModalHeader>
          <h2>{isEdit ? 'Editar Item' : 'Novo Item'}</h2>

          <S.CloseButton type="button" onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGrid>
            <S.Field>
              <label>Nome do item</label>
              <input
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                placeholder="Ex.: Cabo HDMI"
                required
              />
            </S.Field>

            <S.Field>
              <label>Tipo</label>
              <input
                value={itemType}
                onChange={e => setItemType(e.target.value)}
                placeholder="Ex.: Eletrônicos"
                required
              />
            </S.Field>

            <S.Field>
              <label>Quantidade</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                required
              />
            </S.Field>

            <S.Field>
              <label>Quantidade mínima</label>
              <input
                type="number"
                min="0"
                value={minQuantity}
                onChange={e => setMinQuantity(e.target.value)}
                required
              />
            </S.Field>

            <S.Field>
              <label>Valor unitário</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={unitPrice}
                onChange={e => setUnitPrice(e.target.value)}
                placeholder="0,00"
              />
            </S.Field>

            <S.Field>
              <label>Status</label>
              <select
                value={status}
                onChange={e =>
                  setStatus(e.target.value as 'available' | 'reserved' | 'unavailable')
                }
              >
                <option value="available">Disponível</option>
                <option value="reserved">Reservado</option>
                <option value="unavailable">Indisponível</option>
              </select>
            </S.Field>
          </S.FormGrid>

          <S.Actions>
            <Button
              type="button"
              variant="secondary"
              title="Cancelar"
              onClick={onClose}
            />

            <Button
              type="submit"
              title={saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar item'}
              disabled={saving}
            />
          </S.Actions>
        </S.Form>
      </S.Modal>
    </S.Backdrop>
  )
}

export default WarehouseModal