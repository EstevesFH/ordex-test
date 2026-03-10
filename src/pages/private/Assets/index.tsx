import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit, FiEye, FiFilePlus } from 'react-icons/fi'
import { useAssets } from '../../../hooks/useAssets'
import { useToast } from '../../../hooks/useToast'
import type { Asset } from '../../../types'
import { Button } from '../../../components/Button'
import { Filter } from '../../../components/Filter'
import type { FilterField } from '../../../components/Filter'
import { Pagination } from '../../../components/Pagination'
import { SkeletonTable } from '../../../components/Skeleton'
import AssetModal from './AssetModal'
import AssetDetailModal from './AssetDetailModal'
import * as S from './styles'

const Assets: React.FC = () => {
  const { assets, loading, fetchAssets } = useAssets()
  const { addToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('view')
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  // Filtrar ativos
  const filteredAssets = assets.filter(asset => {
    const matchSearch =
      asset.asset_name.toLowerCase().includes(search.toLowerCase()) ||
      asset.serial_number?.toLowerCase().includes(search.toLowerCase()) ||
      asset.model?.toLowerCase().includes(search.toLowerCase())

    const matchCategory = filterCategory ? asset.asset_category === filterCategory : true
    const matchStatus = filterStatus ? asset.status === filterStatus : true

    return matchSearch && matchCategory && matchStatus
  })

  // Paginação
  const paginatedAssets = filteredAssets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const openCreate = () => {
    setSelectedAsset(null)
    setMode('create')
  }

  const openEdit = (asset: Asset) => {
    setSelectedAsset(asset)
    setMode('edit')
  }

  const openDetail = (asset: Asset) => {
    setSelectedAsset(asset)
    setShowDetailModal(true)
  }

  const closeModal = () => {
    setSelectedAsset(null)
    setMode('view')
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedAsset(null)
  }

  const handleSuccess = () => {
    fetchAssets()
    closeModal()
    addToast('success', 'Ativo salvo com sucesso!')
  }

  const clearFilters = () => {
    setSearch('')
    setFilterCategory('')
    setFilterStatus('')
    setPage(1)
  }

  const filterFields: FilterField[] = [
    { label: 'Buscar', type: 'text', value: search, onChange: setSearch },
    {
      label: 'Categoria',
      type: 'select',
      value: filterCategory,
      onChange: setFilterCategory,
      options: [
        { value: '', label: 'Todas' },
        { value: 'durable', label: 'Bem Durável' },
        { value: 'consumable', label: 'Consumível' },
      ],
    },
    {
      label: 'Status',
      type: 'select',
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { value: '', label: 'Todos' },
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' },
        { value: 'Em Manutenção', label: 'Em Manutenção' },
        { value: 'Descartado', label: 'Descartado' },
      ],
    },
  ]

  return (
    <>
      <S.Header>
        <h1>Gestão de Ativos de TI</h1>
        <Button onClick={openCreate}>
          <FiPlus size={18} />
          Novo Ativo
        </Button>
      </S.Header>

      <S.Controls>
        <Button variant="secondary" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          Filtros {(search || filterCategory || filterStatus) && '(Ativos)'}
        </Button>
        {(search || filterCategory || filterStatus) && (
          <Button variant="secondary" onClick={clearFilters}>
            Limpar Filtros
          </Button>
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
          <h2>{filteredAssets.length} {filteredAssets.length === 1 ? 'ativo encontrado' : 'ativos encontrados'}</h2>
        </S.TableHeader>

        {loading ? (
          <SkeletonTable rows={5} />
        ) : (
          <S.TableWrapper>
            {filteredAssets.length === 0 ? (
              <S.EmptyMessage>Nenhum ativo encontrado.</S.EmptyMessage>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th>Nº Série</th>
                    <th>Status</th>
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
                        <S.CategoryBadge category={asset.asset_category}>
                          {asset.asset_category === 'durable' ? 'Bem Durável' : 'Consumível'}
                        </S.CategoryBadge>
                      </td>
                      <td>{asset.asset_type}</td>
                      <td>{asset.serial_number || '-'}</td>
                      <td>
                        <S.StatusBadge status={asset.status}>
                          {asset.status}
                        </S.StatusBadge>
                      </td>
                      <td>
                        <S.Actions>
                          <S.ActionButton onClick={() => openDetail(asset)} title="Detalhes">
                            <FiEye size={16} />
                          </S.ActionButton>
                          <S.ActionButton onClick={() => openEdit(asset)} title="Editar">
                            <FiEdit size={16} />
                          </S.ActionButton>
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
            onItemsPerPageChange={setItemsPerPage}
          />
        )}
      </S.TableCard>

      {(mode === 'create' || mode === 'edit') && (
        <AssetModal
          asset={selectedAsset}
          mode={mode}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}

      {showDetailModal && selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={closeDetailModal}
          onEdit={() => {
            closeDetailModal()
            openEdit(selectedAsset)
          }}
        />
      )}
    </>
  )
}

export default Assets
