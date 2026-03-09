import { useEffect, useState } from 'react'
import { supabase } from '../../../../../services/supabase'
import * as S from './styles'
import { Button } from '../../../../../components/Button'
import { Accesses } from '../index'

interface AccessesModalProps {
  accesses?: Accesses
  mode: 'create' | 'edit'
  onClose: () => void
  onUpdated: () => void
}

const AccessesModal = ({ accesses, mode, onClose, onUpdated }: AccessesModalProps) => {
  const isEdit = mode === 'edit'
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit && accesses) {
      setName(accesses.name)
      setUsername(accesses.username)
      setPassword(accesses.password)
      setRole(accesses.role)
      setStatus(accesses.status)
    }
  }, [isEdit, accesses])

  const handleSave = async () => {
    if (!name.trim() || !username.trim() || !role.trim()) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    setSaving(true)

    if (mode === 'create') {
      const { error } = await supabase.from('accesses').insert({ name, username, password, role, status: 'Ativo' })
      if (error) { alert('Erro ao criar acesso'); setSaving(false); return }
    }

    if (mode === 'edit' && accesses) {
      const { error } = await supabase
        .from('accesses')
        .update({ name, username, password, role, status })
        .eq('id', accesses.id)
      if (error) { alert('Erro ao atualizar acesso'); setSaving(false); return }
    }

    setSaving(false)
    onUpdated()
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>{isEdit ? 'Editar Accesses' : 'Novo Accesses'}</S.Title>

        <S.Field>
          <label>Nome</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>Função</label>
          <input value={role} onChange={e => setRole(e.target.value)} />
        </S.Field>

        {isEdit && (
          <S.Field>
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as 'Ativo' | 'Inativo')}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </S.Field>
        )}

        <S.Actions>
          <Button title="Cancelar" variant="tertiary" onClick={onClose} />
          <Button title="Salvar" variant="primary" onClick={handleSave} disabled={saving} />
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  )
}

export { AccessesModal }
