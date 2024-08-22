import MinimalLayout from "@/layout/MinimalLayout";
import ParticipantStudies from "@/pages/mdpp/ParticipantStudies";

const MdppRoutes = {
    path: '/mdpp',
    element: <MinimalLayout />,
    children: [
        {
            path: 'studies',
            element: <ParticipantStudies />,
        },
	]
}

export default MdppRoutes;