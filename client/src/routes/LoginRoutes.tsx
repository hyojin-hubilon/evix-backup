import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MinimalLayout from '@layout/MinimalLayout';
import Invite from '@/pages/authentication/Invite';
import FindingId from '@/pages/authentication/FindingId';
import ForgotPassword from '@/pages/authentication/ForgotPassword';
import ChangePassword from '@pages/authentication/ChangePassword';
import AuthenticationPasswordForm from '@/pages/authentication/auth-forms/AuthenticationPasswordForm';
import AuthPassword from '@/pages/authentication/AuthPassword';
// import AuthLogout from "pages/authentication/auth-forms/AuthLogout";
// import ApplyFreeTrialForm from "pages/authentication/ApplyFreeTrialForm";

// render - login
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('@/pages/authentication/Register')));
const SurveySubmit = Loadable(lazy(() => import('@/pages/survey/SurveySubmit')));
//onboarding preview
const Onboarding = Loadable(lazy(() => import('@/pages/onboarding')));
// const ApplyFreeTrial = Loadable(
//     lazy(() => import("pages/authentication/ApplyFreeTrial"))
// );

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />,
        },
        {
            path: 'register',
            element: <AuthRegister />,
        },
        // {
        //     path: "apply",
        //     element: <ApplyFreeTrial />,
        // },
        { path: 'invite', element: <Invite /> },
        { path: 'finding-id', element: <FindingId /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'authentication-password', element: <AuthPassword /> },
		{ path : 'survey/submit/:survey_no', element: <SurveySubmit />},
		{ path: 'onboarding', element: <Onboarding />}
    ],
};

export default LoginRoutes;
