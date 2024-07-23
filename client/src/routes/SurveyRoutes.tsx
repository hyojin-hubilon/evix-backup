import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const SurveyList = Loadable(lazy(() => import('@pages/survey/SurveyList')));
const SurveyNew = Loadable(lazy(() => import('@pages/survey/SurveyNew')));

// ==============================|| STUDY ROUTING ||============================== //

const SettingsRoutes = {
    path: '/survey',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <SurveyList />,
        },
		{
			path: 'new',
			element: <SurveyNew />
		}
    ],
};

export default SettingsRoutes;
