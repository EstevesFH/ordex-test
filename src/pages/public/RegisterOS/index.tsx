import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { supabase } from '../../../services/supabase'
import Iridescence from '../../../components/ReactBits/Iridescence'
import Button from '../../../components/Button'
import type { User, Location, Product } from '../../../types'
import * as S from './styles'

const RegisterOS = () => {
  const [users, setUsers] = useState<User[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [protocol, setProtocol] = useState<number | null>(null)

  const [form, setForm] = useState({
    solicitanteId: '',
    localId: '',
    produtoId: '',
    prioridade: '',
    descricao: '',
  })

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('user') !== null

  const fetchTable = async <T,>(
    table: string, 
    setState: (data: T[]) => void, 
    selectColumns: string
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
    fetchTable<User>('users', setUsers, 'id, userName, status')
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

    const solicitanteNome = users.find(u => u.id === Number(form.solicitanteId))?.userName
    const localNome = locations.find(l => l.id === Number(form.localId))?.locationName
    const produtoNome = products.find(p => p.id === Number(form.produtoId))?.productName

    if (!solicitanteNome || !localNome || !produtoNome) {
      alert('Erro ao processar os dados: Verifique se todos os campos foram selecionados corretamente.')
      return
    }

    const payload = {
      solicitante: solicitanteNome,
      local: localNome,
      produto: produtoNome,
      prioridade: form.prioridade,
      descricao: form.descricao,
      status: 'Aberto',
      dataabertura: new Date().toISOString(),
    }

    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([payload])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        setProtocol(data[0].id)
        setShowSuccessModal(true)
        setForm({
          solicitanteId: '',
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
      <Iridescence 
        color={[0.12, 0.24, 0.45]}
        speed={0.3}
        amplitude={0.15}
        mouseReact={false}
      />

      <S.Header>
        <S.TitleSection>
          <Button onClick={() => navigate(-1)}>
            <FiArrowLeft size={22} />
          </Button>
          <h1>Nova Ordem de Serviço</h1>
        </S.TitleSection>

        {!isLoggedIn && (
          <Button onClick={() => navigate('/view-tickets')}>
            Consultar OS
          </Button>
        )}
      </S.Header>

      <S.FormCard>
        <h2>Informações da Solicitação</h2>
        <form onSubmit={handleSubmit}>
          <S.FormGrid>
            <S.FormGroup>
              <label>Solicitante</label>
              <select name="solicitanteId" value={form.solicitanteId} onChange={handleChange} required>
                <option value="">Selecione o funcionário</option>
                {users.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
              </select>
            </S.FormGroup>

            <S.FormGroup>
              <label>Local / Setor</label>
              <select name="localId" value={form.localId} onChange={handleChange} required>
                <option value="">Selecione o local</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.locationName}</option>)}
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
                {products.map(prod => <option key={prod.id} value={prod.id}>{prod.productName}</option>)}
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