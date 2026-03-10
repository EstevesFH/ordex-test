import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/services/supabase'
import type { Asset, AssetFormData, AssetHistory, Ticket } from '../types'

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar todos os ativos
  const fetchAssets = useCallback(async (filters?: {
    category?: string
    status?: string
    search?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false })

      // Aplicar filtros
      if (filters?.category) {
        query = query.eq('asset_category', filters.category)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.search) {
        query = query.or(
          `asset_name.ilike.%${filters.search}%,serial_number.ilike.%${filters.search}%,model.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setAssets(data as Asset[])
    } catch (err) {
      console.error('Erro ao buscar ativos:', err)
      setError('Erro ao carregar ativos')
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar ativo por ID
  const fetchAssetById = useCallback(async (id: number) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('assets')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      return { success: true, data: data as Asset }
    } catch (err) {
      console.error('Erro ao buscar ativo:', err)
      return { success: false, error: 'Erro ao carregar ativo' }
    }
  }, [])

  // Criar novo ativo
  const createAsset = useCallback(async (data: AssetFormData) => {
    try {
      const { data: newAsset, error: insertError } = await supabase
        .from('assets')
        .insert([data])
        .select()
        .single()

      if (insertError) throw insertError

      setAssets(prev => [newAsset as Asset, ...prev])

      return { success: true, data: newAsset }
    } catch (err) {
      console.error('Erro ao criar ativo:', err)
      return { success: false, error: 'Erro ao criar ativo' }
    }
  }, [])

  // Atualizar ativo
  const updateAsset = useCallback(async (id: number, data: Partial<AssetFormData>) => {
    try {
      const { data: updatedAsset, error: updateError } = await supabase
        .from('assets')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setAssets(prev =>
        prev.map(asset => (asset.id === id ? (updatedAsset as Asset) : asset))
      )

      return { success: true, data: updatedAsset }
    } catch (err) {
      console.error('Erro ao atualizar ativo:', err)
      return { success: false, error: 'Erro ao atualizar ativo' }
    }
  }, [])

  // Deletar ativo
  const deleteAsset = useCallback(async (id: number) => {
    try {
      const { error: deleteError } = await supabase
        .from('assets')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setAssets(prev => prev.filter(asset => asset.id !== id))

      return { success: true }
    } catch (err) {
      console.error('Erro ao deletar ativo:', err)
      return { success: false, error: 'Erro ao deletar ativo' }
    }
  }, [])

  // Upload de nota fiscal para Supabase Storage
  const uploadInvoice = useCallback(async (assetId: number, file: File) => {
    try {
      // Nome único do arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${assetId}-${Date.now()}.${fileExt}`
      const filePath = `invoices/${fileName}`

      // Upload para Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obter URL pública (se bucket for público) ou URL assinada
      const { data: urlData } = supabase.storage
        .from('invoices')
        .getPublicUrl(filePath)

      // Atualizar registro do ativo com URL da nota fiscal
      const { error: updateError } = await supabase
        .from('assets')
        .update({
          invoice_url: urlData.publicUrl,
          invoice_file_name: file.name,
        })
        .eq('id', assetId)

      if (updateError) throw updateError

      return { success: true, url: urlData.publicUrl }
    } catch (err) {
      console.error('Erro ao fazer upload da nota fiscal:', err)
      return { success: false, error: 'Erro ao fazer upload do arquivo' }
    }
  }, [])

  // Buscar histórico de um ativo (incluindo tickets vinculados)
  const fetchAssetHistory = useCallback(async (assetId: number) => {
    try {
      // Buscar histórico direto
      const { data: historyData, error: historyError } = await supabase
        .from('asset_history')
        .select('*')
        .eq('asset_id', assetId)
        .order('created_at', { ascending: false })

      if (historyError) throw historyError

      // Buscar tickets vinculados ao ativo
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')
        .eq('asset_id', assetId)
        .order('dataabertura', { ascending: false })

      if (ticketsError) throw ticketsError

      return {
        success: true,
        history: historyData as AssetHistory[],
        tickets: ticketsData as Ticket[],
      }
    } catch (err) {
      console.error('Erro ao buscar histórico do ativo:', err)
      return { success: false, error: 'Erro ao carregar histórico' }
    }
  }, [])

  // Adicionar entrada no histórico do ativo
  const addAssetHistory = useCallback(async (data: {
    asset_id: number
    action_type: string
    description: string
    ticket_id?: number
    performed_by?: number
  }) => {
    try {
      const { error: insertError } = await supabase
        .from('asset_history')
        .insert([data])

      if (insertError) throw insertError

      return { success: true }
    } catch (err) {
      console.error('Erro ao adicionar histórico:', err)
      return { success: false, error: 'Erro ao registrar histórico' }
    }
  }, [])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  return {
    assets,
    loading,
    error,
    fetchAssets,
    fetchAssetById,
    createAsset,
    updateAsset,
    deleteAsset,
    uploadInvoice,
    fetchAssetHistory,
    addAssetHistory,
  }
}
