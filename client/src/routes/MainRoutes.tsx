import { lazy } from "react";
import LandingLayout from "@layout/LandingLayout";
import LandingPage from "@pages/landing/Landing";
import SupportPage from "@pages/landing/Support";

import Loadable from "@components/Loadable";
const ApplyFreeTrial = Loadable(
    lazy(() => import("@pages/authentication/ApplyFreeTrial"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/",
    element: <LandingLayout />,
    children: [
        {
            path: "",
            element: <LandingPage />,
        },
        {
            path: "support",
            element: <SupportPage />,
        },
        {
            path: "apply",
            element: <ApplyFreeTrial />,
        },
        {
            path: ""
        }
    ],
};

export default MainRoutes;
