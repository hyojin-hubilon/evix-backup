import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('@pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const DashBoardRoutes = {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <DashboardDefault />,
        },
    ],
};

export default DashBoardRoutes;
