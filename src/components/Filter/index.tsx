import { FiX } from 'react-icons/fi'
import { Button } from '../Button'
import * as S from './styles'

export type FilterField = {
  label: string
  type: 'text' | 'select'
  value: string
  onChange: (value: string) => void
  options?: string[] | Array<{ value: string; label: string }>
}

export interface FilterProps {
  isOpen: boolean
  onClose: () => void
  fields: FilterField[]
  onApply: () => void
}

export const Filter = ({ isOpen, onClose, fields, onApply }: FilterProps) => {
  if (!isOpen) return null

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Header>
          <h2>Filtrar</h2>
          <S.CloseButton onClick={onClose}>
            <FiX size={18} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          {fields.map((field) => {
            if (field.type === 'text') {
              return (
                <S.Field key={field.label}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                  />
                </S.Field>
              )
            }

            if (field.type === 'select' && field.options) {
              return (
                <S.Field key={field.label}>
                  <label>{field.label}</label>
                  <select
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    {field.options.map((opt) => {
                      if (typeof opt === 'string') {
                        return <option key={opt} value={opt}>{opt}</option>
                      }
                      return <option key={opt.value} value={opt.value}>{opt.label}</option>
                    })}
                  </select>
                </S.Field>
              )
            }

            return null
          })}
        </S.Content>

        <S.Footer>
          <Button variant="secondary" size="small" onClick={onClose}>Cancelar</Button>
          <Button size="small" onClick={onApply}>Aplicar</Button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  )
}
