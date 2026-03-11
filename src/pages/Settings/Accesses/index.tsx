import { useEffect, useMemo, useState } from 'react'
import { FiEdit, FiKey } from 'react-icons/fi'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'
import { authUsersService } from '@/services/authUsers'
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
      const users = await authUsersService.listProfiles()
      setAccesses(users)
    } catch (error) {
      console.error(error)
      alert('Erro ao carregar usuários')
      setAccesses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccesses()
  }, [])

  const roles = useMemo(
    () => Array.from(new Set(accesses.map(item => item.role))).filter(Boolean),
    [accesses],
  )

  const statusOptions = useMemo(
    () => Array.from(new Set(accesses.map(item => item.status))).filter(Boolean),
    [accesses],
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
      const ok = await authUsersService.resetPassword({ email })

      if (!ok) {
        alert('Não foi possível enviar o e-mail de redefinição')
        return
      }

      alert(`E-mail de redefinição enviado para ${email}`)
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Erro ao enviar e-mail de redefinição de senha'
      alert(message)
    }
  }

  const filteredAccesses = accesses
    .filter(a => {
      const term = search.trim().toLowerCase()

      const matchSearch =
        !term ||
        a.name.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term)

      const matchRole = filterRole ? a.role === filterRole : true
      const matchStatus = filterStatus ? a.status === filterStatus : true

      return matchSearch && matchRole && matchStatus
    })
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

  const paginatedAccesses = filteredAccesses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  const filterFields: FilterField[] = [
    {
      label: 'Nome ou e-mail',
      type: 'text',
      value: search,
      onChange: value => {
        setSearch(value)
        setPage(1)
      },
    },
    {
      label: 'Função',
      type: 'select',
      value: filterRole,
      onChange: value => {
        setFilterRole(value)
        setPage(1)
      },
      options: [
        { value: '', label: 'Todas' },
        ...roles.map(role => ({ value: role, label: role })),
      ],
    },
    {
      label: 'Status',
      type: 'select',
      value: filterStatus,
      onChange: value => {
        setFilterStatus(value)
        setPage(1)
      },
      options: [
        { value: '', label: 'Todos' },
        ...statusOptions.map(status => ({ value: status, label: status })),
      ],
    },
  ]

  if (loading) return <Loader />

  return (
    <S.Container>
      <S.Header>
        <h1>Acessos</h1>

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

          <Button
            title="Filtrar"
            variant="secondary"
            size="small"
            onClick={() => setIsFilterOpen(true)}
          />

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
                        <S.Status status={accessesItem.status}>
                          {accessesItem.status}
                        </S.Status>
                      </td>
                      <td>
                        <S.Actions>
                          <button title="Editar" onClick={() => openEdit(accessesItem)}>
                            <FiEdit />
                          </button>

                          <button
                            title="Redefinir senha"
                            onClick={() => handleResetPassword(accessesItem.email)}
                          >
                            <FiKey />
                          </button>
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.TableWrapper>

            <Pagination
              totalItems={filteredAccesses.length}
              currentPage={page}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
              onItemsPerPageChange={(count: number) => {
                setItemsPerPage(count)
                setPage(1)
              }}
            />
          </>
        )}
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