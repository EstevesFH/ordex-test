import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FiBell, FiCheck, FiCheckCircle, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import { useNotifications } from '../../hooks/useNotifications'
import type { Notification } from '../../types'

interface NotificationBellProps {
  userId?: number
}

const NotificationBell: React.FC<NotificationBellProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications(userId)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.is_read) {
      await markAsRead(notification.id)
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteNotification(id)
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <FiAlertCircle color="#ef4444" />
      case 'warning':
        return <FiAlertCircle color="#f59e0b" />
      default:
        return <FiBell color="#3b82f6" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins}min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    if (diffDays < 7) return `${diffDays}d atrás`
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <Container ref={dropdownRef}>
      <BellButton onClick={() => setIsOpen(!isOpen)}>
        <FiBell size={20} />
        {unreadCount > 0 && <Badge>{unreadCount > 99 ? '99+' : unreadCount}</Badge>}
      </BellButton>

      {isOpen && (
        <Dropdown>
          <DropdownHeader>
            <Title>Notificações</Title>
            {unreadCount > 0 && (
              <MarkAllButton onClick={handleMarkAllAsRead}>
                <FiCheckCircle size={16} />
                Marcar todas como lidas
              </MarkAllButton>
            )}
          </DropdownHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>
                <FiBell size={40} color="#cbd5e1" />
                <p>Nenhuma notificação</p>
              </EmptyState>
            ) : (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  isRead={notification.is_read}
                  onClick={() => handleMarkAsRead(notification)}
                >
                  <NotificationIcon severity={notification.severity}>
                    {getSeverityIcon(notification.severity)}
                  </NotificationIcon>

                  <NotificationContent>
                    <NotificationTitle isRead={notification.is_read}>
                      {notification.title}
                    </NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>{formatDate(notification.created_at)}</NotificationTime>
                  </NotificationContent>

                  <Actions>
                    {!notification.is_read && (
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(notification.id)
                        }}
                        title="Marcar como lida"
                      >
                        <FiCheck size={16} />
                      </ActionButton>
                    )}
                    <ActionButton
                      onClick={(e) => handleDelete(notification.id, e)}
                      title="Remover notificação"
                    >
                      <FiTrash2 size={16} />
                    </ActionButton>
                  </Actions>
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </Dropdown>
      )}
    </Container>
  )
}

export default NotificationBell

// ========================================
// STYLED COMPONENTS
// ========================================

const Container = styled.div`
  position: relative;
`

const BellButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  color: #475569;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #2f80ed;
  }
`

const Badge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 380px;
  max-height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 320px;
    right: -40px;
  }
`

const DropdownHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`

const MarkAllButton = styled.button`
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #dbeafe;
  }
`

const NotificationList = styled.div`
  max-height: 420px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`

const EmptyState = styled.div`
  padding: 48px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    color: #94a3b8;
    font-size: 14px;
    margin: 0;
  }
`

interface NotificationItemProps {
  isRead: boolean
}

const NotificationItem = styled.div<NotificationItemProps>`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s;
  background: ${props => (props.isRead ? 'transparent' : '#f0f9ff')};

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`

const NotificationIcon = styled.div<{ severity: string }>`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.severity === 'critical' ? '#fee2e2' :
    props.severity === 'warning' ? '#fef3c7' : '#dbeafe'};
`

const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const NotificationTitle = styled.h4<{ isRead: boolean }>`
  font-size: 13px;
  font-weight: ${props => (props.isRead ? 500 : 700)};
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
`

const NotificationMessage = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const NotificationTime = styled.span`
  font-size: 11px;
  color: #94a3b8;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #64748b;
  }
`
