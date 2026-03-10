import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: FC = () => <Outlet />;

export { PublicLayout };