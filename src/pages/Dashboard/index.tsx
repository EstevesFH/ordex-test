import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/services/supabase'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Table, type Column } from '@/components/Table'
import * as S from './styles'

interface Ticket {
  id: number
  solicitante: string
  local: string
  prioridade: string
  produto: string
  descricao: string
  status: 'Aberto' | 'Em Andamento' | 'Aguardando' | 'Finalizado'
  dataabertura: string
  retorno?: string
  datatermino?: string
  asset_id?: number | string | null
  service_type?: string | null
}

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('tickets')
          .select(`
            id,
            solicitante,
            local,
            prioridade,
            produto,
            descricao,
            status,
            dataabertura,
            retorno,
            datatermino,
            asset_id,
            service_type
          `)
          .order('id', { ascending: false })

        if (error) {
          console.error('Erro ao buscar tickets:', error)
          setTickets([])
          return
        }

        setTickets((data ?? []) as Ticket[])
      } catch (error) {
        console.error('Erro ao buscar tickets:', error)
        setTickets([])
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const statusCount = useMemo(
    () => ({
      aberto: tickets.filter((t) => t.status === 'Aberto').length,
      andamento: tickets.filter((t) => t.status === 'Em Andamento').length,
      aguardando: tickets.filter((t) => t.status === 'Aguardando').length,
      finalizado: tickets.filter((t) => t.status === 'Finalizado').length,
    }),
    [tickets],
  )

  const firstOpenTicket = useMemo(
    () => tickets.find((t) => t.status === 'Aberto'),
    [tickets],
  )

  const visibleTickets = useMemo(
    () =>
      tickets.filter((t) =>
        ['Aberto', 'Em Andamento', 'Aguardando'].includes(t.status),
      ),
    [tickets],
  )

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage

    return visibleTickets.slice(start, end)
  }, [visibleTickets, page, itemsPerPage])

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  const columns: Column<Ticket>[] = [
    {
      title: '#',
      key: 'id',
    },
    {
      title: 'Solicitante',
      key: 'solicitante',
    },
    {
      title: 'Local',
      key: 'local',
    },
    {
      title: 'Produto',
      key: 'produto',
    },
    {
      title: 'Prioridade',
      key: 'prioridade',
    },
    {
      title: 'Status',
      key: 'status',
      render: (ticket) => (
        <S.Badge status={ticket.status}>{ticket.status}</S.Badge>
      ),
    },
  ]

  return (
    <S.Container>
      <PageHeader title="Painel de Controle" />

      {loading ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <>
          <S.StatusGrid>
            <S.StatusCard>
              <span>Em Aberto</span>
              <strong>{statusCount.aberto}</strong>
            </S.StatusCard>

            <S.StatusCard>
              <span>Em Andamento</span>
              <strong>{statusCount.andamento}</strong>
            </S.StatusCard>

            <S.StatusCard>
              <span>Aguardando</span>
              <strong>{statusCount.aguardando}</strong>
            </S.StatusCard>

            <S.StatusCard>
              <span>Finalizadas</span>
              <strong>{statusCount.finalizado}</strong>
            </S.StatusCard>
          </S.StatusGrid>

          {firstOpenTicket && (
            <S.Alert>
              <strong>Prioridade:</strong> Ordem de serviço em aberto em{' '}
              <b>{firstOpenTicket.local}</b>.
            </S.Alert>
          )}

          <Table<Ticket>
            title="Ordens Pendentes"
            columns={columns}
            data={paginatedTickets}
            emptyMessage="Nenhum chamado encontrado."
            rowKey={(ticket) => ticket.id}
            totalItems={visibleTickets.length}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </S.Container>
  )
}

export { Dashboard }