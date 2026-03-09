// Adicione este arquivo para interceptar erros de API

import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Intercepta erros da API e lança exceções que serão capturadas pelo ErrorBoundary
 */
export const handleApiError = (error: any, customMessage?: string) => {
  console.error('API Error:', error)

  // Se for erro de rede
  if (!navigator.onLine) {
    throw new Error('Sem conexão com a internet')
  }

  // Se for erro do servidor (500, 502, 503, 504)
  if (error?.status >= 500) {
    throw new Error(customMessage || 'Servidor indisponível. Tente novamente mais tarde.')
  }

  // Se for erro de autenticação (401, 403)
  if (error?.status === 401 || error?.status === 403) {
    // Redirecionar para login ou mostrar mensagem
    window.location.href = '/login'
    return
  }

  // Outros erros
  throw new Error(error?.message || customMessage || 'Erro ao processar requisição')
}

/**
 * Wrapper para chamadas Supabase com tratamento de erro
 */
export const withErrorHandling = async <T>(
  apiCall: () => Promise<{ data: T | null; error: any }>,
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
    throw error // Nunca vai chegar aqui, mas TypeScript precisa
  }
}

/**
 * Exemplo de uso:
 * 
 * // Em vez de:
 * const { data, error } = await supabase.from('users').select()
 * 
 * // Use:
 * const data = await withErrorHandling(
 *   () => supabase.from('users').select(),
 *   'Erro ao carregar usuários'
 * )
 */
