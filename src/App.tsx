import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/private/Dashboard'
import { Settings } from './pages/private/Settings'
import { AccessesSettings } from './pages/private/Settings/Accesses'
import { LocationsSettings } from './pages/private/Settings/Locations'
import { ProductsSettings } from './pages/private/Settings/Products'
import { Stock } from './pages/private/Stock'
import { Tickets } from './pages/private/Tickets'
import { ForgotPassword } from './pages/public/ForgotPassword'
import { Login } from './pages/public/Login'
import { RegisterOS } from './pages/public/RegisterOS'
import { ResetPassword } from './pages/public/ResetPassword'
import { designSystem } from './styles/designSystem'

type AppRole = 'Administrador' | 'Operador'

interface SessionUser {
  id: number
  username: string
  name: string
  role: AppRole | string
  lastActive: number
}

const getSessionUser = (): SessionUser | null => {
  const raw = localStorage.getItem('user')
  if (!raw) return null

  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

const getLandingByRole = (role: string) => (role === 'Operador' ? '/tickets' : '/dashboard')

const PublicOnlyRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = getSessionUser()
  if (!user) return <>{children}</>
  return <Navigate to={getLandingByRole(user.role)} replace />
}

const ProtectedRoute: FC<{ children: React.ReactNode; allowedRoles?: AppRole[] }> = ({
  children,
  allowedRoles,
}) => {
  const user = getSessionUser()

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user.role as AppRole)) {
    return <Navigate to={getLandingByRole(user.role)} replace />
  }

  return <>{children}</>
}

const RoleHomeRedirect = () => {
  const user = getSessionUser()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getLandingByRole(user.role)} replace />
}

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
    <Route path="/" element={<RoleHomeRedirect />} />

    <Route
      path="/login"
      element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      }
    />

    <Route
      path="/forgot-password"
      element={
        <PublicOnlyRoute>
          <ForgotPassword />
        </PublicOnlyRoute>
      }
    />

    <Route
      path="/reset-password"
      element={
        <PublicOnlyRoute>
          <ResetPassword />
        </PublicOnlyRoute>
      }
    />

    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stock"
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <Stock />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings/*"
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <Settings />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="locations" replace />} />
        <Route path="locations" element={<LocationsSettings />} />
        <Route path="products" element={<ProductsSettings />} />
        <Route path="accesses" element={<AccessesSettings />} />
      </Route>

      <Route
        path="/tickets"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Operador']}>
            <Tickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Operador']}>
            <RegisterOS />
          </ProtectedRoute>
        }
      />
      <Route path="/register-os" element={<Navigate to="/register" replace />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
