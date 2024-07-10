import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const Settings = Loadable(lazy(() => import('@pages/setting')));

// ==============================|| STUDY ROUTING ||============================== //

const SettingsRoutes = {
    path: '/settings',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Settings />,
        },
    ],
};

export default SettingsRoutes;
