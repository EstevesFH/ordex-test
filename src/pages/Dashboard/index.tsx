import { useEffect, useMemo, useState } from 'react'
import { Pagination } from '@/components/Pagination'
import { supabase } from '@/services/supabase'
import { Loader } from '@/components/Loader'
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
          .select(
            `
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
            `,
          )
          .order('id', { ascending: false })

        console.log('tickets data:', data)
        console.log('tickets error:', error)

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
      tickets.filter(t =>
        ['Aberto', 'Em Andamento', 'Aguardando'].includes(t.status),
      ),
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
    return <Loader />
  }

  return (
    <S.Container>
      <S.Header>
        <h1>Painel de Controle</h1>
        <p>Visão geral das Ordens de Serviço e status do atendimento.</p>
      </S.Header>

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
          <strong>Prioridade:</strong> Ordem de serviço em aberto em <b>{firstOpenTicket.local}</b>.
        </S.Alert>
      )}

      <S.TableCard>
        <h2>Ordens Pendentes</h2>

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
              </tr>
            </thead>

            <tbody>
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.solicitante}</td>
                    <td>{ticket.local}</td>
                    <td>{ticket.produto}</td>
                    <td>{ticket.prioridade}</td>
                    <td>
                      <S.Badge status={ticket.status}>{ticket.status}</S.Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>Nenhum chamado encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </S.TableWrapper>

        {visibleTickets.length > 0 && (
          <Pagination
            totalItems={visibleTickets.length}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </S.TableCard>
    </S.Container>
  )
}

export { Dashboard }