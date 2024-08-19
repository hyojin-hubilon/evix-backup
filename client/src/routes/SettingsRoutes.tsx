import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - dashboard
const Settings = Loadable(lazy(() => import('@pages/setting')));
const UnauthorizedInvitation = Loadable(lazy(() => import('@pages/setting/components/UnauthorizedInvitation')));
const Notifications = Loadable(lazy(() => import('@pages/setting/Notifications')));

// ==============================|| STUDY ROUTING ||============================== //

const SettingsRoutes = {
    path: '/settings',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Settings />,
        },
        {
            path: 'unauthorizedstudy',
            element: <UnauthorizedInvitation />
        },
		{
			path: 'notifications',
			element: <Notifications />
		}
    ],
};

export default SettingsRoutes;
