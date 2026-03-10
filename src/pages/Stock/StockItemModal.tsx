import React, { useState, useEffect } from 'react'
import { FiX, FiSave } from 'react-icons/fi'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { useStockItems } from '@/hooks/useStockItems'
import { useToast } from '@/hooks/useToast'
import type { StockItem, StockItemFormData } from '../../types'
import * as S from './StockItemModal.styles'

interface StockItemModalProps {
  item: StockItem | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: () => void
}

const StockItemModal: React.FC<StockItemModalProps> = ({ item, mode, onClose, onSuccess }) => {
  const { createStockItem, updateStockItem } = useStockItems()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<StockItemFormData>({
    item_name: '',
    item_type: '',
    quantity: 0,
    min_quantity: 5,
    status: 'Disponível',
  })

  useEffect(() => {
    if (item && mode === 'edit') {
      setFormData({
        item_name: item.item_name,
        item_type: item.item_type,
        quantity: item.quantity,
        min_quantity: item.min_quantity,
        unit_price: item.unit_price || undefined,
        location_id: item.location_id || undefined,
        status: item.status,
        notes: item.notes || '',
      })
    }
  }, [item, mode])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === 'create') {
        result = await createStockItem(formData)
      } else if (item) {
        result = await updateStockItem(item.id, formData)
      }

      if (result?.success) {
        onSuccess()
      } else {
        addToast('error', result?.error || 'Erro ao salvar item')
      }
    } catch {
      addToast('error', 'Erro inesperado ao salvar item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <S.ModalHeader>
        <h2>{mode === 'create' ? 'Novo Item de Estoque' : 'Editar Item'}</h2>
        <S.CloseButton onClick={onClose}>
          <FiX size={24} />
        </S.CloseButton>
      </S.ModalHeader>

      <S.Form onSubmit={handleSubmit}>
        <S.Section>
          <S.SectionTitle>Informações do Item</S.SectionTitle>

          <S.FormGrid>
            <S.Field>
              <label htmlFor="item_name">Nome do Item *</label>
              <input
                id="item_name"
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                required
                placeholder="Ex: Mouse USB Básico"
              />
            </S.Field>

            <S.Field>
              <label htmlFor="item_type">Tipo *</label>
              <input
                id="item_type"
                type="text"
                name="item_type"
                value={formData.item_type}
                onChange={handleChange}
                required
                placeholder="Ex: Periférico, Cabo, Armazenamento"
              />
            </S.Field>

            <S.Field>
              <label htmlFor="quantity">Quantidade *</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </S.Field>

            <S.Field>
              <label htmlFor="min_quantity">Quantidade Mínima *</label>
              <input
                id="min_quantity"
                type="number"
                name="min_quantity"
                value={formData.min_quantity}
                onChange={handleChange}
                required
                min="0"
              />
              <S.Hint>Alerta será criado quando atingir este valor</S.Hint>
            </S.Field>

            <S.Field>
              <label htmlFor="unit_price">Preço Unitário (R$)</label>
              <input
                id="unit_price"
                type="number"
                step="0.01"
                name="unit_price"
                value={formData.unit_price || ''}
                onChange={handleChange}
                placeholder="0.00"
              />
            </S.Field>

            <S.Field>
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Disponível">Disponível</option>
                <option value="Reservado">Reservado</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </S.Field>
          </S.FormGrid>
        </S.Section>

        <S.Section>
          <S.Field>
            <label htmlFor="notes">Observações</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Informações adicionais sobre o item..."
            />
          </S.Field>
        </S.Section>

        <S.Actions>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <FiSave size={18} />
            {loading ? 'Salvando...' : 'Salvar Item'}
          </Button>
        </S.Actions>
      </S.Form>
    </Modal>
  )
}

export default StockItemModal
