import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/private/Dashboard'
import { Settings } from './pages/private/Settings'
import { AccessesSettings } from './pages/private/Settings/Accesses'
import { LocationsSettings } from './pages/private/Settings/Locations'
import { ProductsSettings } from './pages/private/Settings/Products'
import { UsersSettings } from './pages/private/Settings/Users'
import { Stock } from './pages/private/Stock'
import { Tickets } from './pages/private/Tickets'
import { ForgotPassword } from './pages/public/ForgotPassword'
import { HomePage } from './pages/public/Home'
import { Login } from './pages/public/Login'
import { RegisterOS } from './pages/public/RegisterOS'
import { ResetPassword } from './pages/public/ResetPassword'
import { ViewTickets } from './pages/public/ViewTickets'
import { designSystem } from './styles/designSystem'

const NotFound: FC = () => (
  <div
    style={{
      background: designSystem.colors.background,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: designSystem.spacing.lg,
      fontFamily: designSystem.typography.fontFamily,
    }}
  >
    <h1 style={{ fontSize: designSystem.typography.size.xxxl, color: designSystem.colors.textPrimary, margin: 0 }}>
      404
    </h1>
    <p style={{ fontSize: designSystem.typography.size.lg, color: designSystem.colors.textSecondary }}>
      Página não encontrada
    </p>
  </div>
)

const App: FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterOS />} />
    <Route path="/register-os" element={<Navigate to="/register" replace />} />
    <Route path="/view-tickets" element={<ViewTickets />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/settings" element={<Settings />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UsersSettings />} />
        <Route path="locations" element={<LocationsSettings />} />
        <Route path="products" element={<ProductsSettings />} />
        <Route path="accesses" element={<AccessesSettings />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
