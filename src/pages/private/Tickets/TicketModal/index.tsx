import { useState } from 'react'
import type { Ticket } from '../../../../types'
import { supabase } from '../../../../services/supabase'
import * as S from './styles'
import { Button } from '../../../../components/Button'

interface TicketModalProps {
  ticket: Ticket
  mode: 'view' | 'edit'
  onClose: () => void
  onUpdated: () => void
}

const TicketModal = ({ ticket, mode, onClose, onUpdated }: TicketModalProps) => {
  const [status, setStatus] = useState<Ticket['status']>(ticket.status)
  const [retorno, setRetorno] = useState(ticket.retorno || '')
  const isEdit = mode === 'edit'

  const handleSave = async () => {
    const payload: Partial<Ticket> = {
      status,
      retorno,
    }

    if (status === 'Finalizado') {
      payload.datatermino = new Date().toISOString()
    }

    const { error } = await supabase
      .from('tickets')
      .update(payload)
      .eq('id', ticket.id)

    if (error) {
      console.error(error)
      alert('Erro ao atualizar a OS')
      return
    }

    onUpdated()
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Title>
          Ordem de Serviço #{ticket.id}
        </S.Title>

        <S.Grid>
          <S.Field>
            <label>Solicitante</label>
            <input value={ticket.solicitante} disabled />
          </S.Field>

          <S.Field>
            <label>Local</label>
            <input value={ticket.local} disabled />
          </S.Field>

          <S.Field>
            <label>Produto</label>
            <input value={ticket.produto} disabled />
          </S.Field>

          <S.Field>
            <label>Prioridade</label>
            <input value={ticket.prioridade} disabled />
          </S.Field>

          <S.Field full>
            <label>Descrição</label>
            <textarea value={ticket.descricao} disabled />
          </S.Field>

          <S.Field>
            <label>Status</label>
            {isEdit ? (
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as Ticket['status'])
                }
              >
                <option value="Aberto">Aberto</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Aguardando">Aguardando</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            ) : (
              <input value={ticket.status} disabled />
            )}
          </S.Field>

          <S.Field full>
            <label>Retorno</label>
            <textarea
              value={retorno}
              disabled={!isEdit}
              onChange={(e) => setRetorno(e.target.value)}
              placeholder={isEdit ? 'Informe o retorno técnico' : ''}
            />
          </S.Field>
        </S.Grid>

        <S.Actions>
          <Button title="Fechar" variant="tertiary" onClick={onClose} />

          {isEdit && (
            <Button title="Salvar" variant="primary" onClick={handleSave} />
          )}
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  )
}

export { TicketModal }
