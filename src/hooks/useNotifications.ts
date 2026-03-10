import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/services/supabase'
import type { Notification, NotificationFormData } from '../types'

export const useNotifications = (userId?: number) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar notificações
  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })

      // Se userId for fornecido, busca notificações específicas do usuário
      // Caso contrário, busca notificações globais (recipient_user_id é null)
      if (userId) {
        query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`)
      } else {
        query = query.is('recipient_user_id', null)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setNotifications(data as Notification[])
      setUnreadCount(data.filter(n => !n.is_read).length)
    } catch (err) {
      console.error('Erro ao buscar notificações:', err)
      setError('Erro ao carregar notificações')
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Marcar notificação como lida
  const markAsRead = useCallback(async (notificationId: number) => {
    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({
          is_read: true,
          read_at: new Date().toISOString(),
          read_by: userId || null,
        })
        .eq('id', notificationId)

      if (updateError) throw updateError

      // Atualizar estado local
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId
            ? { ...n, is_read: true, read_at: new Date().toISOString() }
            : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))

      return { success: true }
    } catch (err) {
      console.error('Erro ao marcar notificação como lida:', err)
      return { success: false, error: 'Erro ao atualizar notificação' }
    }
  }, [userId])

  // Marcar todas como lidas
  const markAllAsRead = useCallback(async () => {
    try {
      let query = supabase
        .from('notifications')
        .update({
          is_read: true,
          read_at: new Date().toISOString(),
          read_by: userId || null,
        })
        .eq('is_read', false)

      if (userId) {
        query = query.or(`recipient_user_id.eq.${userId},recipient_user_id.is.null`)
      } else {
        query = query.is('recipient_user_id', null)
      }

      const { error: updateError } = await query

      if (updateError) throw updateError

      // Atualizar estado local
      setNotifications(prev =>
        prev.map(n => ({
          ...n,
          is_read: true,
          read_at: new Date().toISOString(),
        }))
      )
      setUnreadCount(0)

      return { success: true }
    } catch (err) {
      console.error('Erro ao marcar todas como lidas:', err)
      return { success: false, error: 'Erro ao atualizar notificações' }
    }
  }, [userId])

  // Criar nova notificação
  const createNotification = useCallback(async (data: NotificationFormData) => {
    try {
      const { data: newNotification, error: insertError } = await supabase
        .from('notifications')
        .insert([data])
        .select()
        .single()

      if (insertError) throw insertError

      // Atualizar estado local
      setNotifications(prev => [newNotification as Notification, ...prev])
      if (!data.recipient_user_id || data.recipient_user_id === userId) {
        setUnreadCount(prev => prev + 1)
      }

      return { success: true, data: newNotification }
    } catch (err) {
      console.error('Erro ao criar notificação:', err)
      return { success: false, error: 'Erro ao criar notificação' }
    }
  }, [userId])

  // Deletar notificação
  const deleteNotification = useCallback(async (notificationId: number) => {
    try {
      const { error: deleteError } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)

      if (deleteError) throw deleteError

      // Atualizar estado local
      setNotifications(prev => {
        const notification = prev.find(n => n.id === notificationId)
        if (notification && !notification.is_read) {
          setUnreadCount(count => Math.max(0, count - 1))
        }
        return prev.filter(n => n.id !== notificationId)
      })

      return { success: true }
    } catch (err) {
      console.error('Erro ao deletar notificação:', err)
      return { success: false, error: 'Erro ao deletar notificação' }
    }
  }, [])

  // Subscrição em tempo real
  useEffect(() => {
    fetchNotifications()

    // Criar canal de realtime para escutar novas notificações
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as Notification
          
          // Adicionar apenas se for para este usuário ou global
          if (!newNotification.recipient_user_id || newNotification.recipient_user_id === userId) {
            setNotifications(prev => [newNotification, ...prev])
            setUnreadCount(prev => prev + 1)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchNotifications, userId])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    createNotification,
    deleteNotification,
  }
}
