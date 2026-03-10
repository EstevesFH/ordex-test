import { useEffect, useMemo, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { supabase } from '@/services/supabase'
import type { Ticket } from '../../types'
import * as S from './styles'

const ViewTickets = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from('tickets').select('*').order('id', { ascending: false })

      if (error) {
        setError('Erro ao carregar ordens de serviço. Tente novamente.')
        setTickets([])
      } else {
        setTickets((data as Ticket[]) || [])
      }

      setLoading(false)
    }

    fetchTickets()
  }, [])

  const filteredTickets = useMemo(() => {
    const searchLower = search.toLowerCase()
    return tickets.filter(t =>
      [t.solicitante, t.local, t.produto, t.descricao, t.id.toString()].some(value =>
        value.toLowerCase().includes(searchLower),
      ),
    )
  }, [tickets, search])

  if (loading) return <S.Loading>Carregando ordens de serviço...</S.Loading>

  let tableContent
  if (error) {
    tableContent = <S.ErrorMessage>{error}</S.ErrorMessage>
  } else if (filteredTickets.length === 0) {
    tableContent = <S.EmptyMessage>Nenhuma OS encontrada com os filtros atuais.</S.EmptyMessage>
  } else {
    tableContent = (
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
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
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
                  <S.Status status={ticket.status}>{ticket.status}</S.Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.TableWrapper>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Button onClick={() => navigate('/')}>
            <FiArrowLeft size={18} />
          </Button>
          <h1>Consulta de Ordens de Serviço</h1>
        </S.TitleWrapper>

        <S.SearchInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por solicitante, local, produto, descrição ou número..."
        />
      </S.Header>

      <S.TableCard>
        <S.TableHeader>
          <h2>
            {filteredTickets.length} {filteredTickets.length === 1 ? 'OS encontrada' : 'OS encontradas'}
          </h2>
        </S.TableHeader>

        {tableContent}
      </S.TableCard>
    </S.Container>
  )
}

export { ViewTickets }
