// ========================================
// TIPOS EXISTENTES
// ========================================

export interface User {
  id: number
  userName: string
  status: string
}

export interface Location {
  id: number
  locationName: string
  status: string
}

export interface Product {
  id: number
  productName: string
  productType: string
  status: string
}

export interface Ticket {
  id: number
  solicitante: string
  local: string
  produto: string
  prioridade: string
  descricao: string
  status: 'Aberto' | 'Em Andamento' | 'Aguardando' | 'Finalizado'
  retorno?: string
  dataabertura: string
  datatermino?: string
  asset_id?: number
  service_type?: 'preventive' | 'corrective'
  parts_consumed?: PartConsumed[]
}

// ========================================
// NOVOS TIPOS - GESTÃO DE ATIVOS (ITAM)
// ========================================

export type AssetCategory = 'durable' | 'consumable'
export type AssetStatus = 'Ativo' | 'Inativo' | 'Em Manutenção' | 'Descartado'

export interface AssetSpecifications {
  cpu?: string
  ram?: string
  disk?: string
  screen?: string
  [key: string]: string | undefined // Permite campos dinâmicos
}

export interface Asset {
  id: number
  asset_name: string
  asset_type: string
  asset_category: AssetCategory
  
  // Campos específicos para Bens Duráveis
  serial_number?: string | null
  purchase_date?: string | null
  warranty_expiry?: string | null
  specifications?: AssetSpecifications | null
  
  // Upload de documentos
  invoice_url?: string | null
  invoice_file_name?: string | null
  
  // Informações gerais
  manufacturer?: string | null
  model?: string | null
  location_id?: number | null
  responsible_user_id?: number | null
  
  // Controle de estoque (para consumíveis)
  quantity?: number
  min_quantity?: number
  unit_price?: number | null
  
  // Status e controle
  status: AssetStatus
  notes?: string | null
  
  created_at: string
  updated_at: string
}

export interface AssetFormData {
  asset_name: string
  asset_type: string
  asset_category: AssetCategory
  serial_number?: string
  purchase_date?: string
  warranty_expiry?: string
  specifications?: AssetSpecifications
  manufacturer?: string
  model?: string
  location_id?: number
  responsible_user_id?: number
  quantity?: number
  min_quantity?: number
  unit_price?: number
  status: AssetStatus
  notes?: string
}

// ========================================
// HISTÓRICO DE ATIVOS
// ========================================

export type AssetActionType = 'maintenance' | 'transfer' | 'update' | 'purchase' | 'disposal'

export interface AssetHistory {
  id: number
  asset_id: number
  ticket_id?: number | null
  action_type: AssetActionType
  description: string
  performed_by?: number | null
  previous_location_id?: number | null
  new_location_id?: number | null
  created_at: string
}

// ========================================
// ESTOQUE
// ========================================

export type StockStatus = 'Disponível' | 'Reservado' | 'Indisponível'

export interface StockItem {
  id: number
  asset_id?: number | null
  item_name: string
  item_type: string
  quantity: number
  min_quantity: number
  unit_price?: number | null
  location_id?: number | null
  status: StockStatus
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface StockItemFormData {
  item_name: string
  item_type: string
  quantity: number
  min_quantity: number
  unit_price?: number
  location_id?: number
  status: StockStatus
  notes?: string
}

// ========================================
// MOVIMENTAÇÕES DE ESTOQUE
// ========================================

export type MovementType = 'in' | 'out' | 'adjustment'

export interface StockMovement {
  id: number
  stock_item_id: number
  movement_type: MovementType
  quantity: number
  previous_quantity: number
  new_quantity: number
  ticket_id?: number | null
  reason?: string | null
  performed_by?: string | null
  created_at: string
}

export interface PartConsumed {
  stock_item_id: number
  quantity: number
}

// ========================================
// NOTIFICAÇÕES
// ========================================

export type NotificationType = 
  | 'stock_alert' 
  | 'ticket_urgent' 
  | 'license_expiring' 
  | 'warranty_expiring' 
  | 'system'

export type NotificationSeverity = 'info' | 'warning' | 'critical'

export interface Notification {
  id: number
  notification_type: NotificationType
  title: string
  message: string
  severity: NotificationSeverity
  
  // Referências opcionais
  related_asset_id?: number | null
  related_ticket_id?: number | null
  related_stock_id?: number | null
  
  // Status de leitura
  is_read: boolean
  read_at?: string | null
  read_by?: number | null
  
  // Destinatário
  recipient_user_id?: number | null
  
  created_at: string
}

export interface NotificationFormData {
  notification_type: NotificationType
  title: string
  message: string
  severity: NotificationSeverity
  related_asset_id?: number
  related_ticket_id?: number
  related_stock_id?: number
  recipient_user_id?: number
}

// ========================================
// TIPOS UTILITÁRIOS
// ========================================

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface PaginationParams {
  page: number
  itemsPerPage: number
}

export interface FilterParams {
  search?: string
  status?: string
  category?: string
  [key: string]: string | undefined
}
