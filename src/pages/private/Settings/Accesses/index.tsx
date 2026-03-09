import { useEffect, useState } from 'react'
import { supabase } from '../../../../services/supabase'
import { FiEdit } from 'react-icons/fi'
import * as S from './styles'
import { Loader } from '../../../../components/Loader'
import { Pagination } from '../../../../components/Pagination'
import { Button } from '../../../../components/Button'
import { Filter, FilterField } from '../../../../components/Filter'
import { AccessesModal } from './AccessesModal'

export interface Accesses {
  id: number
  name: string
  username: string
  password: string
  role: string
  status: 'Ativo' | 'Inativo'
}

const AccessesSettings = () => {
  const [accesses, setAccesses] = useState<Accesses[]>([])
  const [roles, setRoles] = useState<string[]>([])
  const [statusOptions, setStatusOptions] = useState<string[]>([])
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
    const { data } = await supabase.from('accesses').select('*')
    if (data) setAccesses(data as Accesses[])
    setLoading(false)
  }

  const fetchRoles = async () => {
    const { data } = await supabase.from('accesses').select('role')
    if (data) {
      const uniqueRoles = Array.from(new Set(data.map(item => item.role)))
      setRoles(uniqueRoles)
    }
  }

  const fetchStatusOptions = async () => {
    const { data } = await supabase.from('accesses').select('status')
    if (data) {
      const uniqueStatus = Array.from(new Set(data.map(item => item.status)))
      setStatusOptions(uniqueStatus)
    }
  }

  useEffect(() => {
    fetchAccesses()
    fetchRoles()
    fetchStatusOptions()
  }, [])

  const openCreate = () => { setSelectedAccesses(null); setModalMode('create') }
  const openEdit = (accesses: Accesses) => { setSelectedAccesses(accesses); setModalMode('edit') }
  const closeModal = () => { setSelectedAccesses(null); setModalMode(null) }

  const filteredAccesses = accesses
    .filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterRole ? a.role === filterRole : true) &&
      (filterStatus ? a.status === filterStatus : true)
    )
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

  const paginatedAccesses = filteredAccesses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const filterFields: FilterField[] = [
    { label: 'Nome', type: 'text', value: search, onChange: setSearch },
    { label: 'Função', type: 'select', value: filterRole, onChange: setFilterRole, options: roles },
    { label: 'Status', type: 'select', value: filterStatus, onChange: setFilterStatus, options: statusOptions }
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
              onClick={() => {
                setSearch('')
                setFilterRole('')
                setFilterStatus('')
                setPage(1)
              }}
            />
          )}
          <Button title="Filtrar" variant="secondary" onClick={() => setIsFilterOpen(true)} />
          <Button title="Novo Acesso" variant="primary" onClick={openCreate} />
        </S.Controls>
      </S.Header>

      <S.TableCard>
        {filteredAccesses.length === 0 ? (
          <S.NoData>Nenhum acesso encontrado</S.NoData>
        ) : (
          <>
            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Função</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccesses.map(accesses => (
                    <tr key={accesses.id}>
                      <td>{accesses.id}</td>
                      <td>{accesses.name}</td>
                      <td>{accesses.username}</td>
                      <td>{accesses.role}</td>
                      <td><S.Status status={accesses.status}>{accesses.status}</S.Status></td>
                      <td>
                        <S.Actions>
                          <button onClick={() => openEdit(accesses)}><FiEdit /></button>
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.TableWrapper>
            <Pagination
              totalItems={filteredAccesses.length}
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
        <AccessesModal
          mode={modalMode}
          accesses={selectedAccesses || undefined}
          onClose={closeModal}
          onUpdated={() => { fetchAccesses(); closeModal() }}
        />
      )}
    </S.Container>
  )
}

export { AccessesSettings }
