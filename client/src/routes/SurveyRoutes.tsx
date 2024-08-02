import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const SurveyList = Loadable(lazy(() => import('@pages/survey/SurveyList')));
const SurveyNew = Loadable(lazy(() => import('@pages/survey/SurveyNew')));
const SurveyPreview = Loadable(lazy(() => import('@pages/survey/SurveyPreview')));

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
		},
		{
			path: 'preview/:survey_no',
			element: <SurveyPreview />
		},
		{
			path: 'edit/:survey_no',
			element: <SurveyNew />
		},

		{
			path: 'copy/:survey_no',
			element: <SurveyNew />
		}
    ],
};

export default SettingsRoutes;
