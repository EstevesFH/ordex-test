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
    <h1
      style={{
        fontSize: designSystem.typography.size.xxxl,
        color: designSystem.colors.textPrimary,
        margin: 0,
      }}
    >
      404
    </h1>
    <p
      style={{
        fontSize: designSystem.typography.size.lg,
        color: designSystem.colors.textSecondary,
      }}
    >
      Página não encontrada
    </p>
  </div>
);

const App: FC = () => (
  <Routes>
    {/* Rotas Públicas */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register-os" element={<RegisterOS />} />
    <Route path="/view-tickets" element={<ViewTickets />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Rotas Privadas */}
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Dashboard />} />
      <Route path="/settings" element={<Dashboard />} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
