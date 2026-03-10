import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { RegisterOS } from './pages/public/RegisterOS';
import { ViewTickets } from './pages/public/ViewTickets';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { Dashboard } from './pages/private/Dashboard';
import { designSystem } from './styles/designSystem';

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
