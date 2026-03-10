import { useEffect, useState } from 'react'
import { supabase } from '../../../../../services/supabase'
import * as S from './styles'
import { Button } from '../../../../../components/Button'
import type { Product } from '../index'

interface ProductsModalProps {
  product?: Product
  mode: 'create' | 'edit'
  onClose: () => void
  onUpdated: () => void
}

const ProductsModal = ({ product, mode, onClose, onUpdated }: ProductsModalProps) => {
  const isEdit = mode === 'edit'

  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState('')
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit && product) {
      setProductName(product.productName)
      setProductType(product.productType)
      setStatus(product.status)
    }
  }, [isEdit, product])

  const handleSave = async () => {
    if (!productName.trim() || !productType.trim()) {
      alert('Preencha todos os campos')
      return
    }

    setSaving(true)

    if (mode === 'create') {
      const { error } = await supabase.from('products').insert({
        productName,
        productType,
        status: 'Ativo',
      })

      if (error) {
        console.error(error)
        alert('Erro ao criar produto')
        setSaving(false)
        return
      }
    }

    if (mode === 'edit' && product) {
      const { error } = await supabase
        .from('products')
        .update({
          productName,
          productType,
          status,
        })
        .eq('id', product.id)

      if (error) {
        console.error(error)
        alert('Erro ao atualizar produto')
        setSaving(false)
        return
      }
    }

    setSaving(false)
    onUpdated()
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>
          {isEdit ? 'Editar Produto' : 'Novo Produto'}
        </S.Title>

        <S.Field>
          <label>Nome do Produto</label>
          <input
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </S.Field>

        <S.Field>
          <label>Tipo do Produto</label>
          <select
            value={productType}
            onChange={e => setProductType(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="Equipamento">Equipamento</option>
            <option value="Estoque">Estoque</option>
          </select>
        </S.Field>

        {isEdit && (
          <S.Field>
            <label>Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as 'Ativo' | 'Inativo')}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </S.Field>
        )}

        <S.Actions>
          <Button
            title="Cancelar"
            variant="tertiary"
            onClick={onClose}
          />
          <Button
            title="Salvar"
            variant="primary"
            onClick={handleSave}
            disabled={saving}
          />
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  )
}

export { ProductsModal }
