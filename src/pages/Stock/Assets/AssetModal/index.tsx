import React, { useEffect, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { getSessionUser } from '@/utils/session'
import Button from '@/components/Button'
import * as S from './styles'
import type { AssetRow } from '../index'

interface LocationOption {
  id: number
  name: string
}

interface UserOption {
  id: string
  name: string | null
}

interface AssetModalProps {
  asset: AssetRow | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: () => void
}

const AssetModal: React.FC<AssetModalProps> = ({
  asset,
  mode,
  onClose,
  onSuccess,
}) => {
  const isEdit = mode === 'edit'
  const currentUser = getSessionUser()

  const [assetName, setAssetName] = useState('')
  const [category, setCategory] = useState('hardware')
  const [serialNumber, setSerialNumber] = useState('')
  const [tagNumber, setTagNumber] = useState('')
  const [locationId, setLocationId] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [condition, setCondition] = useState('good')
  const [status, setStatus] = useState('available')
  const [acquisitionDate, setAcquisitionDate] = useState('')
  const [acquisitionValue, setAcquisitionValue] = useState('')
  const [notes, setNotes] = useState('')

  const [locations, setLocations] = useState<LocationOption[]>([])
  const [users, setUsers] = useState<UserOption[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadOptions = async () => {
      const [{ data: locationsData }, { data: usersData }] = await Promise.all([
        supabase.from('locations').select('id, name').order('name'),
        supabase.from('profiles').select('id, name').order('name'),
      ])

      setLocations((locationsData ?? []) as LocationOption[])
      setUsers((usersData ?? []) as UserOption[])
    }

    loadOptions()
  }, [])

  useEffect(() => {
    if (!asset) return

    setAssetName(asset.asset_name || '')
    setCategory(asset.category || 'hardware')
    setSerialNumber(asset.serial_number || '')
    setTagNumber(asset.tag_number || '')
    setLocationId(asset.location_id ? String(asset.location_id) : '')
    setAssignedTo(asset.assigned_to || '')
    setCondition(asset.condition || 'good')
    setStatus(asset.status || 'available')
    setAcquisitionDate(asset.acquisition_date || '')
    setAcquisitionValue(
      asset.acquisition_value !== null && asset.acquisition_value !== undefined
        ? String(asset.acquisition_value)
        : '',
    )
    setNotes(asset.notes || '')
  }, [asset])

  const selectedLocationName = useMemo(() => {
    return locations.find(location => String(location.id) === locationId)?.name || null
  }, [locations, locationId])

  const selectedUserName = useMemo(() => {
    return users.find(user => user.id === assignedTo)?.name || null
  }, [users, assignedTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        asset_name: assetName.trim(),
        category,
        serial_number: serialNumber.trim() || null,
        tag_number: tagNumber.trim() || null,
        location_id: locationId ? Number(locationId) : null,
        assigned_to: assignedTo || null,
        condition,
        status,
        acquisition_date: acquisitionDate || null,
        acquisition_value: acquisitionValue ? Number(acquisitionValue) : null,
        notes: notes.trim() || null,
      }

      if (isEdit && asset) {
        const { error } = await supabase
          .from('assets')
          .update(payload)
          .eq('id', asset.id)

        if (error) throw error

        const historyText = [
          `Asset atualizado: ${payload.asset_name}`,
          selectedLocationName ? `Local: ${selectedLocationName}` : null,
          selectedUserName ? `Responsável: ${selectedUserName}` : null,
          `Status: ${status}`,
        ]
          .filter(Boolean)
          .join(' • ')

        await supabase.from('asset_history').insert({
          asset_id: asset.id,
          action_type: 'update',
          description: historyText,
          user_id: currentUser?.id || null,
          user_name: currentUser?.name || 'Usuário',
        })
      } else {
        const { data, error } = await supabase
          .from('assets')
          .insert(payload)
          .select('id')
          .single()

        if (error) throw error

        await supabase.from('asset_history').insert({
          asset_id: data.id,
          action_type: 'create',
          description: `Asset criado: ${payload.asset_name}`,
          user_id: currentUser?.id || null,
          user_name: currentUser?.name || 'Usuário',
        })
      }

      onSuccess()
    } catch (error) {
      console.error('Erro ao salvar asset:', error)
    } finally {
      setSaving(false)
    }
  }

  let buttonTitle = ''
  if (saving) {
    buttonTitle = 'Salvando...'
  } else if (isEdit) {
    buttonTitle = 'Salvar alterações'
  } else {
    buttonTitle = 'Criar asset'
  }

  return (
    <S.Backdrop>
      <S.Modal>
        <S.ModalHeader>
          <h2>{isEdit ? 'Editar Asset' : 'Novo Asset'}</h2>

          <S.CloseButton type="button" onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.Section>
            <S.SectionTitle>Informações principais</S.SectionTitle>

            <S.FormGrid>
              <S.Field>
                <label htmlFor="assetName">Nome do asset</label>
                <input
                  id="assetName"
                  value={assetName}
                  onChange={e => setAssetName(e.target.value)}
                  placeholder="Ex.: Notebook Dell Latitude"
                  required
                />
              </S.Field>

              <S.Field>
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="hardware">Hardware</option>
                  <option value="peripheral">Periférico</option>
                  <option value="network">Rede</option>
                  <option value="furniture">Mobiliário</option>
                  <option value="durable">Durável</option>
                  <option value="consumable">Consumível</option>
                  <option value="other">Outro</option>
                </select>
              </S.Field>

              <S.Field>
                <label htmlFor="serialNumber">Número de série</label>
                <input
                  id="serialNumber"
                  value={serialNumber}
                  onChange={e => setSerialNumber(e.target.value)}
                  placeholder="Ex.: SN123456"
                />
              </S.Field>

              <S.Field>
                <label htmlFor="tagNumber">Patrimônio</label>
                <input
                  id="tagNumber"
                  value={tagNumber}
                  onChange={e => setTagNumber(e.target.value)}
                  placeholder="Ex.: PAT-00123"
                />
              </S.Field>
            </S.FormGrid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Alocação e status</S.SectionTitle>

            <S.FormGrid>
              <S.Field>
                <label htmlFor="locationId">Local</label>
                <select
                  id="locationId"
                  value={locationId}
                  onChange={e => setLocationId(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </S.Field>

              <S.Field>
                <label htmlFor="assignedTo">Responsável</label>
                <select
                  id="assignedTo"
                  value={assignedTo}
                  onChange={e => setAssignedTo(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name || 'Usuário sem nome'}
                    </option>
                  ))}
                </select>
              </S.Field>

              <S.Field>
                <label htmlFor="condition">Condição</label>
                <select
                  id="condition"
                  value={condition}
                  onChange={e => setCondition(e.target.value)}
                >
                  <option value="new">Novo</option>
                  <option value="good">Bom</option>
                  <option value="fair">Regular</option>
                  <option value="damaged">Danificado</option>
                </select>
              </S.Field>

              <S.Field>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="available">Ativo</option>
                  <option value="in_use">Em uso</option>
                  <option value="maintenance">Em manutenção</option>
                  <option value="retired">Descartado</option>
                </select>
              </S.Field>
            </S.FormGrid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Aquisição</S.SectionTitle>

            <S.FormGrid>
              <S.Field>
                <label htmlFor="acquisitionDate">Data de aquisição</label>
                <input
                  id="acquisitionDate"
                  type="date"
                  value={acquisitionDate}
                  onChange={e => setAcquisitionDate(e.target.value)}
                />
              </S.Field>

              <S.Field>
                <label htmlFor="acquisitionValue">Valor de aquisição</label>
                <input
                  id="acquisitionValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={acquisitionValue}
                  onChange={e => setAcquisitionValue(e.target.value)}
                  placeholder="0,00"
                />
              </S.Field>
            </S.FormGrid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Observações</S.SectionTitle>

            <S.Field>
              <label htmlFor="notes">Notas</label>
              <textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Informações complementares do asset"
              />
            </S.Field>
          </S.Section>

          <S.Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              title="Cancelar"
            />

            <Button
              type="submit"
              title={buttonTitle}
              disabled={saving}
            />
          </S.Actions>
        </S.Form>
      </S.Modal>
    </S.Backdrop>
  )
}

export default AssetModal