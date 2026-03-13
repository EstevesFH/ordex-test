import React, { useEffect, useMemo, useState } from 'react'
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi'
import { supabase } from '@/services/supabase'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import { Table, type Column } from '@/components/Table'
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
    const normalizedSearch = search.trim().toLowerCase()

    return assets.filter((asset) => {
      const matchesSearch =
        !normalizedSearch ||
        asset.asset_name?.toLowerCase().includes(normalizedSearch) ||
        asset.serial_number?.toLowerCase().includes(normalizedSearch) ||
        asset.tag_number?.toLowerCase().includes(normalizedSearch) ||
        asset.locations?.name?.toLowerCase().includes(normalizedSearch) ||
        asset.profiles?.name?.toLowerCase().includes(normalizedSearch)

      const matchesStatus = !filterStatus || asset.status === filterStatus
      const matchesCategory = !filterCategory || asset.category === filterCategory

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

  const columns: Column<AssetRow>[] = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'Asset',
      key: 'asset_name',
      render: (asset) => <strong>{asset.asset_name}</strong>,
    },
    {
      title: 'Categoria',
      key: 'category',
      render: (asset) => {
        const category = asset.category ?? 'other'
        const badgeCategory =
          category === 'durable' ? 'durable' : 'consumable'

        return (
          <S.CategoryBadge category={badgeCategory}>
            {categoryLabelMap[category] || 'Outro'}
          </S.CategoryBadge>
        )
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (asset) => {
        const label = statusLabelMap[asset.status || 'available'] || 'Ativo'

        return <S.StatusBadge status={label}>{label}</S.StatusBadge>
      },
    },
    {
      title: 'Local',
      key: 'location',
      render: (asset) => asset.locations?.name || '-',
    },
    {
      title: 'Responsável',
      key: 'responsavel',
      render: (asset) => asset.profiles?.name || '-',
    },
    {
      title: 'Patrimônio',
      key: 'tag_number',
      render: (asset) => asset.tag_number || '-',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (asset) => (
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
      ),
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

      <Filter
        isOpen={isFilterOpen}
        fields={filterFields}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => {
          setPage(1)
          setIsFilterOpen(false)
        }}
      />

      <Table<AssetRow>
        title={`${filteredAssets.length} ${
          filteredAssets.length === 1
            ? 'asset encontrado'
            : 'assets encontrados'
        }`}
        columns={columns}
        data={paginatedAssets}
        loading={loading}
        emptyMessage="Nenhum asset encontrado."
        rowKey={(asset) => asset.id}
        totalItems={filteredAssets.length}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

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