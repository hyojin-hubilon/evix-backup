import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const StudyList = Loadable(lazy(() => import('@pages/study')));
const StudyDetail = Loadable(lazy(() => import('@pages/study/StudyDetail')));
const StudyNew = Loadable(lazy(() => import('@pages/study/StudyNew')));

// ==============================|| STUDY ROUTING ||============================== //

const StudyRoutes = {
    path: '/study',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <StudyList />,
        },
        {
            path: 'detail/:std_no',
            element: <StudyDetail />,
        },
        {
            path: 'new',
            element: <StudyNew />,
        },
    ],
};

export default StudyRoutes;
