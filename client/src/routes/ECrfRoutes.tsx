import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - eCRF
const ECrfList = Loadable(lazy(() => import('@/pages/ecrf-builder/ECrfList')));
const ECrf = Loadable(lazy(() => import('@/pages/ecrf-builder/ECrf')));

// ==============================|| eCRF ROUTING ||============================== //

const ECrfRoutes = {
    path: '/e-crf',
    element: <MainLayout />,
    children: [
		{
			path: '',
            element: <ECrfList />
		},
        {
            path: 'builder',
            element: <ECrf />,
        },
		{
            path: 'edit/:crf_no',
            element: <ECrf />,
        },
    ],
};

export default ECrfRoutes;
