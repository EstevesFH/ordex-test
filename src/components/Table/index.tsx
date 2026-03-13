import type { ReactNode } from 'react'
import { Pagination } from '@/components/Pagination'
import * as S from './styles'

type AccessorColumn<T> = {
  title: string
  key: keyof T
  render?: (item: T) => ReactNode
}

type CustomColumn<T> = {
  title: string
  key: string
  render: (item: T) => ReactNode
}

export type Column<T> = AccessorColumn<T> | CustomColumn<T>

interface TableProps<T> {
  title?: string
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  error?: string | null
  emptyMessage?: string
  rowKey?: (item: T, index: number) => string | number

  totalItems?: number
  currentPage?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (count: number) => void
}

const Table = <T extends object>({
  title,
  columns,
  data,
  loading = false,
  error,
  emptyMessage = 'Nenhum registro encontrado.',
  rowKey,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: TableProps<T>) => {
  const shouldShowPagination =
    !loading &&
    !error &&
    typeof totalItems === 'number' &&
    typeof currentPage === 'number' &&
    typeof itemsPerPage === 'number' &&
    typeof onPageChange === 'function' &&
    typeof onItemsPerPageChange === 'function' &&
    totalItems > 0

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>
  }

  let tableContent: ReactNode

  if (loading) {
    tableContent = <S.EmptyMessage>Carregando...</S.EmptyMessage>
  } else if (data.length === 0) {
    tableContent = <S.EmptyMessage>{emptyMessage}</S.EmptyMessage>
  } else {
    tableContent = (
      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th key={`${String(column.key)}-${columnIndex}`}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowKey ? rowKey(item, rowIndex) : rowIndex}>
                {columns.map((column, columnIndex) => {
                  const rawValue = item[column.key as keyof T]
                  let cellValue: ReactNode

                  if (column.render) {
                    cellValue = column.render(item)
                  } else if (rawValue === null || rawValue === undefined) {
                    cellValue = ''
                  } else if (rawValue instanceof Date) {
                    cellValue = rawValue.toLocaleDateString('pt-BR')
                  } else if (typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean') {
                    cellValue = String(rawValue)
                  } else {
                    cellValue = ''
                  }

                  return (
                    <td key={`${String(column.key)}-${columnIndex}`}>
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </S.TableWrapper>
    )
  }

  return (
    <S.TableCard>
      {title && (
        <S.TableHeader>
          <h2>{title}</h2>
        </S.TableHeader>
      )}

      {tableContent}

      {shouldShowPagination && (
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </S.TableCard>
  )
}

export { Table }