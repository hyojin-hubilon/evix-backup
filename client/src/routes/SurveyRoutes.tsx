import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const SurveyList = Loadable(lazy(() => import('@pages/survey/SurveyList')));
const SurveyNew = Loadable(lazy(() => import('@pages/survey/SurveyNew')));
const SurveySampleNew = Loadable(lazy(() => import('@pages/survey/SurveySampleNew')));
import SurveyPreview from '@pages/survey/SurveyPreview';
const SampleList = Loadable(lazy(() => import('@pages/survey/SampleList')));

// ==============================|| SURVEY ROUTING ||============================== //

const SurveyRoutes = {
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
			path: 'new/:survey_no',
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
		},
		{
			path: 'samples',
			element: <SampleList />
		},

		{
			path: 'samples/new',
			element: <SurveySampleNew />
		},
    ],
};

export default SurveyRoutes;
