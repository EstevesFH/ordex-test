import React, { useState } from 'react'
import Button from '../Button'
import * as S from './styles'

export interface PaginationProps {
  totalItems?: number
  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
  itemsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

const Pagination = ({
  totalItems,
  currentPage: externalPage,
  totalPages: externalTotalPages,
  itemsPerPage: externalItemsPerPage,
  itemsPerPageOptions = [10, 25, 50],
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [page, setPage] = useState(externalPage || 1)
  const [itemsPerPage, setItemsPerPage] = useState(externalItemsPerPage || itemsPerPageOptions[0])

  const totalPages = externalTotalPages || (totalItems ? Math.ceil(totalItems / itemsPerPage) : 1)
  const calculatedTotalItems = totalItems || 0
  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, calculatedTotalItems)

  const changePage = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages))
    if (!externalPage) setPage(validPage)
    onPageChange(validPage)
  }

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCount = Number(e.target.value)
    if (!externalItemsPerPage) {
      setItemsPerPage(newCount)
      setPage(1)
    }
    onItemsPerPageChange(newCount)
  }

  React.useEffect(() => {
    if (externalPage !== undefined) setPage(externalPage)
  }, [externalPage])

  React.useEffect(() => {
    if (externalItemsPerPage !== undefined) setItemsPerPage(externalItemsPerPage)
  }, [externalItemsPerPage])

  return (
    <S.PaginationContainer>
      <div>
        <span>Página {page} de {totalPages}</span>
        <select value={itemsPerPage} onChange={handleItemsPerPage}>
          {itemsPerPageOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt} / pág
            </option>
          ))}
        </select>
        <span>
          {startItem}-{endItem} de {calculatedTotalItems}
        </span>
      </div>

      <div>
        <Button size="small" variant="secondary" disabled={page === 1} onClick={() => changePage(1)}>{'<<'}</Button>
        <Button size="small" variant="secondary" disabled={page === 1} onClick={() => changePage(page - 1)}>{'<'}</Button>
        <Button size="small" variant="secondary" disabled={page === totalPages} onClick={() => changePage(page + 1)}>{'>'}</Button>
        <Button size="small" variant="secondary" disabled={page === totalPages} onClick={() => changePage(totalPages)}>{'>>'}</Button>
      </div>
    </S.PaginationContainer>
  )
}

export { Pagination }
