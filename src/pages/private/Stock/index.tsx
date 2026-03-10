import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit, FiAlertCircle, FiTrendingUp, FiClock } from 'react-icons/fi'
import { useStockItems } from '../../../hooks/useStockItems'
import { useToast } from '../../../hooks/useToast'
import type { StockItem } from '../../../types'
import { Button } from '../../../components/Button'
import { Filter } from '../../../components/Filter'
import type { FilterField } from '../../../components/Filter'
import { Pagination } from '../../../components/Pagination'
import { SkeletonTable } from '../../../components/Skeleton'
import StockItemModal from './StockItemModal'
import StockMovementModal from './StockMovementModal'
import StockMovementsHistoryModal from './StockMovementsHistoryModal'
import * as S from './styles'

const Stock: React.FC = () => {
  const { stockItems, loading, fetchStockItems, getLowStockItems } = useStockItems()
  const { addToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showLowStock, setShowLowStock] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | 'create' | 'movement' | 'history'>('view')

  useEffect(() => {
    fetchStockItems()
  }, [fetchStockItems])

  const lowStockItems = getLowStockItems()

  // Filtrar itens
  const filteredItems = stockItems.filter(item => {
    const matchSearch =
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.item_type.toLowerCase().includes(search.toLowerCase())

    const matchStatus = filterStatus ? item.status === filterStatus : true
    const matchLowStock = showLowStock ? item.quantity <= item.min_quantity : true

    return matchSearch && matchStatus && matchLowStock
  })

  // Paginação
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const openCreate = () => {
    setSelectedItem(null)
    setMode('create')
  }

  const openEdit = (item: StockItem) => {
    setSelectedItem(item)
    setMode('edit')
  }

  const openMovement = (item: StockItem) => {
    setSelectedItem(item)
    setMode('movement')
  }

  const openHistory = (item: StockItem) => {
    setSelectedItem(item)
    setMode('history')
  }

  const closeModal = () => {
    setSelectedItem(null)
    setMode('view')
  }

  const handleSuccess = () => {
    fetchStockItems()
    closeModal()
    addToast('success', 'Operação realizada com sucesso!')
  }

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('')
    setShowLowStock(false)
    setPage(1)
  }

  const filterFields: FilterField[] = [
    { label: 'Buscar', type: 'text', value: search, onChange: setSearch },
    {
      label: 'Status',
      type: 'select',
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { value: '', label: 'Todos' },
        { value: 'Disponível', label: 'Disponível' },
        { value: 'Reservado', label: 'Reservado' },
        { value: 'Indisponível', label: 'Indisponível' },
      ],
    },
  ]

  return (
    <>
      <S.Header>
        <h1>Estoque Inteligente</h1>
        <Button onClick={openCreate}>
          <FiPlus size={18} />
          Novo Item
        </Button>
      </S.Header>

      {/* Alerta de Estoque Crítico */}
      {lowStockItems.length > 0 && (
        <S.Alert>
          <S.AlertIcon>
            <FiAlertCircle size={24} />
          </S.AlertIcon>
          <div>
            <strong>⚠️ Alerta de Estoque Crítico</strong>
            <p>{lowStockItems.length} {lowStockItems.length === 1 ? 'item está' : 'itens estão'} com quantidade abaixo do mínimo</p>
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              setShowLowStock(true)
              setIsFilterOpen(false)
            }}
          >
            Ver Itens
          </Button>
        </S.Alert>
      )}

      <S.Controls>
        <Button
          title={`Filtrar ${(search || filterStatus || showLowStock) ? '(Ativos)' : ''}`.trim()}
          variant="secondary"
          size="small"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
        {showLowStock && (
          <S.LowStockBadge>
            <FiAlertCircle size={14} />
            Mostrando apenas estoque crítico
          </S.LowStockBadge>
        )}
        {(search || filterStatus || showLowStock) && (
          <Button title="Limpar filtros" variant="secondary" size="small" onClick={clearFilters} />
        )}
      </S.Controls>

      {isFilterOpen && (
        <Filter 
          isOpen={isFilterOpen}
          fields={filterFields} 
          onClose={() => setIsFilterOpen(false)}
          onApply={() => setIsFilterOpen(false)}
        />
      )}

      <S.TableCard>
        <S.TableHeader>
          <h2>{filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}</h2>
        </S.TableHeader>

        {loading ? (
          <SkeletonTable rows={5} />
        ) : (
          <S.TableWrapper>
            {filteredItems.length === 0 ? (
              <S.EmptyMessage>Nenhum item encontrado no estoque.</S.EmptyMessage>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Mín.</th>
                    <th>Status</th>
                    <th>Valor Unit.</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map(item => {
                    const isCritical = item.quantity <= item.min_quantity
                    const stockHealth = item.quantity / item.min_quantity

                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <strong>{item.item_name}</strong>
                        </td>
                        <td>{item.item_type}</td>
                        <td>
                          <S.QuantityCell critical={isCritical}>
                            {item.quantity} un.
                            {isCritical && <FiAlertCircle size={14} />}
                          </S.QuantityCell>
                        </td>
                        <td>{item.min_quantity} un.</td>
                        <td>
                          <S.StatusBadge status={item.status}>
                            {item.status}
                          </S.StatusBadge>
                        </td>
                        <td>
                          {item.unit_price
                            ? new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.unit_price)
                            : '-'}
                        </td>
                        <td>
                          <S.Actions>
                            <S.ActionButton onClick={() => openMovement(item)} title="Movimentar">
                              <FiTrendingUp size={16} />
                            </S.ActionButton>
                            <S.ActionButton onClick={() => openHistory(item)} title="Ver movimentações">
                              <FiClock size={16} />
                            </S.ActionButton>
                            <S.ActionButton onClick={() => openEdit(item)} title="Editar">
                              <FiEdit size={16} />
                            </S.ActionButton>
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
            onItemsPerPageChange={setItemsPerPage}
          />
        )}
      </S.TableCard>

      {(mode === 'create' || mode === 'edit') && (
        <StockItemModal
          item={selectedItem}
          mode={mode}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}

      {mode === 'movement' && selectedItem && (
        <StockMovementModal
          item={selectedItem}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}

      {mode === 'history' && selectedItem && (
        <StockMovementsHistoryModal
          item={selectedItem}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export { Stock }
