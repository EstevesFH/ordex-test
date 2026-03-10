import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import type { Ticket } from '../../types'
import { FiEye, FiEdit } from 'react-icons/fi'
import { TicketModal } from './TicketModal'
import * as S from './styles'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchTickets = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
      setError('Erro ao carregar tickets. Tente novamente.')
      setTickets([])
    } else {
      setTickets(data as Ticket[])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const filteredTickets = tickets
    .filter(t => {
      const matchSearch = 
        t.solicitante.toLowerCase().includes(search.toLowerCase()) ||
        t.local.toLowerCase().includes(search.toLowerCase()) ||
        t.produto.toLowerCase().includes(search.toLowerCase()) ||
        t.descricao.toLowerCase().includes(search.toLowerCase())
      
      const matchStatus = filterStatus ? t.status === filterStatus : true
      const matchPrioridade = filterPrioridade ? t.prioridade === filterPrioridade : true
      
      return matchSearch && matchStatus && matchPrioridade
    })
    .sort((a, b) => b.id - a.id)

  const paginatedTickets = filteredTickets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const openView = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setMode('view')
  }

  const openEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setMode('edit')
  }

  const closeModal = () => setSelectedTicket(null)

  const handleUpdated = () => {
    fetchTickets()
    closeModal()
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('')
    setFilterPrioridade('')
    setPage(1)
  }

  const filterFields: FilterField[] = [
    { label: 'Buscar', type: 'text', value: search, onChange: setSearch },
    { 
      label: 'Status', 
      type: 'select', 
      value: filterStatus, 
      onChange: setFilterStatus, 
      options: ['Aberto', 'Em Andamento', 'Aguardando', 'Finalizado'] 
    },
    { 
      label: 'Prioridade', 
      type: 'select', 
      value: filterPrioridade, 
      onChange: setFilterPrioridade, 
      options: ['Alta', 'Baixa'] 
    }
  ]

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <S.Header>
        <h1>Ordens de Serviço</h1>
        <S.Controls>
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
        </S.Controls>
      </S.Header>

      <S.TableCard>
        <S.TableHeader>
          <h2>{filteredTickets.length} {filteredTickets.length === 1 ? 'OS encontrada' : 'OS encontradas'}</h2>
        </S.TableHeader>

        {error ? (
          <S.ErrorMessage>{error}</S.ErrorMessage>
        ) : filteredTickets.length === 0 ? (
          <S.EmptyMessage>Nenhuma OS encontrada</S.EmptyMessage>
        ) : (
          <>
            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Solicitante</th>
                    <th>Local</th>
                    <th>Prioridade</th>
                    <th>Produto</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.solicitante}</td>
                      <td>{ticket.local}</td>
                      <td>{ticket.prioridade}</td>
                      <td>{ticket.produto}</td>
                      <td title={ticket.descricao}>
                        <S.TruncatedText>{ticket.descricao}</S.TruncatedText>
                      </td>
                      <td>
                        <S.Status status={ticket.status}>
                          {ticket.status}
                        </S.Status>
                      </td>
                      <td>
                        <S.Actions>
                          <button 
                            onClick={() => openView(ticket)}
                            aria-label="Visualizar ticket"
                          >
                            <FiEye />
                          </button>
                          <button 
                            onClick={() => openEdit(ticket)}
                            aria-label="Editar ticket"
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

            <Pagination
              totalItems={filteredTickets.length}
              onPageChange={setPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </S.TableCard>

      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        fields={filterFields}
        onApply={() => { setPage(1); setIsFilterOpen(false) }}
      />

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          mode={mode}
          onClose={closeModal}
          onUpdated={handleUpdated}
        />
      )}
    </>
  )
}

export { Tickets }
