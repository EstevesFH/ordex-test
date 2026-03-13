import { useState } from 'react'
import { supabase } from '@/services/supabase'
import { Button } from '@/components'
import type { Location } from '../index'
import * as S from './styles'

interface Props {
  mode: 'create' | 'edit'
  location: Location | null
  onClose: () => void
  onUpdated: () => void
}

const LocationModal = ({ mode, location, onClose, onUpdated }: Props) => {
  const isEdit = mode === 'edit'

  const [locationName, setLocationName] = useState(
    location?.locationName || ''
  )

  const [status, setStatus] = useState<'Ativo' | 'Inativo'>(
    location?.status || 'Ativo'
  )

  const handleSave = async () => {
    if (!locationName.trim()) return alert('Informe o nome do local')

    if (isEdit && location) {
      await supabase
        .from('locations')
        .update({ locationName, status })
        .eq('id', location.id)
    } else {
      await supabase.from('locations').insert({
        locationName,
        status: 'Ativo'
      })
    }

    onUpdated()
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>
          {isEdit ? 'Editar Local' : 'Novo Local'}
        </S.Title>

        <S.Field>
          <label htmlFor="locationName">Nome do Local</label>
          <input
            id="locationName"
            value={locationName}
            onChange={e => setLocationName(e.target.value)}
          />
        </S.Field>

        {isEdit && (
          <S.Field>
            <label htmlFor="locationStatus">Status</label>
            <select
              id="locationStatus"
              value={status}
              onChange={e =>
                setStatus(e.target.value as 'Ativo' | 'Inativo')
              }
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </S.Field>
        )}

        <S.Actions>
          <Button title="Cancelar" variant="tertiary" onClick={onClose} />
          <Button title="Salvar" variant="primary" onClick={handleSave} />
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  )
}

export { LocationModal }
