import NotFound from '@/pages/errorPage/NotFound';
import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import DashBoardRoutes from './DashBoardRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, DashBoardRoutes, LoginRoutes, { path: '*', element: <NotFound /> }]);
}
