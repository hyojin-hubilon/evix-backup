import NotFound from '@/pages/errorPage/NotFound';
import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import DashBoardRoutes from './DashBoardRoutes';
import StudyRoutes from './StudyRoutes';
import SettingsRoutes from './SettingsRoutes';
import SurveyRoutes from './SurveyRoutes';
import InviteStudyRoutes from './InviteStudy';
import HelpRoutes from './HelpRoutes';
import MdppRoutes from './MdppRoutes';
import MastersRoutes from './MastersRoutes';
import ECrfRoutes from './ECrfRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        MainRoutes,
        DashBoardRoutes,
        StudyRoutes,
        LoginRoutes,
        SettingsRoutes,
		SurveyRoutes,
        InviteStudyRoutes,
		HelpRoutes,
		MdppRoutes,
		MastersRoutes,
		ECrfRoutes,
        { path: '*', element: <NotFound /> },
    ]);
}
