import { useEffect, useMemo, useState } from 'react'
import { FiEdit, FiKey } from 'react-icons/fi'
import { Loader } from '../../../../components/Loader'
import { Pagination } from '../../../../components/Pagination'
import { Button } from '../../../../components/Button'
import { Filter } from '../../../../components/Filter'
import type { FilterField } from '../../../../components/Filter'
import { authUsersService } from '../../../../services/authUsers'
import * as S from './styles'
import { AccessesModal } from './AccessesModal'

export interface Accesses {
  id: string
  name: string
  email: string
  role: string
  status: 'Ativo' | 'Inativo'
  created_at?: string
}

const AccessesSettings = () => {
  const [accesses, setAccesses] = useState<Accesses[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedAccesses, setSelectedAccesses] = useState<Accesses | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)

  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchAccesses = async () => {
    setLoading(true)
    try {
      const users = await authUsersService.list()
      setAccesses(users)
    } catch (error) {
      console.error(error)
      alert('Erro ao carregar usuários do Auth')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccesses()
  }, [])

  const roles = useMemo(() => Array.from(new Set(accesses.map(item => item.role))).filter(Boolean), [accesses])
  const statusOptions = useMemo(
    () => Array.from(new Set(accesses.map(item => item.status))).filter(Boolean),
    [accesses]
  )

  const openCreate = () => {
    setSelectedAccesses(null)
    setModalMode('create')
  }

  const openEdit = (accessesItem: Accesses) => {
    setSelectedAccesses(accessesItem)
    setModalMode('edit')
  }

  const closeModal = () => {
    setSelectedAccesses(null)
    setModalMode(null)
  }

  const handleResetPassword = async (email: string) => {
    try {
      await authUsersService.resetPassword({ email })
      alert(`E-mail de redefinição enviado para ${email}`)
    } catch (error) {
      console.error(error)
      alert('Erro ao enviar e-mail de redefinição de senha')
    }
  }

  const handleResetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      alert('Erro ao enviar e-mail de redefinição de senha')
      return
    }

    alert(`E-mail de redefinição enviado para ${email}`)
  }

  const filteredAccesses = accesses
    .filter(a =>
      (a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())) &&
      (filterRole ? a.role === filterRole : true) &&
      (filterStatus ? a.status === filterStatus : true)
    )
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

  const paginatedAccesses = filteredAccesses.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const filterFields: FilterField[] = [
    { label: 'Nome ou e-mail', type: 'text', value: search, onChange: setSearch },
    { label: 'Função', type: 'select', value: filterRole, onChange: setFilterRole, options: [{ value: '', label: 'Todas' }, ...roles] },
    {
      label: 'Status',
      type: 'select',
      value: filterStatus,
      onChange: setFilterStatus,
      options: [{ value: '', label: 'Todos' }, ...statusOptions],
    },
  ]

  if (loading) return <Loader />

  return (
    <S.Container>
      <S.Header>
        <h1>Acessos (Auth)</h1>
        <S.Controls>
          {(search || filterRole || filterStatus) && (
            <Button
              title="Limpar filtros"
              variant="secondary"
              size="small"
              onClick={() => {
                setSearch('')
                setFilterRole('')
                setFilterStatus('')
                setPage(1)
              }}
            />
          )}
          <Button title="Filtrar" variant="secondary" size="small" onClick={() => setIsFilterOpen(true)} />
          <Button title="Novo Acesso" variant="primary" onClick={openCreate} />
        </S.Controls>
      </S.Header>

      <S.TableCard>
        {filteredAccesses.length === 0 ? (
          <S.NoData>Nenhum usuário encontrado</S.NoData>
        ) : (
          <>
            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Função</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccesses.map(accessesItem => (
                    <tr key={accessesItem.id}>
                      <td>{accessesItem.id.slice(0, 8)}...</td>
                      <td>{accessesItem.name}</td>
                      <td>{accessesItem.email}</td>
                      <td>{accessesItem.role}</td>
                      <td>
                        <S.Status status={accessesItem.status}>{accessesItem.status}</S.Status>
                      </td>
                      <td>
                        <S.Actions>
                          <button title="Editar" onClick={() => openEdit(accessesItem)}>
                            <FiEdit />
                          </button>
                          <button title="Redefinir senha" onClick={() => handleResetPassword(accessesItem.email)}>
                            <FiKey />
                          </button>
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.TableWrapper>
            <Pagination totalItems={filteredAccesses.length} onPageChange={setPage} onItemsPerPageChange={setItemsPerPage} />
          </>
        )}
      </S.TableCard>

      <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} fields={filterFields} onApply={() => { setPage(1); setIsFilterOpen(false) }} />

      {modalMode && (
        <AccessesModal
          mode={modalMode}
          accesses={selectedAccesses || undefined}
          onClose={closeModal}
          onUpdated={() => {
            fetchAccesses()
            closeModal()
          }}
        />
      )}
    </S.Container>
  )
}

export { AccessesSettings }
