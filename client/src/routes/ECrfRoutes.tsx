import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - eCRF
const ECrf = Loadable(lazy(() => import('@/pages/ecrf-builder/ECrf')));

// ==============================|| eCRF ROUTING ||============================== //

const ECrfRoutes = {
    path: '/e-crf',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <ECrf />,
        },
    ],
};

export default ECrfRoutes;
