import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const StudyList = Loadable(lazy(() => import('@pages/study')));

// ==============================|| STUDY ROUTING ||============================== //

const StudyRoutes = {
    path: '/study',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <StudyList />,
        },
    ],
};

export default StudyRoutes;
