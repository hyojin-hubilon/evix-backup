import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const StudyList = Loadable(lazy(() => import('@pages/study')));
const StudyDetail = Loadable(lazy(() => import('@pages/study/StudyDetail')));
const StudyNew = Loadable(lazy(() => import('@pages/study/StudyNew')));
const StudyPreviewPage = Loadable(lazy(() => import('@pages/study/StudyPreview')));

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
            path: 'detail/:stdNo',
            element: <StudyDetail />,
        },
        {
            path: 'new',
            element: <StudyNew />,
        },
        {
            path: 'preview',
            element: <StudyPreviewPage />,
        },
    ],
};

export default StudyRoutes;
