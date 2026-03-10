import React from 'react'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import Maintenance from '@/pages/Maintenance'

interface NetworkStatusProps {
  children: React.ReactNode
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ children }) => {
  const { isOnline } = useNetworkStatus()

  if (!isOnline) {
    return (
      <Maintenance 
        type="error"
        title="Sem Conexão com a Internet"
        message="Verifique sua conexão e tente novamente. A página será recarregada automaticamente quando a conexão for restabelecida."
        showRetry={true}
      />
    )
  }

  return <>{children}</>
}

export default NetworkStatus
