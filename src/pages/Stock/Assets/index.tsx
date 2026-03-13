import React, { useEffect, useMemo, useState } from 'react'
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { PageHeader } from '@/components/PageHeader'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'
import { getSessionUser } from '@/utils/session'
import AssetModal from './AssetModal'
import AssetDetailModal from './AssetModal/AssetDetail'
import * as S from './styles'

export interface AssetRow {
  id: number
  asset_name: string
  category: string | null
  serial_number: string | null
  tag_number: string | null
  location_id: number | null
  assigned_to: string | null
  condition: 'new' | 'good' | 'fair' | 'damaged' | null
  status: 'available' | 'in_use' | 'maintenance' | 'retired' | null
  acquisition_date: string | null
  acquisition_value: number | null
  notes: string | null
  created_at: string
  updated_at: string
  locations?: {
    id: number
    name: string
  } | null
  profiles?: {
    id: string
    name: string | null
  } | null
}

type AssetModalMode = 'create' | 'edit'

const categoryLabelMap: Record<string, string> = {
  durable: 'Durável',
  consumable: 'Consumível',
  hardware: 'Hardware',
  peripheral: 'Periférico',
  furniture: 'Mobiliário',
  network: 'Rede',
  other: 'Outro',
}

const statusLabelMap: Record<string, string> = {
  available: 'Ativo',
  in_use: 'Em uso',
  maintenance: 'Em Manutenção',
  retired: 'Descartado',
}

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<AssetRow[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedAsset, setSelectedAsset] = useState<AssetRow | null>(null)
  const [modalMode, setModalMode] = useState<AssetModalMode>('create')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const currentUser = getSessionUser()
  const isSupervisor = currentUser?.role === 'Supervisor'

  const fetchAssets = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('assets')
        .select(`
          id,
          asset_name,
          category,
          serial_number,
          tag_number,
          location_id,
          assigned_to,
          condition,
          status,
          acquisition_date,
          acquisition_value,
          notes,
          created_at,
          updated_at,
          locations:location_id (
            id,
            name
          ),
          profiles:assigned_to (
            id,
            name
          )
        `)
        .order('id', { ascending: false })

      if (error) {
        console.error('Erro ao buscar assets:', error)
        setAssets([])
        return
      }

      setAssets((data ?? []) as unknown as AssetRow[])
    } catch (error) {
      console.error('Erro ao buscar assets:', error)
      setAssets([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const normalizedSearch = search.trim().toLowerCase()

      const matchesSearch =
        !normalizedSearch ||
        asset.asset_name?.toLowerCase().includes(normalizedSearch) ||
        asset.serial_number?.toLowerCase().includes(normalizedSearch) ||
        asset.tag_number?.toLowerCase().includes(normalizedSearch) ||
        asset.locations?.name?.toLowerCase().includes(normalizedSearch) ||
        asset.profiles?.name?.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        !filterStatus || asset.status === filterStatus

      const matchesCategory =
        !filterCategory || asset.category === filterCategory

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [assets, search, filterStatus, filterCategory])

  const paginatedAssets = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredAssets.slice(start, end)
  }, [filteredAssets, page, itemsPerPage])

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('')
    setFilterCategory('')
    setPage(1)
  }

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count)
    setPage(1)
  }

  const openCreate = () => {
    setSelectedAsset(null)
    setModalMode('create')
    setIsFormOpen(true)
  }

  const openEdit = (asset: AssetRow) => {
    setSelectedAsset(asset)
    setModalMode('edit')
    setIsFormOpen(true)
  }

  const openDetail = (asset: AssetRow) => {
    setSelectedAsset(asset)
    setIsDetailOpen(true)
  }

  const closeForm = () => {
    setSelectedAsset(null)
    setIsFormOpen(false)
  }

  const closeDetail = () => {
    setSelectedAsset(null)
    setIsDetailOpen(false)
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
        { value: 'available', label: 'Ativo' },
        { value: 'in_use', label: 'Em uso' },
        { value: 'maintenance', label: 'Em manutenção' },
        { value: 'retired', label: 'Descartado' },
      ],
    },
    {
      label: 'Categoria',
      type: 'select',
      value: filterCategory,
      onChange: setFilterCategory,
      options: [
        { value: '', label: 'Todas' },
        { value: 'durable', label: 'Durável' },
        { value: 'consumable', label: 'Consumível' },
        { value: 'hardware', label: 'Hardware' },
        { value: 'peripheral', label: 'Periférico' },
        { value: 'network', label: 'Rede' },
        { value: 'furniture', label: 'Mobiliário' },
        { value: 'other', label: 'Outro' },
      ],
    },
  ]

  return (
    <>
      <PageHeader
        title="Assets"
        actions={
          <>
            {(search || filterStatus || filterCategory) && (
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
                Novo Asset
              </Button>
            )}
          </>
        }
      />

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
            {filteredAssets.length}{' '}
            {filteredAssets.length === 1 ? 'asset encontrado' : 'assets encontrados'}
          </h2>
        </S.TableHeader>

        {loading ? (
          <S.EmptyMessage>Carregando assets...</S.EmptyMessage>
        ) : (
          <S.TableWrapper>
            {filteredAssets.length === 0 ? (
              <S.EmptyMessage>Nenhum asset encontrado.</S.EmptyMessage>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Asset</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Local</th>
                    <th>Responsável</th>
                    <th>Patrimônio</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedAssets.map(asset => (
                    <tr key={asset.id}>
                      <td>{asset.id}</td>
                      <td>
                        <strong>{asset.asset_name}</strong>
                      </td>
                      <td>
                        <S.CategoryBadge category={asset.category === 'durable' ? 'durable' : 'consumable'}>
                          {categoryLabelMap[asset.category || 'other'] || 'Outro'}
                        </S.CategoryBadge>
                      </td>
                      <td>
                        <S.StatusBadge status={statusLabelMap[asset.status || 'available'] || 'Ativo'}>
                          {statusLabelMap[asset.status || 'available'] || 'Ativo'}
                        </S.StatusBadge>
                      </td>
                      <td>{asset.locations?.name || '-'}</td>
                      <td>{asset.profiles?.name || '-'}</td>
                      <td>{asset.tag_number || '-'}</td>
                      <td>
                        <S.Actions>
                          <S.ActionButton
                            type="button"
                            title="Visualizar"
                            onClick={() => openDetail(asset)}
                          >
                            <FiEye size={16} />
                          </S.ActionButton>

                          {!isSupervisor && (
                            <S.ActionButton
                              type="button"
                              title="Editar"
                              onClick={() => openEdit(asset)}
                            >
                              <FiEdit size={16} />
                            </S.ActionButton>
                          )}
                        </S.Actions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </S.TableWrapper>
        )}

        {filteredAssets.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filteredAssets.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </S.TableCard>

      {isFormOpen && (
        <AssetModal
          asset={selectedAsset}
          mode={modalMode}
          onClose={closeForm}
          onSuccess={() => {
            closeForm()
            fetchAssets()
          }}
        />
      )}

      {isDetailOpen && selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={closeDetail}
          onEdit={() => {
            setIsDetailOpen(false)
            openEdit(selectedAsset)
          }}
        />
      )}
    </>
  )
}

export { Assets }