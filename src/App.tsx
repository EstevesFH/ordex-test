import type { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { AccessesSettings } from './pages/Settings/Accesses'
import { LocationsSettings } from './pages/Settings/Locations'
import { ProductsSettings } from './pages/Settings/Products'
import { Stock } from './pages/Stock'
import { Tickets } from './pages/Tickets'
import { ForgotPassword } from './pages/ForgotPassword'
import { Login } from './pages/Login'
import { RegisterOS } from './pages/RegisterOS'
import { ResetPassword } from './pages/ResetPassword'
import { designSystem } from './styles/designSystem'
import { getLandingByRole, getSessionUser, type AppRole } from './utils/session'

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

  if (allowedRoles && !allowedRoles.includes(user.role)) {
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
          <ProtectedRoute allowedRoles={['Administrador', 'Supervisor']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stock"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Supervisor']}>
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
          <ProtectedRoute allowedRoles={['Administrador', 'Supervisor', 'Operador']}>
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
