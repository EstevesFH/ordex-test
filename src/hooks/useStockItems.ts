import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/services/supabase'
import type { StockItem, StockItemFormData, StockMovement } from '../types'

export const useStockItems = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar todos os itens de estoque
  const fetchStockItems = useCallback(async (filters?: {
    status?: string
    lowStock?: boolean
    search?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('stock_items')
        .select('*')
        .order('item_name', { ascending: true })

      // Aplicar filtros
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.search) {
        query = query.or(
          `item_name.ilike.%${filters.search}%,item_type.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      let items = data as StockItem[]

      // Filtrar apenas itens com estoque baixo (se solicitado)
      if (filters?.lowStock) {
        items = items.filter(item => item.quantity <= item.min_quantity)
      }

      setStockItems(items)
    } catch (err) {
      console.error('Erro ao buscar itens de estoque:', err)
      setError('Erro ao carregar estoque')
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar item por ID
  const fetchStockItemById = useCallback(async (id: number) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('stock_items')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      return { success: true, data: data as StockItem }
    } catch (err) {
      console.error('Erro ao buscar item:', err)
      return { success: false, error: 'Erro ao carregar item' }
    }
  }, [])

  // Criar novo item de estoque
  const createStockItem = useCallback(async (data: StockItemFormData) => {
    try {
      const { data: newItem, error: insertError } = await supabase
        .from('stock_items')
        .insert([data])
        .select()
        .single()

      if (insertError) throw insertError

      setStockItems(prev => [...prev, newItem as StockItem])

      return { success: true, data: newItem }
    } catch (err) {
      console.error('Erro ao criar item:', err)
      return { success: false, error: 'Erro ao criar item' }
    }
  }, [])

  // Atualizar item de estoque
  const updateStockItem = useCallback(async (id: number, data: Partial<StockItemFormData>) => {
    try {
      const { data: updatedItem, error: updateError } = await supabase
        .from('stock_items')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setStockItems(prev =>
        prev.map(item => (item.id === id ? (updatedItem as StockItem) : item))
      )

      return { success: true, data: updatedItem }
    } catch (err) {
      console.error('Erro ao atualizar item:', err)
      return { success: false, error: 'Erro ao atualizar item' }
    }
  }, [])

  // Deletar item de estoque
  const deleteStockItem = useCallback(async (id: number) => {
    try {
      const { error: deleteError } = await supabase
        .from('stock_items')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setStockItems(prev => prev.filter(item => item.id !== id))

      return { success: true }
    } catch (err) {
      console.error('Erro ao deletar item:', err)
      return { success: false, error: 'Erro ao deletar item' }
    }
  }, [])

  // Atualizar quantidade do estoque (entrada/saída)
  const updateQuantity = useCallback(async (
    itemId: number,
    newQuantity: number,
    reason?: string,
    ticketId?: number,
    performedBy?: string
  ) => {
    try {
      // Buscar item atual para obter quantidade anterior
      const { data: currentItem, error: fetchError } = await supabase
        .from('stock_items')
        .select('quantity')
        .eq('id', itemId)
        .single()

      if (fetchError) throw fetchError

      const previousQuantity = currentItem.quantity

      // Atualizar quantidade
      const { data: updatedItem, error: updateError } = await supabase
        .from('stock_items')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString() 
        })
        .eq('id', itemId)
        .select()
        .single()

      if (updateError) throw updateError

      // Criar registro de movimentação
      let movementType: string;
      if (newQuantity > previousQuantity) {
        movementType = 'in';
      } else if (newQuantity < previousQuantity) {
        movementType = 'out';
      } else {
        movementType = 'adjustment';
      }

      const { error: movementError } = await supabase
        .from('stock_movements')
        .insert([{
          stock_item_id: itemId,
          movement_type: movementType,
          quantity: Math.abs(newQuantity - previousQuantity),
          previous_quantity: previousQuantity,
          new_quantity: newQuantity,
          ticket_id: ticketId,
          reason: reason || 'Atualização manual',
          performed_by: performedBy,
        }])

      if (movementError) throw movementError

      // Atualizar estado local
      setStockItems(prev =>
        prev.map(item => (item.id === itemId ? (updatedItem as StockItem) : item))
      )

      // IMPORTANTE: A verificação de estoque baixo e criação de notificação
      // é feita automaticamente pelo TRIGGER no banco de dados

      return { success: true, data: updatedItem }
    } catch (err) {
      console.error('Erro ao atualizar quantidade:', err)
      return { success: false, error: 'Erro ao atualizar quantidade' }
    }
  }, [])

  // Consumir peças de uma OS (baixa de estoque)
  const consumeParts = useCallback(async (
    parts: { stock_item_id: number; quantity: number }[],
    ticketId: number,
    performedBy?: string
  ) => {
    try {
      // Processar cada peça consumida
      for (const part of parts) {
        // Buscar quantidade atual
        const { data: currentItem, error: fetchError } = await supabase
          .from('stock_items')
          .select('quantity')
          .eq('id', part.stock_item_id)
          .single()

        if (fetchError) throw fetchError

        const newQuantity = currentItem.quantity - part.quantity

        // Verificar se há quantidade suficiente
        if (newQuantity < 0) {
          return { 
            success: false, 
            error: `Quantidade insuficiente no estoque (item ${part.stock_item_id})` 
          }
        }

        // Atualizar quantidade
        const updateResult = await updateQuantity(
          part.stock_item_id,
          newQuantity,
          `Peça consumida na OS #${ticketId}`,
          ticketId,
          performedBy
        )

        if (!updateResult.success) {
          return { success: false, error: updateResult.error || 'Erro ao atualizar item no estoque' }
        }
      }

      return { success: true }
    } catch (err) {
      console.error('Erro ao consumir peças:', err)
      return { success: false, error: 'Erro ao processar consumo de peças' }
    }
  }, [updateQuantity])

  // Buscar histórico de movimentações de um item
  const fetchMovements = useCallback(async (itemId: number) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('stock_movements')
        .select('*')
        .eq('stock_item_id', itemId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return { success: true, data: data as StockMovement[] }
    } catch (err) {
      console.error('Erro ao buscar movimentações:', err)
      return { success: false, error: 'Erro ao carregar histórico' }
    }
  }, [])

  // Obter itens com estoque crítico
  const getLowStockItems = useCallback(() => {
    return stockItems.filter(item => item.quantity <= item.min_quantity)
  }, [stockItems])

  useEffect(() => {
    fetchStockItems()
  }, [fetchStockItems])

  return {
    stockItems,
    loading,
    error,
    fetchStockItems,
    fetchStockItemById,
    createStockItem,
    updateStockItem,
    deleteStockItem,
    updateQuantity,
    consumeParts,
    fetchMovements,
    getLowStockItems,
  }
}
