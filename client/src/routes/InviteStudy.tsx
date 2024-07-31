import { lazy } from 'react';
import LandingLayout from '@layout/LandingLayout';

import Loadable from '@components/Loadable';
const InviteStudy = Loadable(lazy(() => import('@pages/invitestudy')));

// ==============================|| MAIN ROUTING ||============================== //

const InviteStudyRoutes = {
    path: '/study-user-invite',
    element: <LandingLayout />,
    children: [
        {
            path: 'verification/:token',
            element: <InviteStudy />,
        },
    ],
};

export default InviteStudyRoutes;
