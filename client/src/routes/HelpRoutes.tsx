import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - help
const Help = Loadable(lazy(()=> import('@pages/help/Help')));
const UserSupport = Loadable(lazy(()=> import('@pages/help/UserSupport')));

// ==============================|| HELP ROUTING ||============================== //

const HelpRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'help',
            element: <Help />,
        },
		{
			path: 'user-support',
			element: <UserSupport />
		}
    ],
};

export default HelpRoutes;
