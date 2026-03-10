import { useEffect, useState } from 'react'
import { supabase } from '../../../../../services/supabase'
import * as S from './styles'
import { Button } from '../../../../../components/Button'
import type { Accesses } from '../index'

interface AccessesModalProps {
  accesses?: Accesses
  mode: 'create' | 'edit'
  onClose: () => void
  onUpdated: () => void
}

const AccessesModal = ({ accesses, mode, onClose, onUpdated }: AccessesModalProps) => {
  const isEdit = mode === 'edit'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit && accesses) {
      setName(accesses.name)
      setEmail(accesses.email)
      setRole(accesses.role)
      setStatus(accesses.status)
    }
  }, [isEdit, accesses])

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !role.trim()) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    setSaving(true)

    if (mode === 'create') {
      const { error } = await supabase.from('accesses').insert({
        name,
        email,
        role,
        status: 'Ativo',
      })

      if (error) {
        alert('Erro ao criar acesso')
        setSaving(false)
        return
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) {
        alert('Acesso criado, mas falhou ao enviar e-mail de criação de senha.')
      } else {
        alert(`Acesso criado e e-mail enviado para ${email} criar a senha.`)
      }
    }

    if (mode === 'edit' && accesses) {
      const { error } = await supabase
        .from('accesses')
        .update({ name, email, role, status })
        .eq('id', accesses.id)

      if (error) {
        alert('Erro ao atualizar acesso')
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
        <S.Title>{isEdit ? 'Editar Acesso' : 'Novo Acesso'}</S.Title>

        <S.Field>
          <label>Nome</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
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
