import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import * as S from './styles'
import { Button } from '../../../../../components/Button'
import { User } from '../index'

interface UserModalProps {
  user?: User
  mode: 'create' | 'edit'
  onClose: () => void
  onUpdated: () => void
}

const UserModal = ({ user, mode, onClose, onUpdated }: UserModalProps) => {
  const isEdit = mode === 'edit'

  const [userName, setUserName] = useState('')
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit && user) {
      setUserName(user.userName)
      setStatus(user.status)
    }
  }, [isEdit, user])

  const handleSave = async () => {
    if (!userName.trim()) {
      alert('Informe o nome do usuário')
      return
    }

    setSaving(true)

    if (mode === 'create') {
      const { error } = await supabase.from('users').insert({
        userName,
        status: 'Ativo',
      })

      if (error) {
        console.error(error)
        alert('Erro ao criar usuário')
        setSaving(false)
        return
      }
    }

    if (mode === 'edit' && user) {
      const { error } = await supabase
        .from('users')
        .update({
          userName,
          status,
        })
        .eq('id', user.id)

      if (error) {
        console.error(error)
        alert('Erro ao atualizar usuário')
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
          {isEdit ? 'Editar Usuário' : 'Novo Usuário'}
        </S.Title>

        <S.Field>
          <label>Nome do usuário</label>
          <input
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </S.Field>

        {isEdit && (
          <S.Field>
            <label>Status</label>
            <select
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

export { UserModal }
