import React, { useEffect, useState } from 'react'
import { FiClock, FiMapPin, FiUser, FiX } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Button } from '@/components'
import * as S from './styles'
import type { AssetRow } from '../../index'

interface AssetHistoryRow {
  id: number
  asset_id: number
  action_type: string
  description: string | null
  user_id: string | null
  user_name: string | null
  created_at: string
}

interface AssetDetailModalProps {
  asset: AssetRow
  onClose: () => void
  onEdit: () => void
}

const statusLabelMap: Record<string, string> = {
  available: 'Ativo',
  in_use: 'Em uso',
  maintenance: 'Em Manutenção',
  retired: 'Descartado',
}

const conditionLabelMap: Record<string, string> = {
  new: 'Novo',
  good: 'Bom',
  fair: 'Regular',
  damaged: 'Danificado',
}

const categoryLabelMap: Record<string, string> = {
  durable: 'Durável',
  consumable: 'Consumível',
  hardware: 'Hardware',
  peripheral: 'Periférico',
  network: 'Rede',
  furniture: 'Mobiliário',
  other: 'Outro',
}

const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onEdit,
}) => {
  const [history, setHistory] = useState<AssetHistoryRow[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoadingHistory(true)

      try {
        const { data, error } = await supabase
          .from('asset_history')
          .select('*')
          .eq('asset_id', asset.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro ao buscar histórico:', error)
          setHistory([])
          return
        }

        setHistory((data ?? []) as AssetHistoryRow[])
      } catch (error) {
        console.error('Erro ao buscar histórico:', error)
        setHistory([])
      } finally {
        setLoadingHistory(false)
      }
    }

    fetchHistory()
  }, [asset.id])

  return (
    <S.Backdrop>
      <S.Modal>
        <S.Header>
          <div>
            <h2>{asset.asset_name}</h2>
            <p>Detalhes do ativo e histórico de alterações</p>
          </div>

          <S.HeaderActions>
            <Button
              title="Editar"
              variant="secondary"
              onClick={onEdit}
            />
            <S.CloseButton type="button" onClick={onClose}>
              <FiX size={20} />
            </S.CloseButton>
          </S.HeaderActions>
        </S.Header>

        <S.Content>
          <S.Section>
            <S.SectionTitle>Informações gerais</S.SectionTitle>

            <S.InfoGrid>
              <S.InfoCard>
                <span>Categoria</span>
                <strong>{categoryLabelMap[asset.category || 'other'] || 'Outro'}</strong>
              </S.InfoCard>

              <S.InfoCard>
                <span>Status</span>
                <S.StatusBadge status={statusLabelMap[asset.status || 'available'] || 'Ativo'}>
                  {statusLabelMap[asset.status || 'available'] || 'Ativo'}
                </S.StatusBadge>
              </S.InfoCard>

              <S.InfoCard>
                <span>Condição</span>
                <strong>{conditionLabelMap[asset.condition || 'good'] || 'Bom'}</strong>
              </S.InfoCard>

              <S.InfoCard>
                <span>Patrimônio</span>
                <strong>{asset.tag_number || '-'}</strong>
              </S.InfoCard>

              <S.InfoCard>
                <span>Número de série</span>
                <strong>{asset.serial_number || '-'}</strong>
              </S.InfoCard>

              <S.InfoCard>
                <span>Valor de aquisição</span>
                <strong>
                  {asset.acquisition_value !== null && asset.acquisition_value !== undefined
                    ? new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(asset.acquisition_value)
                    : '-'}
                </strong>
              </S.InfoCard>
            </S.InfoGrid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Alocação</S.SectionTitle>

            <S.MetaList>
              <S.MetaItem>
                <FiMapPin size={16} />
                <span>Local:</span>
                <strong>{asset.locations?.name || '-'}</strong>
              </S.MetaItem>

              <S.MetaItem>
                <FiUser size={16} />
                <span>Responsável:</span>
                <strong>{asset.profiles?.name || '-'}</strong>
              </S.MetaItem>
            </S.MetaList>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Observações</S.SectionTitle>
            <S.NotesBox>{asset.notes || 'Sem observações cadastradas.'}</S.NotesBox>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FiClock size={16} />
              Histórico
            </S.SectionTitle>

            {(() => {
              if (loadingHistory) {
                return <S.EmptyState>Carregando histórico...</S.EmptyState>
              }
              if (history.length === 0) {
                return <S.EmptyState>Nenhum histórico encontrado.</S.EmptyState>
              }
              return (
                <S.HistoryList>
                  {history.map(item => (
                    <S.HistoryCard key={item.id}>
                      <S.HistoryTop>
                        <strong>{item.action_type}</strong>
                        <span>
                          {new Date(item.created_at).toLocaleString('pt-BR')}
                        </span>
                      </S.HistoryTop>

                      <p>{item.description || 'Sem descrição.'}</p>

                      <small>Por: {item.user_name || 'Usuário desconhecido'}</small>
                    </S.HistoryCard>
                  ))}
                </S.HistoryList>
              )
            })()}
          </S.Section>
        </S.Content>
      </S.Modal>
    </S.Backdrop>
  )
}

export default AssetDetailModal