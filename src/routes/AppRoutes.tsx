import { Routes, Route } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout';
import { AppLayout } from '../layouts/AppLayout';

import { HomePage } from '../pages/public/Home';
import { Login } from '../pages/public/Login';
import { RegisterOS } from '../pages/public/RegisterOS';
import { ViewTickets } from '../pages/public/ViewTickets';
import { ForgotPassword } from '../pages/public/ForgotPassword';
import { ResetPassword } from '../pages/public/ResetPassword';

import { Dashboard } from '../pages/private/Dashboard';
import { Tickets } from '../pages/private/Tickets';
import { Stock } from '../pages/private/Stock';

import { Settings } from '../pages/private/Settings';
import { UsersSettings } from '../pages/private/Settings/Users';
import { LocationsSettings } from '../pages/private/Settings/Locations';
import { ProductsSettings } from '../pages/private/Settings/Products';
import { AccessesSettings } from '../pages/private/Settings/Accesses';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOS />} />
        <Route path="/view-tickets" element={<ViewTickets />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/tickets" element={<Tickets />} />

        <Route path="/settings" element={<Settings />}>
          <Route path="users" element={<UsersSettings />} />
          <Route path="locations" element={<LocationsSettings />} />
          <Route path="products" element={<ProductsSettings />} />
          <Route path="accesses" element={<AccessesSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRoutes };
