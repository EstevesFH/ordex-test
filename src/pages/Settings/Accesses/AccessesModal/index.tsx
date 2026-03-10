import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { authUsersService } from '@/services/authUsers'
import type { Accesses } from '../index'
import * as S from './styles'

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
  const [role, setRole] = useState('Operador')
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

    try {
      if (mode === 'create') {
        await authUsersService.create({ name, email, role })
        alert(`Usuário criado no Auth e e-mail enviado para definir senha: ${email}`)
      }

      if (mode === 'edit' && accesses) {
        await authUsersService.update({
          id: accesses.id,
          name,
          email,
          role,
          status,
        })
      }

      onUpdated()
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar usuário no Auth')
    } finally {
      setSaving(false)
    }
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>{isEdit ? 'Editar Acesso (Auth)' : 'Novo Acesso (Auth)'}</S.Title>

        <S.Field>
          <label htmlFor="accesses-name">Nome</label>
          <input id="accesses-name" value={name} onChange={e => setName(e.target.value)} />
        </S.Field>

        <S.Field>
          <label htmlFor="accesses-email">E-mail</label>
          <input id="accesses-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </S.Field>

        <S.Field>
          <label htmlFor="accesses-role">Função</label>
          <select id="accesses-role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="Administrador">Administrador</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Operador">Operador</option>
          </select>
        </S.Field>

        {isEdit && (
          <S.Field>
            <label htmlFor="accesses-status">Status</label>
            <select id="accesses-status" value={status} onChange={e => setStatus(e.target.value as 'Ativo' | 'Inativo')}>
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
