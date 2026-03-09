import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../services/supabase'
import type { Ticket } from '../../../types'
import { FiArrowLeft } from 'react-icons/fi'

const ViewTickets = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const fetchTickets = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
      setError('Erro ao carregar ordens de serviço. Tente novamente.')
      setTickets([])
    } else {
      setTickets(data as Ticket[])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const filteredTickets = tickets.filter(t => {
    const searchLower = search.toLowerCase()
    return (
      t.solicitante.toLowerCase().includes(searchLower) ||
      t.local.toLowerCase().includes(searchLower) ||
      t.produto.toLowerCase().includes(searchLower) ||
      t.descricao.toLowerCase().includes(searchLower) ||
      t.id.toString().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: 'white'
      }}>
        Carregando...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 style={{ color: 'white', fontSize: '28px', margin: 0 }}>
          Ordens de Serviço
        </h1>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por solicitante, local, produto ou descrição..."
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: 'white',
            fontSize: '15px',
            outline: 'none'
          }}
        />
      </div>

      {/* Table Card */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          {filteredTickets.length} {filteredTickets.length === 1 ? 'OS encontrada' : 'OS encontradas'}
        </h2>

        {error ? (
          <div style={{
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#fca5a5'
          }}>
            {error}
          </div>
        ) : filteredTickets.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px' }}>
            Nenhuma OS encontrada
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>#</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Solicitante</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Local</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Prioridade</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Produto</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Descrição</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '14px' }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', color: 'white' }}>{ticket.id}</td>
                    <td style={{ padding: '12px', color: 'white' }}>{ticket.solicitante}</td>
                    <td style={{ padding: '12px', color: 'white' }}>{ticket.local}</td>
                    <td style={{ padding: '12px', color: 'white' }}>{ticket.prioridade}</td>
                    <td style={{ padding: '12px', color: 'white' }}>{ticket.produto}</td>
                    <td style={{
                      padding: '12px',
                      color: 'white',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }} title={ticket.descricao}>
                      {ticket.descricao}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: 
                          ticket.status === 'Aberto' ? '#ef4444' :
                          ticket.status === 'Em Andamento' ? '#3b82f6' :
                          ticket.status === 'Aguardando' ? '#f59e0b' :
                          '#10b981',
                        color: 'white'
                      }}>
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export { ViewTickets }
