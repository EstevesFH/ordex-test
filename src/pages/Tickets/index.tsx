import { useEffect, useMemo, useState } from 'react'
import { FiEdit, FiEye } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Pagination } from '@/components/Pagination'
import { PageHeader } from '@/components/PageHeader'
import Button from '@/components/Button'
import { Filter } from '@/components/Filter'
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

    return tickets.filter(ticket => {
      const matchesSearch =
        !normalizedSearch ||
        ticket.solicitante?.toLowerCase().includes(normalizedSearch) ||
        ticket.local?.toLowerCase().includes(normalizedSearch) ||
        ticket.produto?.toLowerCase().includes(normalizedSearch) ||
        ticket.descricao?.toLowerCase().includes(normalizedSearch) ||
        String(ticket.id).includes(normalizedSearch)

      const matchesStatus =
        !filterStatus || ticket.status === filterStatus

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

  const openEditModal = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setMode('edit')
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

  const tableContent = (() => {
    if (loading) {
      return <S.EmptyMessage>Carregando ordens de serviço...</S.EmptyMessage>
    }

    if (error) {
      return <S.ErrorMessage>{error}</S.ErrorMessage>
    }

    if (filteredTickets.length === 0) {
      return (
        <S.EmptyMessage>
          Nenhuma ordem de serviço encontrada.
        </S.EmptyMessage>
      )
    }

    return (
      <>
        <S.TableWrapper>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Solicitante</th>
                <th>Local</th>
                <th>Produto</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>
                    <S.TruncatedText title={ticket.solicitante}>
                      {ticket.solicitante}
                    </S.TruncatedText>
                  </td>
                  <td>
                    <S.TruncatedText title={ticket.local}>
                      {ticket.local}
                    </S.TruncatedText>
                  </td>
                  <td>
                    <S.TruncatedText title={ticket.produto}>
                      {ticket.produto}
                    </S.TruncatedText>
                  </td>
                  <td>{ticket.prioridade}</td>
                  <td>
                    <S.Status status={ticket.status}>{ticket.status}</S.Status>
                  </td>
                  <td>
                    <S.Actions>
                      <button
                        type="button"
                        title="Visualizar"
                        onClick={() => openViewModal(ticket)}
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        title="Editar"
                        onClick={() => openEditModal(ticket)}
                      >
                        <FiEdit />
                      </button>
                    </S.Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.TableWrapper>

        {filteredTickets.length > 0 && (
          <Pagination
            totalItems={filteredTickets.length}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </>
    )
  })()

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

      <S.TableCard>
        <S.TableHeader>
          <h2>
            {filteredTickets.length}{' '}
            {filteredTickets.length === 1
              ? 'OS encontrada'
              : 'OS encontradas'}
          </h2>
        </S.TableHeader>

        {tableContent}
      </S.TableCard>

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