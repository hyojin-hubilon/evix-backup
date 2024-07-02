import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const StudyDefault = Loadable(lazy(() => import('@pages/study')));

// ==============================|| STUDY ROUTING ||============================== //

const StudyRoutes = {
	path: "/study",
	element: <MainLayout />,
	children: [
	  {
		path: 'list',
		element: <StudyDefault />
	  }
	]
  };
  
  export default StudyRoutes;
  