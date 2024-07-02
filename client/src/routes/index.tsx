import NotFound from '@/pages/errorPage/NotFound';
import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import DashBoardRoutes from './DashBoardRoutes';
import StudyRoutes from './StudyRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, DashBoardRoutes, StudyRoutes, LoginRoutes, { path: '*', element: <NotFound /> }]);
}
