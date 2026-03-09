import React from 'react'
import * as S from './styles'
import { FiX } from 'react-icons/fi'

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
          <button onClick={onClose}><FiX size={20} /></button>
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
          <button className="secondary" onClick={onClose}>Cancelar</button>
          <button className="primary" onClick={onApply}>Aplicar</button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  )
}
