import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import { FiEdit } from 'react-icons/fi'
import * as S from './styles'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { UserModal } from './UserModal'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'

export interface User {
  id: string
  userName: string
  status: 'Ativo' | 'Inativo'
}

const UsersSettings = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<'edit' | null>(null)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, name, email, status')
      .order('name', { ascending: true })

    if (fetchError) {
      console.error(fetchError)
      setError('Erro ao carregar usuários')
      setUsers([])
    }

    if (data) {
      setUsers(
        data.map(item => ({
          id: String(item.id),
          userName: String(item.name || item.email || item.id),
          status: item.status === 'Inativo' ? 'Inativo' : 'Ativo',
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const openEdit = (user: User) => { setSelectedUser(user); setModalMode('edit') }
  const closeModal = () => { setSelectedUser(null); setModalMode(null) }

  const filteredUsers = users
    .filter(u =>
      u.userName.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus ? u.status === filterStatus : true)
    )
    .sort((a, b) => a.userName.toLowerCase().localeCompare(b.userName.toLowerCase()))

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const filterFields: FilterField[] = [
    { label: 'Usuário', type: 'text', value: search, onChange: setSearch },
    { label: 'Status', type: 'select', value: filterStatus, onChange: setFilterStatus, options: ['Ativo', 'Inativo'] }
  ]

  if (loading) return <Loader />

  return (
    <S.Container>
      <S.Header>
        <h1>Usuários</h1>
        <S.Controls>
          {(search || filterStatus) && (
            <Button
              title="Limpar filtros"
              variant="secondary"
              size="small"
              onClick={() => {
                setSearch('')
                setFilterStatus('')
                setPage(1)
              }}
            />
          )}
          <Button title="Filtrar" variant="secondary" onClick={() => setIsFilterOpen(true)} />
        </S.Controls>
      </S.Header>

      <S.TableCard>
        {error ? (
          <S.NoData>{error}</S.NoData>
        ) : filteredUsers.length === 0 ? (
          <S.NoData>Nenhum usuário encontrado</S.NoData>
        ) : (
          <>
            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.userName}</td>
                      <td><S.Status status={user.status}>{user.status}</S.Status></td>
                      <td>
                        <S.Actions>
                          <button onClick={() => openEdit(user)}><FiEdit /></button>
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.TableWrapper>
            <Pagination
              totalItems={filteredUsers.length}
              onPageChange={setPage}
              onItemsPerPageChange={setItemsPerPage}
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

      {modalMode && (
        <UserModal
          mode={modalMode}
          user={selectedUser || undefined}
          onClose={closeModal}
          onUpdated={() => { fetchUsers(); closeModal() }}
        />
      )}
    </S.Container>
  )
}

export { UsersSettings }
