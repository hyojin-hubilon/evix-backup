import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const SurveyList = Loadable(lazy(() => import('@pages/survey/SurveyList')));

// ==============================|| STUDY ROUTING ||============================== //

const SettingsRoutes = {
    path: '/survey',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <SurveyList />,
        },
    ],
};

export default SettingsRoutes;
