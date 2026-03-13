import { Routes, Route } from 'react-router-dom';

import { PublicLayout } from '@/layouts/PublicLayout';
import { AppLayout } from '@/layouts/AppLayout';

import { Login } from '@/pages/Login';
import { RegisterOS } from '@/pages/RegisterOS';
import { ViewTickets } from '@/pages/ViewTickets';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { ResetPassword } from '@/pages/ResetPassword';

import { Dashboard } from '@/pages/Dashboard';
import { Tickets } from '@/pages/Tickets';
import { Stock } from '@/pages/Stock';
import { Assets } from '@/pages/Stock/Assets';
import { Warehouse } from '@/pages/Stock/Warehouse';

import { Settings } from '@/pages/Settings';
import { LocationsSettings } from '@/pages/Settings/Locations';
import { ProductsSettings } from '@/pages/Settings/Products';
import { AccessesSettings } from '@/pages/Settings/Accesses';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOS />} />
        <Route path="/view-tickets" element={<ViewTickets />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} >
          <Route path="assets" element={<Assets />} />
          <Route path="warehouse" element={<Warehouse />} />
        </Route>
        <Route path="/tickets" element={<Tickets />} />

        <Route path="/settings" element={<Settings />}>
          <Route path="locations" element={<LocationsSettings />} />
          <Route path="products" element={<ProductsSettings />} />
          <Route path="accesses" element={<AccessesSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRoutes };
