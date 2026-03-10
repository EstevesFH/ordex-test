import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../services/supabase'
import Button from '../../../components/Button'
import type { Location, Product } from '../../../types'
import * as S from './styles'
import { FiCheckCircle } from 'react-icons/fi'

interface SessionUser {
  username?: string
  name?: string
}

const RegisterOS = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [protocol, setProtocol] = useState<number | null>(null)

  const [form, setForm] = useState({
    localId: '',
    produtoId: '',
    prioridade: '',
    descricao: '',
  })

  const sessionUser = useMemo<SessionUser | null>(() => {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as SessionUser
    } catch {
      return null
    }
  }, [])

  const loggedSolicitante = useMemo(
    () => sessionUser?.name || sessionUser?.username || 'Usuário Logado',
    [sessionUser],
  )

  const fetchTable = async <T,>(
    table: string,
    setState: (data: T[]) => void,
    selectColumns: string,
  ) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(selectColumns)
        .or('status.ilike.%ativo%,status.ilike.%Ativo%,status.ilike.%ATIVO%')

      if (error) {
        console.error(`Erro ao buscar ${table}:`, error)
        setState([])
        return
      }

      setState((data as T[]) || [])
    } catch (err) {
      console.error(`Exceção ao buscar ${table}:`, err)
      setState([])
    }
  }

  useEffect(() => {
    fetchTable<Location>('locations', setLocations, 'id, locationName, status')
    fetchTableProducts()
  }, [])

  const fetchTableProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, productName, productType, status')
        .or('status.ilike.%ativo%,status.ilike.%Ativo%,status.ilike.%ATIVO%')
        .ilike('productType', 'Equipamento')

      if (error) {
        setProducts([])
        return
      }

      setProducts((data as Product[]) || [])
    } catch (err) {
      console.error('Exceção ao buscar products:', err)
      setProducts([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const localNome = locations.find(l => l.id === Number(form.localId))?.locationName
    const produtoNome = products.find(p => p.id === Number(form.produtoId))?.productName

    if (!localNome || !produtoNome) {
      alert('Erro ao processar os dados: Verifique se todos os campos foram selecionados corretamente.')
      return
    }

    const payload = {
      solicitante: loggedSolicitante,
      local: localNome,
      produto: produtoNome,
      prioridade: form.prioridade,
      descricao: form.descricao,
      status: 'Aberto',
      dataabertura: new Date().toISOString(),
    }

    try {
      const { data, error } = await supabase.from('tickets').insert([payload]).select()

      if (error) throw error

      if (data && data.length > 0) {
        setProtocol(data[0].id)
        setShowSuccessModal(true)
        setForm({
          localId: '',
          produtoId: '',
          prioridade: '',
          descricao: '',
        })
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao registrar a OS')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleSection>
          <h1>Nova Ordem de Serviço</h1>
        </S.TitleSection>
      </S.Header>

      <S.FormCard>
        <h2>Informações da Solicitação</h2>
        <form onSubmit={handleSubmit}>
          <S.FormGrid>
            <S.FormGroup>
              <label>Solicitante</label>
              <input value={loggedSolicitante} disabled />
            </S.FormGroup>

            <S.FormGroup>
              <label>Local / Setor</label>
              <select name="localId" value={form.localId} onChange={handleChange} required>
                <option value="">Selecione o local</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.locationName}
                  </option>
                ))}
              </select>
            </S.FormGroup>

            <S.FormGroup>
              <label>Prioridade</label>
              <select name="prioridade" value={form.prioridade} onChange={handleChange} required>
                <option value="">Defina a urgência</option>
                <option value="Alta">🔴 Alta</option>
                <option value="Baixa">🟢 Baixa</option>
              </select>
            </S.FormGroup>

            <S.FormGroup>
              <label>Equipamento / Produto</label>
              <select name="produtoId" value={form.produtoId} onChange={handleChange} required>
                <option value="">Selecione o item</option>
                {products.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.productName}
                  </option>
                ))}
              </select>
            </S.FormGroup>
          </S.FormGrid>

          <S.FormGroup>
            <label>Descrição do Problema</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={5}
              placeholder="Detalhe o que está acontecendo..."
              required
            />
          </S.FormGroup>

          <S.FooterActions>
            <Button primary type="submit" style={{ padding: '16px 60px' }}>
              Registrar OS
            </Button>
          </S.FooterActions>
        </form>
      </S.FormCard>

      {showSuccessModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <FiCheckCircle size={60} color="#10b981" style={{ marginBottom: '20px' }} />
            <h2>Solicitação Enviada!</h2>
            <p>Sua OS foi gerada com sucesso. Anote o número do seu protocolo para consultas futuras.</p>
            {protocol && <S.ProtocolBadge>#{protocol}</S.ProtocolBadge>}
            <Button primary onClick={() => setShowSuccessModal(false)} style={{ width: '100%' }}>
              Entendi
            </Button>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  )
}

export { RegisterOS }
