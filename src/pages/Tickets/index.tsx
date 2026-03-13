import { useEffect, useMemo, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Loader, PageHeader, Button, Filter, Table, type Column } from '@/components'
import { TicketModal } from './TicketModal'
import * as S from './styles'

import type { Ticket } from '@/types'

type TicketModalMode = 'view' | 'edit'

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [mode, setMode] = useState<TicketModalMode>('view')

  const fetchTickets = async () => {
    setLoading(true)
    setError('')

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
        setError('Não foi possível carregar as ordens de serviço.')
        setTickets([])
        return
      }

      setTickets((data ?? []) as Ticket[])
    } catch (err) {
      console.error('Erro ao buscar tickets:', err)
      setError('Ocorreu um erro ao carregar as ordens de serviço.')
      setTickets([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const filteredTickets = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tickets.filter((ticket) => {
      const matchesSearch =
        !normalizedSearch ||
        ticket.solicitante?.toLowerCase().includes(normalizedSearch) ||
        ticket.local?.toLowerCase().includes(normalizedSearch) ||
        ticket.produto?.toLowerCase().includes(normalizedSearch) ||
        ticket.descricao?.toLowerCase().includes(normalizedSearch) ||
        String(ticket.id).includes(normalizedSearch)

      const matchesStatus = !filterStatus || ticket.status === filterStatus
      const matchesPrioridade =
        !filterPrioridade || ticket.prioridade === filterPrioridade

      return matchesSearch && matchesStatus && matchesPrioridade
    })
  }, [tickets, search, filterStatus, filterPrioridade])

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage

    return filteredTickets.slice(start, end)
  }, [filteredTickets, page, itemsPerPage])

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('')
    setFilterPrioridade('')
    setPage(1)
  }

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  const openViewModal = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setMode('view')
  }

  const closeModal = () => {
    setSelectedTicket(null)
  }

  const handleUpdated = async () => {
    closeModal()
    await fetchTickets()
  }

  const filterFields = [
    {
      type: 'text' as const,
      name: 'search',
      label: 'Buscar',
      placeholder: 'ID, solicitante, local, produto...',
      value: search,
      onChange: (value: string) => setSearch(value),
    },
    {
      type: 'select' as const,
      name: 'status',
      label: 'Status',
      value: filterStatus,
      onChange: (value: string) => setFilterStatus(value),
      options: [
        { label: 'Todos', value: '' },
        { label: 'Aberto', value: 'Aberto' },
        { label: 'Em Andamento', value: 'Em Andamento' },
        { label: 'Aguardando', value: 'Aguardando' },
        { label: 'Finalizado', value: 'Finalizado' },
      ],
    },
    {
      type: 'select' as const,
      name: 'prioridade',
      label: 'Prioridade',
      value: filterPrioridade,
      onChange: (value: string) => setFilterPrioridade(value),
      options: [
        { label: 'Todas', value: '' },
        { label: 'Alta', value: 'Alta' },
        { label: 'Baixa', value: 'Baixa' },
      ],
    },
  ]

  const columns: Column<Ticket>[] = [
    {
      title: '#',
      key: 'id',
    },
    {
      title: 'Solicitante',
      key: 'solicitante',
      render: (ticket) => (
        <S.TruncatedText title={ticket.solicitante ?? ''}>
          {ticket.solicitante ?? ''}
        </S.TruncatedText>
      ),
    },
    {
      title: 'Local',
      key: 'local',
      render: (ticket) => (
        <S.TruncatedText title={ticket.local ?? ''}>
          {ticket.local ?? ''}
        </S.TruncatedText>
      ),
    },
    {
      title: 'Produto',
      key: 'produto',
      render: (ticket) => (
        <S.TruncatedText title={ticket.produto ?? ''}>
          {ticket.produto ?? ''}
        </S.TruncatedText>
      ),
    },
    {
      title: 'Prioridade',
      key: 'prioridade',
    },
    {
      title: 'Status',
      key: 'status',
      render: (ticket) => (
        <S.Status status={ticket.status}>{ticket.status}</S.Status>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (ticket) => (
        <S.Actions>
          <button
            type="button"
            title="Visualizar"
            onClick={() => openViewModal(ticket)}
          >
            <FiEye />
          </button>
        </S.Actions>
      ),
    },
  ]

  return (
    <S.Container>
      <PageHeader
        title="Ordens de Serviço"
        actions={
          <>
            {(search || filterStatus || filterPrioridade) && (
              <Button
                title="Limpar filtros"
                variant="secondary"
                size="small"
                onClick={clearFilters}
              />
            )}

            <Button
              title="Filtrar"
              variant="secondary"
              size="small"
              onClick={() => setIsFilterOpen(true)}
            />
          </>
        }
      />

      {loading ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <Table<Ticket>
          title={`${filteredTickets.length} ${
            filteredTickets.length === 1 ? 'OS encontrada' : 'OS encontradas'
          }`}
          columns={columns}
          data={paginatedTickets}
          error={error}
          emptyMessage="Nenhuma ordem de serviço encontrada."
          rowKey={(ticket) => ticket.id}
          totalItems={filteredTickets.length}
          currentPage={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        fields={filterFields}
        onApply={() => {
          setPage(1)
          setIsFilterOpen(false)
        }}
      />

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          mode={mode}
          onClose={closeModal}
          onUpdated={handleUpdated}
        />
      )}
    </S.Container>
  )
}

export { Tickets }