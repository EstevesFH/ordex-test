import { useEffect, useState } from 'react'
import { supabase } from '../../../services/supabase'
import { designSystem } from '../../../styles/designSystem'

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

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')

      if (error) {
        console.error('Erro ao buscar tickets:', error)
        setTickets([])
      } else {
        setTickets(data as Ticket[])
      }
    } catch (error) {
      console.error('Erro ao buscar tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusCount = {
    aberto: tickets.filter(t => t.status === 'Aberto').length,
    andamento: tickets.filter(t => t.status === 'Em Andamento').length,
    aguardando: tickets.filter(t => t.status === 'Aguardando').length,
    finalizado: tickets.filter(t => t.status === 'Finalizado').length,
  }

  const firstOpenTicket = tickets.find(t => t.status === 'Aberto')

  const visibleTickets = tickets
    .filter(t => ['Aberto', 'Em Andamento', 'Aguardando'].includes(t.status))
    .sort((a, b) => b.id - a.id)

  // Estilos padronizados
  const pageStyle: React.CSSProperties = {
    fontFamily: designSystem.typography.fontFamily,
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: designSystem.spacing.xxl,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: designSystem.typography.size.xxxl,
    fontWeight: designSystem.typography.weight.bold,
    color: designSystem.colors.textPrimary,
    margin: 0,
  }

  const gridStyle: React.CSSProperties = {

    import { useCallback, useEffect, useMemo, useState } from 'react';
    import { supabase } from '../../../services/supabase';
    import { designSystem } from '../../../styles/designSystem';

    interface Ticket {
      id: number;
      solicitante: string;
      local: string;
      prioridade: string;
      produto: string;
      descricao: string;
      status: string;
      dataabertura: string;
    }

    interface StatusCount {
      aberto: number;
      andamento: number;
      aguardando: number;
      finalizado: number;
    }

    const STATUS_LABELS: Record<keyof StatusCount, string> = {
      aberto: 'Em Aberto',
      andamento: 'Em Andamento',
      aguardando: 'Aguardando',
      finalizado: 'Finalizadas',
    };

    const STATUS_BADGE_COLORS: Record<string, string> = {
      Aberto: designSystem.colors.statusOpen,
      'Em Andamento': designSystem.colors.statusProgress,
      Aguardando: designSystem.colors.statusWaiting,
      Finalizado: designSystem.colors.statusClosed,
    };

    const getStatusBadgeStyle = (status: string): React.CSSProperties => ({
      display: 'inline-block',
      padding: `${designSystem.spacing.xs} ${designSystem.spacing.md}`,
      borderRadius: designSystem.radius.full,
      fontSize: designSystem.typography.size.sm,
      fontWeight: designSystem.typography.weight.semibold,
      background: STATUS_BADGE_COLORS[status] || designSystem.colors.primary,
      color: '#fff',
    });

    const useTickets = () => {
      const [tickets, setTickets] = useState<Ticket[]>([]);
      const [loading, setLoading] = useState<boolean>(true);

      const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase.from('tickets').select('*');
          if (error) {
            console.error('Erro ao buscar tickets:', error);
            setTickets([]);
          } else {
            setTickets((data ?? []) as Ticket[]);
          }
        } catch (error) {
          console.error('Erro ao buscar tickets:', error);
          setTickets([]);
        } finally {
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        fetchTickets();
      }, [fetchTickets]);

      return { tickets, loading };
    };

    const Dashboard: React.FC = () => {
      const { tickets, loading } = useTickets();

      const statusCount = useMemo<StatusCount>(
        () => ({
          aberto: tickets.filter((t) => t.status === 'Aberto').length,
          andamento: tickets.filter((t) => t.status === 'Em Andamento').length,
          aguardando: tickets.filter((t) => t.status === 'Aguardando').length,
          finalizado: tickets.filter((t) => t.status === 'Finalizado').length,
        }),
        [tickets]
      );

      const firstOpenTicket = useMemo(
        () => tickets.find((t) => t.status === 'Aberto'),
        [tickets]
      );

      const visibleTickets = useMemo(
        () =>
          tickets
            .filter((t) =>
              ['Aberto', 'Em Andamento', 'Aguardando'].includes(t.status)
            )
            .sort((a, b) => b.id - a.id),
        [tickets]
      );

      if (loading) {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              color: designSystem.colors.textSecondary,
              fontSize: designSystem.typography.size.lg,
            }}
          >
            Carregando...
          </div>
        );
      }

      return (
        <div style={{ fontFamily: designSystem.typography.fontFamily }}>
          {/* Header */}
          <header style={{ marginBottom: designSystem.spacing.xxl }}>
            <h1
              style={{
                fontSize: designSystem.typography.size.xxxl,
                fontWeight: designSystem.typography.weight.bold,
                color: designSystem.colors.textPrimary,
                margin: 0,
              }}
            >
              Dashboard
            </h1>
          </header>

          {/* Status Grid */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: designSystem.spacing.lg,
              marginBottom: designSystem.spacing.xxl,
            }}
          >
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <div
                key={key}
                style={{
                  background: designSystem.colors.surface,
                  padding: designSystem.spacing.xl,
                  borderRadius: designSystem.radius.xl,
                  border: `1px solid ${designSystem.colors.border}`,
                  boxShadow: designSystem.shadows.md,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: designSystem.typography.size.sm,
                    color: designSystem.colors.textSecondary,
                    fontWeight: designSystem.typography.weight.medium,
                    marginBottom: designSystem.spacing.sm,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: designSystem.typography.size.xxxl,
                    fontWeight: designSystem.typography.weight.bold,
                    color: designSystem.colors.primary,
                  }}
                >
                  {statusCount[key as keyof StatusCount]}
                </div>
              </div>
            ))}
          </section>

          {/* Alert */}
          {firstOpenTicket && (
            <aside
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: `1px solid ${designSystem.colors.warning}`,
                borderRadius: designSystem.radius.lg,
                padding: designSystem.spacing.lg,
                marginBottom: designSystem.spacing.xxl,
              }}
            >
              <div
                style={{
                  color: designSystem.colors.warning,
                  fontSize: designSystem.typography.size.base,
                  fontWeight: designSystem.typography.weight.semibold,
                  marginBottom: designSystem.spacing.sm,
                }}
              >
                ⚠ OS em aberto no setor:
              </div>
              <h3
                style={{
                  color: designSystem.colors.textPrimary,
                  fontSize: designSystem.typography.size.lg,
                  fontWeight: designSystem.typography.weight.semibold,
                  margin: 0,
                }}
              >
                {firstOpenTicket.local}
              </h3>
            </aside>
          )}

          {/* Table */}
          <section
            style={{
              background: designSystem.colors.surface,
              borderRadius: designSystem.radius.xl,
              padding: designSystem.spacing.xxl,
              boxShadow: designSystem.shadows.lg,
              border: `1px solid ${designSystem.colors.border}`,
            }}
          >
            <h2
              style={{
                fontSize: designSystem.typography.size.xl,
                fontWeight: designSystem.typography.weight.bold,
                color: designSystem.colors.textPrimary,
                marginBottom: designSystem.spacing.xl,
              }}
            >
              Chamados em Aberto / Andamento
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Solicitante</th>
                    <th style={thStyle}>Local</th>
                    <th style={thStyle}>Produto</th>
                    <th style={thStyle}>Prioridade</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td style={tdStyle}>{ticket.id}</td>
                      <td style={tdStyle}>{ticket.solicitante}</td>
                      <td style={tdStyle}>{ticket.local}</td>
                      <td style={tdStyle}>{ticket.produto}</td>
                      <td style={tdStyle}>{ticket.prioridade}</td>
                      <td style={tdStyle}>
                        <span style={getStatusBadgeStyle(ticket.status)}>
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      );
    };

    const thStyle: React.CSSProperties = {
      padding: designSystem.spacing.md,
      textAlign: 'left',
      fontSize: designSystem.typography.size.sm,
      fontWeight: designSystem.typography.weight.semibold,
      color: designSystem.colors.textSecondary,
      borderBottom: `2px solid ${designSystem.colors.border}`,
    };

    const tdStyle: React.CSSProperties = {
      padding: designSystem.spacing.md,
      fontSize: designSystem.typography.size.base,
      color: designSystem.colors.textPrimary,
      borderBottom: `1px solid ${designSystem.colors.border}`,
    };

    export { Dashboard };
