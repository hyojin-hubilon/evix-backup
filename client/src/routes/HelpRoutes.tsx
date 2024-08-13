import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';

// render - help
const Help = Loadable(lazy(()=> import('@pages/help/Help')));

// ==============================|| HELP ROUTING ||============================== //

const HelpRoutes = {
    path: '/help',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Help />,
        },
    ],
};

export default HelpRoutes;
