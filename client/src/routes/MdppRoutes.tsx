import MinimalLayout from "@/layout/MinimalLayout";
import EICAgreement from "@/pages/mdpp/EICAgreement";
import MdppSurvey from "@/pages/mdpp/MdppSurvey";
import ParticipantStudies from "@/pages/mdpp/ParticipantStudies";
import ParticipantSurveys from "@/pages/mdpp/ParticipantSurveys";

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