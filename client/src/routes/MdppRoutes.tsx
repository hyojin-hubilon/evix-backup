import MinimalLayout from "@/layout/MinimalLayout";
import EICAgreement from "@/pages/mdpp/EICAgreement";
import MdppSurvey from "@/pages/mdpp/MdppSurvey";
import ParticipantStudies from "@/pages/mdpp/ParticipantStudies";

const MdppRoutes = {
    path: '/mdpp',
    element: <MinimalLayout />,
    children: [
        {
            path: 'studies',
            element: <ParticipantStudies />,
        },
		{
            path: 'eic/:stdNo',
            element: <EICAgreement />,
        },
		{
			path: 'survey/:survey_no',
			element: <MdppSurvey />
		}
	]
}

export default MdppRoutes;