import React, { useState, useEffect } from 'react'
import { FiX, FiEdit, FiUpload, FiDownload, FiClock, FiTool } from 'react-icons/fi'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { useAssets } from '@/hooks/useAssets'
import { useToast } from '@/hooks/useToast'
import type { Asset, Ticket, AssetHistory } from '../../types'
import Skeleton from '@/components/Skeleton'
import * as S from './AssetDetailModal.styles'

interface AssetDetailModalProps {
  asset: Asset
  onClose: () => void
  onEdit: () => void
}

const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose, onEdit }) => {
  const { uploadInvoice, fetchAssetHistory } = useAssets()
  const { addToast } = useToast()

  const [uploading, setUploading] = useState(false)
  const [historyData, setHistoryData] = useState<{
    history: AssetHistory[]
    tickets: Ticket[]
  } | null>(null)
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [asset.id])

  const loadHistory = async () => {
    setLoadingHistory(true)
    const result = await fetchAssetHistory(asset.id)
    if (result.success) {
      setHistoryData({
        history: result.history || [],
        tickets: result.tickets || [],
      })
    }
    setLoadingHistory(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      addToast('error', 'Apenas arquivos PDF ou imagens são permitidos')
      return
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast('error', 'O arquivo deve ter no máximo 5MB')
      return
    }

    setUploading(true)
    const result = await uploadInvoice(asset.id, file)
    
    if (result.success) {
      addToast('success', 'Nota fiscal enviada com sucesso!')
      // Recarregar dados do ativo aqui se necessário
    } else {
      addToast('error', result.error || 'Erro ao enviar nota fiscal')
    }
    
    setUploading(false)
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const isWarrantyExpired = asset.warranty_expiry 
    ? new Date(asset.warranty_expiry) < new Date()
    : false

  return (
    <Modal onClose={onClose} maxWidth="800px">
      <S.ModalHeader>
        <div>
          <h2>{asset.asset_name}</h2>
          <S.Subtitle>#{asset.id} • {asset.asset_type}</S.Subtitle>
        </div>
        <S.HeaderActions>
          <Button variant="secondary" onClick={onEdit}>
            <FiEdit size={16} />
            Editar
          </Button>
          <S.CloseButton onClick={onClose}>
            <FiX size={24} />
          </S.CloseButton>
        </S.HeaderActions>
      </S.ModalHeader>

      <S.Content>
        {/* Informações Básicas */}
        <S.Section>
          <S.SectionTitle>Informações Básicas</S.SectionTitle>
          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>Categoria</S.InfoLabel>
              <S.InfoValue>
                {asset.asset_category === 'durable' ? 'Bem Durável' : 'Consumível'}
              </S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>Status</S.InfoLabel>
              <S.StatusBadge status={asset.status}>{asset.status}</S.StatusBadge>
            </S.InfoItem>

            {asset.serial_number && (
              <S.InfoItem>
                <S.InfoLabel>Nº de Série</S.InfoLabel>
                <S.InfoValue>{asset.serial_number}</S.InfoValue>
              </S.InfoItem>
            )}

            {asset.manufacturer && (
              <S.InfoItem>
                <S.InfoLabel>Fabricante</S.InfoLabel>
                <S.InfoValue>{asset.manufacturer}</S.InfoValue>
              </S.InfoItem>
            )}

            {asset.model && (
              <S.InfoItem>
                <S.InfoLabel>Modelo</S.InfoLabel>
                <S.InfoValue>{asset.model}</S.InfoValue>
              </S.InfoItem>
            )}

            {asset.asset_category === 'consumable' && (
              <>
                <S.InfoItem>
                  <S.InfoLabel>Quantidade em Estoque</S.InfoLabel>
                  <S.InfoValue highlight={asset.quantity! <= asset.min_quantity!}>
                    {asset.quantity} unidades
                    {asset.quantity! <= asset.min_quantity! && ' (Crítico)'}
                  </S.InfoValue>
                </S.InfoItem>

                <S.InfoItem>
                  <S.InfoLabel>Quantidade Mínima</S.InfoLabel>
                  <S.InfoValue>{asset.min_quantity} unidades</S.InfoValue>
                </S.InfoItem>
              </>
            )}
          </S.InfoGrid>
        </S.Section>

        {/* Datas e Garantia (para bens duráveis) */}
        {asset.asset_category === 'durable' && (
          <S.Section>
            <S.SectionTitle>Datas e Garantia</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>Data de Compra</S.InfoLabel>
                <S.InfoValue>{formatDate(asset.purchase_date)}</S.InfoValue>
              </S.InfoItem>

              <S.InfoItem>
                <S.InfoLabel>Fim da Garantia</S.InfoLabel>
                <S.InfoValue highlight={isWarrantyExpired}>
                  {formatDate(asset.warranty_expiry)}
                  {isWarrantyExpired && ' (Expirada)'}
                </S.InfoValue>
              </S.InfoItem>

              {asset.unit_price && (
                <S.InfoItem>
                  <S.InfoLabel>Valor de Compra</S.InfoLabel>
                  <S.InfoValue>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(asset.unit_price)}
                  </S.InfoValue>
                </S.InfoItem>
              )}
            </S.InfoGrid>
          </S.Section>
        )}

        {/* Especificações Técnicas */}
        {asset.specifications && Object.keys(asset.specifications).length > 0 && (
          <S.Section>
            <S.SectionTitle>Especificações Técnicas</S.SectionTitle>
            <S.SpecList>
              {Object.entries(asset.specifications).map(([key, value]) => (
                <S.SpecItem key={key}>
                  <strong>{key.toUpperCase()}:</strong> {value}
                </S.SpecItem>
              ))}
            </S.SpecList>
          </S.Section>
        )}

        {/* Upload de Nota Fiscal */}
        <S.Section>
          <S.SectionTitle>Nota Fiscal</S.SectionTitle>
          {asset.invoice_url ? (
            <S.InvoiceCard>
              <div>
                <S.InvoiceFileName>{asset.invoice_file_name}</S.InvoiceFileName>
                <S.InvoiceLabel>Arquivo anexado</S.InvoiceLabel>
              </div>
              <Button
                as="a"
                href={asset.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <FiDownload size={16} />
                Baixar
              </Button>
            </S.InvoiceCard>
          ) : (
            <S.UploadArea>
              <FiUpload size={32} color="#94a3b8" />
              <p>Nenhuma nota fiscal anexada</p>
              <S.FileInput>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  id="invoice-upload"
                />
                <label htmlFor="invoice-upload">
                  {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
                </label>
              </S.FileInput>
              <S.UploadHint>PDF ou Imagem (máx. 5MB)</S.UploadHint>
            </S.UploadArea>
          )}
        </S.Section>

        {/* Histórico de Manutenções */}
        <S.Section>
          <S.SectionTitle>
            <FiTool size={18} />
            Histórico de Manutenções ({historyData?.tickets.length || 0} OSs)
          </S.SectionTitle>

          {loadingHistory ? (
            <Skeleton count={3} height="60px" />
          ) : historyData?.tickets && historyData.tickets.length > 0 ? (
            <S.TicketList>
              {historyData.tickets.map(ticket => (
                <S.TicketCard key={ticket.id}>
                  <S.TicketHeader>
                    <S.TicketId>OS #{ticket.id}</S.TicketId>
                    <S.TicketBadge status={ticket.status}>
                      {ticket.status}
                    </S.TicketBadge>
                  </S.TicketHeader>
                  <S.TicketInfo>
                    <p><strong>Descrição:</strong> {ticket.descricao}</p>
                    <p><strong>Solicitante:</strong> {ticket.solicitante}</p>
                    <p><strong>Tipo:</strong> {ticket.service_type === 'preventive' ? 'Preventiva' : 'Corretiva'}</p>
                  </S.TicketInfo>
                  <S.TicketDate>
                    <FiClock size={14} />
                    Aberta em {formatDate(ticket.dataabertura)}
                  </S.TicketDate>
                </S.TicketCard>
              ))}
            </S.TicketList>
          ) : (
            <S.EmptyState>Nenhuma manutenção registrada para este ativo.</S.EmptyState>
          )}
        </S.Section>

        {asset.notes && (
          <S.Section>
            <S.SectionTitle>Observações</S.SectionTitle>
            <S.NotesBox>{asset.notes}</S.NotesBox>
          </S.Section>
        )}
      </S.Content>
    </Modal>
  )
}

export default AssetDetailModal
