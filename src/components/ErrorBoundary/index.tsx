import { Component, type ErrorInfo, type ReactNode } from 'react'
import Maintenance from '@/pages/Maintenance'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: undefined
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Aqui você pode enviar o erro para um serviço de log (Sentry, LogRocket, etc.)
    // exemple: logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Maintenance 
          type="error"
          title="Ops! Algo deu errado"
          message="Encontramos um erro inesperado. Nossa equipe já foi notificada."
          showRetry={true}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
