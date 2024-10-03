import Loadable from "@/components/Loadable";
import { lazy } from "react";

import MinimalLayout from "@/layout/MinimalLayout";

const EICAgreement = Loadable(lazy(() => import('@pages/mdpp/EICAgreement')));
const MdppSurvey = Loadable(lazy(() => import('@pages/mdpp/MdppSurvey')));
const ParticipantStudies = Loadable(lazy(() => import('@pages/mdpp/ParticipantStudies')));
const ParticipantSurveys =  Loadable(lazy(() => import('@pages/mdpp/ParticipantSurveys')));

const MdppRoutes = {
    path: '/mdpp',
    element: <MinimalLayout />,
    children: [
        {
            path: 'studies',
            element: <ParticipantStudies />,
        },
		{
            path: 'study/:stdNo/surveys',
            element: <ParticipantSurveys />,
        },
		{
            path: 'eic/:stdNo',
            element: <EICAgreement />,
        },
		{
			path: 'survey/:setNo/:surveyNo/:surveyCycle/:surveyTurn',
			element: <MdppSurvey />
		}
	]
}

export default MdppRoutes;