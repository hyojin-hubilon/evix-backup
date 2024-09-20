import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// render - master
const SurveySampleNew = Loadable(lazy(() => import('@pages/survey/SurveySampleNew')));
const MasterSampleList = Loadable(lazy(() => import('@pages/survey/MasterSampleList')));

// ==============================|| Master ROUTING ||============================== //

const MastersRoutes = {
    path: '/master',
    element: <MinimalLayout />,
    children: [
		{
			path: 'samples',
			element: <MasterSampleList />
		},

		{
			path: 'samples/new',
			element: <SurveySampleNew />
		},
    ],
};

export default MastersRoutes;
