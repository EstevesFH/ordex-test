import { useEffect, useMemo, useState } from 'react'
import { Pagination } from '@/components/Pagination'
import { supabase } from '@/services/supabase'
import {
  Alert,
  Badge,
  Container,
  Header,
  StatusCard,
  StatusGrid,
  TableCard,
  TableWrapper,
} from './styles'

interface Ticket {
  id: number
  solicitante: string
  local: string
  prioridade: string
  produto: string
  descricao: string
  status: string
  dataabertura: string
}

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data, error } = await supabase.from('tickets').select('*')

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
      aberto: tickets.filter(t => t.status === 'Aberto').length,
      andamento: tickets.filter(t => t.status === 'Em Andamento').length,
      aguardando: tickets.filter(t => t.status === 'Aguardando').length,
      finalizado: tickets.filter(t => t.status === 'Finalizado').length,
    }),
    [tickets],
  )

  const firstOpenTicket = useMemo(() => tickets.find(t => t.status === 'Aberto'), [tickets])

  const visibleTickets = useMemo(
    () =>
      tickets
        .filter(t => ['Aberto', 'Em Andamento', 'Aguardando'].includes(t.status))
        .sort((a, b) => b.id - a.id),
    [tickets],
  )

  const paginatedTickets = useMemo(
    () => visibleTickets.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [visibleTickets, page, itemsPerPage],
  )

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  if (loading) {
    return <Container>Carregando dashboard...</Container>
  }

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <p>Visão geral dos chamados e status do atendimento.</p>
      </Header>

      <StatusGrid>
        <StatusCard>
          <span>Em Aberto</span>
          <strong>{statusCount.aberto}</strong>
        </StatusCard>
        <StatusCard>
          <span>Em Andamento</span>
          <strong>{statusCount.andamento}</strong>
        </StatusCard>
        <StatusCard>
          <span>Aguardando</span>
          <strong>{statusCount.aguardando}</strong>
        </StatusCard>
        <StatusCard>
          <span>Finalizadas</span>
          <strong>{statusCount.finalizado}</strong>
        </StatusCard>
      </StatusGrid>

      {firstOpenTicket && (
        <Alert>
          <strong>Prioridade:</strong> existe OS em aberto para <b>{firstOpenTicket.local}</b>.
        </Alert>
      )}

      <TableCard>
        <h2>Chamados em aberto / andamento</h2>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Solicitante</th>
                <th>Local</th>
                <th>Produto</th>
                <th>Prioridade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.solicitante}</td>
                  <td>{ticket.local}</td>
                  <td>{ticket.produto}</td>
                  <td>{ticket.prioridade}</td>
                  <td>
                    <Badge status={ticket.status}>{ticket.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>

        {visibleTickets.length > 0 && (
          <Pagination
            totalItems={visibleTickets.length}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </TableCard>
    </Container>
  )
}

export { Dashboard }
