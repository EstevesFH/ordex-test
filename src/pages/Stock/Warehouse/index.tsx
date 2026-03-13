import React, { useEffect, useMemo, useState } from 'react'
import { FiClock, FiEdit, FiPlus, FiTrendingUp } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { Pagination, PageHeader, Button } from '../../../components'
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

const statusLabelMap: Record<WarehouseItemRow['status'], string> = {
  available: 'Disponível',
  reserved: 'Reservado',
  unavailable: 'Indisponível',
}

const Warehouse: React.FC = () => {
  const [items, setItems] = useState<WarehouseItemRow[]>([])
  const [showCriticalOnly, setShowCriticalOnly] = useState(false)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('warehouse_items')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Erro ao buscar itens do almoxarifado:', error)
      setItems([])
      return
    }

    setItems((data ?? []) as WarehouseItemRow[])
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const lowStockItems = useMemo(
    () => items.filter((item) => item.quantity <= item.min_quantity),
    [items],
  )

  const filteredItems = useMemo(() => {
    if (!showCriticalOnly) return items
    return items.filter((item) => item.quantity <= item.min_quantity)
  }, [items, showCriticalOnly])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.slice(start, end)
  }, [filteredItems, page, itemsPerPage])

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  const handleShowCriticalItems = () => {
    setShowCriticalOnly(true)
    setPage(1)
  }

  const handleShowAllItems = () => {
    setShowCriticalOnly(false)
    setPage(1)
  }

  const handleCreate = () => {
    console.log('Novo item')
  }

  const handleHistory = (item: WarehouseItemRow) => {
    console.log('Histórico do item:', item)
  }

  const handleMovement = (item: WarehouseItemRow) => {
    console.log('Movimentar item:', item)
  }

  const handleEdit = (item: WarehouseItemRow) => {
    console.log('Editar item:', item)
  }

  return (
    <S.Container>
      <PageHeader
        title="Almoxarifado"
        actions={
          <>
            {showCriticalOnly && (
              <Button
                title="Ver todos"
                variant="secondary"
                size="small"
                onClick={handleShowAllItems}
              />
            )}

            <Button onClick={handleCreate}>
              <FiPlus size={18} />
              Novo Item
            </Button>
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
            onClick={handleShowCriticalItems}
          >
            Ver itens
          </Button>
        </S.Alert>
      )}

      <S.TableCard>
        <S.TableHeader>
          <h2>
            {filteredItems.length}{' '}
            {filteredItems.length === 1
              ? 'item encontrado'
              : 'itens encontrados'}
          </h2>
        </S.TableHeader>

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
                {paginatedItems.map((item) => {
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
                            onClick={() => handleHistory(item)}
                          >
                            <FiClock size={16} />
                          </S.ActionButton>

                          <S.ActionButton
                            type="button"
                            title="Movimentar"
                            onClick={() => handleMovement(item)}
                          >
                            <FiTrendingUp size={16} />
                          </S.ActionButton>

                          <S.ActionButton
                            type="button"
                            title="Editar"
                            onClick={() => handleEdit(item)}
                          >
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
    </S.Container>
  )
}

export { Warehouse }