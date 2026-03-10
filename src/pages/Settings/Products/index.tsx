import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'
import { FiEdit } from 'react-icons/fi'
import * as S from './styles'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { ProductsModal } from './ProductsModal'
import { Button } from '@/components/Button'
import { Filter } from '@/components/Filter'
import type { FilterField } from '@/components/Filter'

export interface Product {
  id: number
  productName: string
  productType: string
  status: 'Ativo' | 'Inativo'
}

const ProductsSettings = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*')
    if (data) setProducts(data as Product[])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const filteredProducts = products
    .filter(p =>
      p.productName.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? p.productType === filterType : true) &&
      (filterStatus ? p.status === filterStatus : true)
    )
    .sort((a, b) => a.productName.localeCompare(b.productName))

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const openCreate = () => { setSelectedProduct(null); setModalMode('create') }
  const openEdit = (product: Product) => { setSelectedProduct(product); setModalMode('edit') }
  const closeModal = () => { setSelectedProduct(null); setModalMode(null) }

  const filterFields: FilterField[] = [
    { label: 'Produto', type: 'text', value: search, onChange: setSearch },
    { label: 'Tipo', type: 'select', value: filterType, onChange: setFilterType, options: ['Equipamento', 'Estoque'] },
    { label: 'Status', type: 'select', value: filterStatus, onChange: setFilterStatus, options: ['Ativo', 'Inativo'] }
  ]

  return (
    <S.Container>
      <S.Header>
        <h1>Produtos</h1>
        <S.Controls>
            {(search || filterType || filterStatus) && (
                <Button
                title="Limpar filtros"
                variant="secondary"
                size="small"
                onClick={() => {
                    setSearch('')
                    setFilterType('')
                    setFilterStatus('')
                    setPage(1)
                }}
                />
            )}
            <Button title="Filtrar" variant="secondary" size="small" onClick={() => setIsFilterOpen(true)} />
            <Button title="Novo Produto" variant="primary" onClick={openCreate} />
        </S.Controls>
      </S.Header>

      {loading ? (
        <Loader />
      ) : (
        <S.TableCard>
          {filteredProducts.length === 0 ? (
            <S.NoData>Nenhum produto encontrado</S.NoData>
          ) : (
            <>
              <S.TableWrapper>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Produto</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{product.productType}</td>
                        <td><S.Status status={product.status}>{product.status}</S.Status></td>
                        <td>
                          <S.Actions>
                            <button onClick={() => openEdit(product)}><FiEdit /></button>
                          </S.Actions>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </S.TableWrapper>
              <Pagination
                totalItems={filteredProducts.length}
                onPageChange={setPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </>
          )}
        </S.TableCard>
      )}

      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        fields={filterFields}
        onApply={() => { setPage(1); setIsFilterOpen(false) }}
      />

      {modalMode && (
        <ProductsModal
          mode={modalMode}
          product={selectedProduct || undefined}
          onClose={closeModal}
          onUpdated={() => { fetchProducts(); closeModal() }}
        />
      )}
    </S.Container>
  )
}

export { ProductsSettings }
