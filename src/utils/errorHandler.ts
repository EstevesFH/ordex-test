type ApiError = {
  status?: number
  message?: string
}

/**
 * Intercepta erros da API e lança exceções que serão capturadas pelo ErrorBoundary
 */
export const handleApiError = (error: unknown, customMessage?: string) => {
  console.error('API Error:', error)

  const parsedError = typeof error === 'object' && error !== null
    ? (error as ApiError)
    : undefined

  if (!navigator.onLine) {
    throw new Error('Sem conexão com a internet')
  }

  if ((parsedError?.status ?? 0) >= 500) {
    throw new Error(customMessage || 'Servidor indisponível. Tente novamente mais tarde.')
  }

  if (parsedError?.status === 401 || parsedError?.status === 403) {
    window.location.href = '/login'
    return
  }

  throw new Error(parsedError?.message || customMessage || 'Erro ao processar requisição')
}

/**
 * Wrapper para chamadas Supabase com tratamento de erro
 */
export const withErrorHandling = async <T>(
  apiCall: () => Promise<{ data: T | null; error: unknown }>,
  errorMessage?: string
): Promise<T> => {
  try {
    const { data, error } = await apiCall()

    if (error) {
      handleApiError(error, errorMessage)
    }

    if (!data) {
      throw new Error('Nenhum dado retornado')
    }

    return data
  } catch (error) {
    handleApiError(error, errorMessage)
    throw error
  }
}
