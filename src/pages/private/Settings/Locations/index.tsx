import { useEffect, useState } from 'react'
import { supabase } from '../../../../services/supabase'
import { FiEdit } from 'react-icons/fi'
import * as S from './styles'
import { Loader } from '../../../../components/Loader'
import { Pagination } from '../../../../components/Pagination'
import { Button } from '../../../../components/Button'
import { LocationModal } from './LocationModal'
import { Filter, FilterField } from '../../../../components/Filter'

export interface Location {
  id: number
  locationName: string
  status: 'Ativo' | 'Inativo'
}

const LocationsSettings = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchLocations = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('id', { ascending: false })

    if (!error) setLocations(data as Location[])
    setLoading(false)
  }

  useEffect(() => { fetchLocations() }, [])

  const openCreate = () => { setSelectedLocation(null); setModalMode('create') }
  const openEdit = (location: Location) => { setSelectedLocation(location); setModalMode('edit') }
  const closeModal = () => { setSelectedLocation(null); setModalMode(null) }

  const filteredLocations = locations
    .filter(l =>
        l.locationName.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus ? l.status === filterStatus : true)
    )
    .sort((a, b) =>
        a.locationName.toLowerCase().localeCompare(b.locationName.toLowerCase())
    )


  const paginated = filteredLocations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const filterFields: FilterField[] = [
    { label: 'Local', type: 'text', value: search, onChange: setSearch },
    { label: 'Status', type: 'select', value: filterStatus, onChange: setFilterStatus, options: ['Ativo', 'Inativo'] }
  ]

  if (loading) return <Loader />

  return (
    <S.Container>
      <S.Header>
        <h1>Locais</h1>
        <S.Controls>
            {(search || filterStatus) && (
            <Button
              title="Limpar filtros"
              variant="secondary"
              onClick={() => {
                setSearch('')
                setFilterStatus('')
                setPage(1)
              }}
            />
          )}
          <Button title="Filtrar" variant="secondary" onClick={() => setIsFilterOpen(true)} />
          <Button title="Novo Local" variant="primary" onClick={openCreate} />
        </S.Controls>
      </S.Header>

      <S.TableCard>
        {filteredLocations.length === 0 ? (
          <S.NoData>Nenhum local encontrado</S.NoData>
        ) : (
          <>
            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Local</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(location => (
                    <tr key={location.id}>
                      <td>{location.id}</td>
                      <td>{location.locationName}</td>
                      <td><S.Status status={location.status}>{location.status}</S.Status></td>
                      <td>
                        <S.Actions>
                          <button onClick={() => openEdit(location)}><FiEdit /></button>
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.TableWrapper>
            <Pagination
              totalItems={filteredLocations.length}
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
        <LocationModal
            mode={modalMode}
            location={selectedLocation || null}
            onClose={closeModal}
            onUpdated={() => { fetchLocations(); closeModal() }}
        />
      )}
    </S.Container>
  )
}

export { LocationsSettings }
