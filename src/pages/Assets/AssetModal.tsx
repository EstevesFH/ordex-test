import React, { useState, useEffect } from 'react'
import { FiX, FiSave } from 'react-icons/fi'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { useAssets } from '@/hooks/useAssets'
import { useToast } from '@/hooks/useToast'
import type { Asset, AssetFormData } from '../../types'
import * as S from './AssetModal.styles'

interface AssetModalProps {
  asset: Asset | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: () => void
}

const AssetModal: React.FC<AssetModalProps> = ({ asset, mode, onClose, onSuccess }) => {
  const { createAsset, updateAsset } = useAssets()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<AssetFormData>({
    asset_name: '',
    asset_type: '',
    asset_category: 'durable',
    status: 'Ativo',
  })

  const [specs, setSpecs] = useState({
    cpu: '',
    ram: '',
    disk: '',
    screen: '',
  })

  useEffect(() => {
    if (asset && mode === 'edit') {
      setFormData({
        asset_name: asset.asset_name,
        asset_type: asset.asset_type,
        asset_category: asset.asset_category,
        serial_number: asset.serial_number || '',
        purchase_date: asset.purchase_date || '',
        warranty_expiry: asset.warranty_expiry || '',
        manufacturer: asset.manufacturer || '',
        model: asset.model || '',
        location_id: asset.location_id || undefined,
        responsible_user_id: asset.responsible_user_id || undefined,
        quantity: asset.quantity || 0,
        min_quantity: asset.min_quantity || 0,
        unit_price: asset.unit_price || undefined,
        status: asset.status,
        notes: asset.notes || '',
      })

      if (asset.specifications) {
        setSpecs({
          cpu: asset.specifications.cpu || '',
          ram: asset.specifications.ram || '',
          disk: asset.specifications.disk || '',
          screen: asset.specifications.screen || '',
        })
      }
    }
  }, [asset, mode])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSpecs(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Montar especificações se categoria for durável
      const specifications = formData.asset_category === 'durable' 
        ? Object.fromEntries(
            Object.entries(specs).filter(([, value]) => value.trim() !== '')
          )
        : undefined

      const dataToSubmit: AssetFormData = {
        ...formData,
        specifications,
      }

      let result
      if (mode === 'create') {
        result = await createAsset(dataToSubmit)
      } else if (asset) {
        result = await updateAsset(asset.id, dataToSubmit)
      }

      if (result?.success) {
        onSuccess()
      } else {
        addToast('error', result?.error || 'Erro ao salvar ativo')
      }
    } catch {
      addToast('error', 'Erro inesperado ao salvar ativo')
    } finally {
      setLoading(false)
    }
  }

  const isDurable = formData.asset_category === 'durable'

  return (
    <Modal onClose={onClose}>
      <S.ModalHeader>
        <h2>{mode === 'create' ? 'Novo Ativo' : 'Editar Ativo'}</h2>
        <S.CloseButton onClick={onClose}>
          <FiX size={24} />
        </S.CloseButton>
      </S.ModalHeader>

      <S.Form onSubmit={handleSubmit}>
        <S.Section>
          <S.SectionTitle>Informações Básicas</S.SectionTitle>

          <S.FormGrid>
            <S.Field>
              <label>Nome do Ativo *</label>
              <input
                type="text"
                name="asset_name"
                value={formData.asset_name}
                onChange={handleChange}
                required
                placeholder="Ex: Notebook Dell Latitude 5420"
              />
            </S.Field>

            <S.Field>
              <label>Tipo *</label>
              <input
                type="text"
                name="asset_type"
                value={formData.asset_type}
                onChange={handleChange}
                required
                placeholder="Ex: Notebook, Desktop, Servidor"
              />
            </S.Field>

            <S.Field>
              <label>Categoria *</label>
              <select
                name="asset_category"
                value={formData.asset_category}
                onChange={handleChange}
                required
              >
                <option value="durable">Bem Durável</option>
                <option value="consumable">Consumível</option>
              </select>
            </S.Field>

            <S.Field>
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Descartado">Descartado</option>
              </select>
            </S.Field>
          </S.FormGrid>
        </S.Section>

        {isDurable && (
          <S.Section>
            <S.SectionTitle>Dados de Bem Durável</S.SectionTitle>

            <S.FormGrid>
              <S.Field>
                <label>Nº de Série</label>
                <input
                  type="text"
                  name="serial_number"
                  value={formData.serial_number || ''}
                  onChange={handleChange}
                  placeholder="SN123456789"
                />
              </S.Field>

              <S.Field>
                <label>Fabricante</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer || ''}
                  onChange={handleChange}
                  placeholder="Dell, HP, Lenovo..."
                />
              </S.Field>

              <S.Field>
                <label>Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model || ''}
                  onChange={handleChange}
                  placeholder="Latitude 5420"
                />
              </S.Field>

              <S.Field>
                <label>Data de Compra</label>
                <input
                  type="date"
                  name="purchase_date"
                  value={formData.purchase_date || ''}
                  onChange={handleChange}
                />
              </S.Field>

              <S.Field>
                <label>Fim da Garantia</label>
                <input
                  type="date"
                  name="warranty_expiry"
                  value={formData.warranty_expiry || ''}
                  onChange={handleChange}
                />
              </S.Field>

              <S.Field>
                <label>Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="unit_price"
                  value={formData.unit_price || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </S.Field>
            </S.FormGrid>

            <S.SubSection>
              <label>Especificações Técnicas</label>
              <S.SpecGrid>
                <input
                  type="text"
                  name="cpu"
                  value={specs.cpu}
                  onChange={handleSpecChange}
                  placeholder="CPU (ex: Intel i7-1165G7)"
                />
                <input
                  type="text"
                  name="ram"
                  value={specs.ram}
                  onChange={handleSpecChange}
                  placeholder="RAM (ex: 16GB DDR4)"
                />
                <input
                  type="text"
                  name="disk"
                  value={specs.disk}
                  onChange={handleSpecChange}
                  placeholder="Disco (ex: 512GB NVMe SSD)"
                />
                <input
                  type="text"
                  name="screen"
                  value={specs.screen}
                  onChange={handleSpecChange}
                  placeholder="Tela (ex: 14 polegadas Full HD)"
                />
              </S.SpecGrid>
            </S.SubSection>
          </S.Section>
        )}

        {!isDurable && (
          <S.Section>
            <S.SectionTitle>Controle de Estoque</S.SectionTitle>

            <S.FormGrid>
              <S.Field>
                <label>Quantidade *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || 0}
                  onChange={handleChange}
                  required={!isDurable}
                  min="0"
                />
              </S.Field>

              <S.Field>
                <label>Quantidade Mínima *</label>
                <input
                  type="number"
                  name="min_quantity"
                  value={formData.min_quantity || 0}
                  onChange={handleChange}
                  required={!isDurable}
                  min="0"
                />
              </S.Field>

              <S.Field>
                <label>Preço Unitário (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="unit_price"
                  value={formData.unit_price || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </S.Field>
            </S.FormGrid>
          </S.Section>
        )}

        <S.Section>
          <S.Field>
            <label>Observações</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Informações adicionais sobre o ativo..."
            />
          </S.Field>
        </S.Section>

        <S.Actions>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <FiSave size={18} />
            {loading ? 'Salvando...' : 'Salvar Ativo'}
          </Button>
        </S.Actions>
      </S.Form>
    </Modal>
  )
}

export default AssetModal
