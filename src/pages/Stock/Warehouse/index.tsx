import React, { useEffect, useMemo, useState } from 'react'
import { FiClock, FiEdit, FiPlus, FiTrendingUp } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Pagination } from '@/components/Pagination'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'
import { getSessionUser } from '@/utils/session'
import WarehouseModal from './WarehouseModal'
import WarehouseMovement from './WarehouseModal/WarehouseMovement'
import WarehouseHistory from './WarehouseModal/WarehouseHistory'
import * as S from './styles'

export interface WarehouseItemRow {
  id: number
  item_name: string
  item_type: string
  quantity: number
  min_quantity: number
  unit_price: number | null
  status: 'available' | 'reserved' | 'unavailable'
  created_at: string
  updated_at: string
}

type ItemModalMode = 'create' | 'edit'

const statusLabelMap: Record<WarehouseItemRow['status'], string> = {
  available: 'Disponível',
  reserved: 'Reservado',
  unavailable: 'Indisponível',
}

const Warehouse: React.FC = () => {
  const [items, setItems] = useState<WarehouseItemRow[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showCriticalOnly, setShowCriticalOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedItem, setSelectedItem] = useState<WarehouseItemRow | null>(null)
  const [itemModalMode, setItemModalMode] = useState<ItemModalMode>('create')
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const currentUser = getSessionUser()
  const isSupervisor = currentUser?.role === 'Supervisor'

  const fetchItems = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('warehouse_items')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        console.error('Erro ao buscar warehouse_items:', error)
        setItems([])
        return
      }

      setItems((data ?? []) as WarehouseItemRow[])
    } catch (error) {
      console.error('Erro ao buscar warehouse_items:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const lowStockItems = useMemo(
    () => items.filter(item => item.quantity <= item.min_quantity),
    [items],
  )

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return items.filter(item => {
      const matchesSearch =
        !normalizedSearch ||
        item.item_name.toLowerCase().includes(normalizedSearch) ||
        item.item_type.toLowerCase().includes(normalizedSearch)

      const matchesStatus = !filterStatus || item.status === filterStatus
      const matchesCritical = !showCriticalOnly || item.quantity <= item.min_quantity

      return matchesSearch && matchesStatus && matchesCritical
    })
  }, [items, search, filterStatus, showCriticalOnly])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.slice(start, end)
  }, [filteredItems, page, itemsPerPage])

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('')
    setShowCriticalOnly(false)
    setPage(1)
  }

  const openCreate = () => {
    setSelectedItem(null)
    setItemModalMode('create')
    setIsItemModalOpen(true)
  }

  const openEdit = (item: WarehouseItemRow) => {
    setSelectedItem(item)
    setItemModalMode('edit')
    setIsItemModalOpen(true)
  }

  const openMovement = (item: WarehouseItemRow) => {
    setSelectedItem(item)
    setIsMovementModalOpen(true)
  }

  const openHistory = (item: WarehouseItemRow) => {
    setSelectedItem(item)
    setIsHistoryOpen(true)
  }

  const closeItemModal = () => {
    setSelectedItem(null)
    setIsItemModalOpen(false)
  }

  const closeMovementModal = () => {
    setSelectedItem(null)
    setIsMovementModalOpen(false)
  }

  const closeHistoryModal = () => {
    setSelectedItem(null)
    setIsHistoryOpen(false)
  }

  const filterFields: FilterField[] = [
    {
      label: 'Buscar',
      type: 'text',
      value: search,
      onChange: setSearch,
    },
    {
      label: 'Status',
      type: 'select',
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { value: '', label: 'Todos' },
        { value: 'available', label: 'Disponível' },
        { value: 'reserved', label: 'Reservado' },
        { value: 'unavailable', label: 'Indisponível' },
      ],
    },
  ]

  return (
    <>
      <PageHeader
        title="Warehouse"
        actions={
          <>
            {(search || filterStatus || showCriticalOnly) && (
              <Button
                title="Limpar filtros"
                variant="secondary"
                size="small"
                onClick={clearFilters}
              />
            )}

            <Button
              title="Filtrar"
              variant="secondary"
              size="small"
              onClick={() => setIsFilterOpen(true)}
            />

            {!isSupervisor && (
              <Button onClick={openCreate}>
                <FiPlus size={18} />
                Novo Item
              </Button>
            )}
          </>
        }
      />

      {lowStockItems.length > 0 && (
        <S.Alert>
          <S.AlertIcon>⚠️</S.AlertIcon>

          <div>
            <strong>Alerta de estoque crítico</strong>
            <p>
              {lowStockItems.length}{' '}
              {lowStockItems.length === 1
                ? 'item está abaixo do mínimo'
                : 'itens estão abaixo do mínimo'}
            </p>
          </div>

          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              setShowCriticalOnly(true)
              setIsFilterOpen(false)
            }}
          >
            Ver itens
          </Button>
        </S.Alert>
      )}

      {isFilterOpen && (
        <Filter
          isOpen={isFilterOpen}
          fields={filterFields}
          onClose={() => setIsFilterOpen(false)}
          onApply={() => {
            setPage(1)
            setIsFilterOpen(false)
          }}
        />
      )}

      <S.TableCard>
        <S.TableHeader>
          <h2>
            {filteredItems.length}{' '}
            {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
          </h2>
        </S.TableHeader>

        {loading ? (
          <S.EmptyMessage>Carregando itens...</S.EmptyMessage>
        ) : (
          <S.TableWrapper>
            {filteredItems.length === 0 ? (
              <S.EmptyMessage>Nenhum item encontrado.</S.EmptyMessage>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Mínimo</th>
                    <th>Status</th>
                    <th>Valor Unit.</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedItems.map(item => {
                    const isCritical = item.quantity <= item.min_quantity

                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <strong>{item.item_name}</strong>
                        </td>
                        <td>{item.item_type}</td>
                        <td>
                          <S.QuantityCell $critical={isCritical}>
                            {item.quantity}
                          </S.QuantityCell>
                        </td>
                        <td>{item.min_quantity}</td>
                        <td>
                          <S.StatusBadge status={statusLabelMap[item.status]}>
                            {statusLabelMap[item.status]}
                          </S.StatusBadge>
                        </td>
                        <td>
                          {item.unit_price === null
                            ? '-'
                            : new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.unit_price)}
                        </td>
                        <td>
                          <S.Actions>
                            <S.ActionButton
                              type="button"
                              title="Histórico"
                              onClick={() => openHistory(item)}
                            >
                              <FiClock size={16} />
                            </S.ActionButton>

                            {!isSupervisor && (
                              <S.ActionButton
                                type="button"
                                title="Movimentar"
                                onClick={() => openMovement(item)}
                              >
                                <FiTrendingUp size={16} />
                              </S.ActionButton>
                            )}

                            {!isSupervisor && (
                              <S.ActionButton
                                type="button"
                                title="Editar"
                                onClick={() => openEdit(item)}
                              >
                                <FiEdit size={16} />
                              </S.ActionButton>
                            )}
                          </S.Actions>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </S.TableWrapper>
        )}

        {filteredItems.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </S.TableCard>

      {isItemModalOpen && (
        <WarehouseModal
          item={selectedItem}
          mode={itemModalMode}
          onClose={closeItemModal}
          onSuccess={() => {
            closeItemModal()
            fetchItems()
          }}
        />
      )}

      {isMovementModalOpen && selectedItem && (
        <WarehouseMovement
          item={selectedItem}
          onClose={closeMovementModal}
          onSuccess={() => {
            closeMovementModal()
            fetchItems()
          }}
        />
      )}

      {isHistoryOpen && selectedItem && (
        <WarehouseHistory
          item={selectedItem}
          onClose={closeHistoryModal}
        />
      )}
    </>
  )
}

export { Warehouse }