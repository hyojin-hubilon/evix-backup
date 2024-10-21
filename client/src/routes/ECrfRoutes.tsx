import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - eCRF
const ECrfBuilder = Loadable(lazy(() => import('@/pages/ecrf-builder/ECrfBuilder')));

// ==============================|| eCRF ROUTING ||============================== //

const ECrfRoutes = {
    path: '/e-crf',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <ECrfBuilder />,
        },
    ],
};

export default ECrfRoutes;
