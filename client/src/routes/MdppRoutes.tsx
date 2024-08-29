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
            path: 'surveys',
            element: <ParticipantSurveys />,
        },
		{
            path: 'eic',
            element: <EICAgreement />,
        },
		{
			path: 'survey/:survey_no',
			element: <MdppSurvey />
		}
	]
}

export default MdppRoutes;