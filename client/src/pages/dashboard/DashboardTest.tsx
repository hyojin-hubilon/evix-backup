import DashboardApi from '@/apis/dashboard';
import { NumOfParticipantByStudy } from '@/types/dashboard';
import { useEffect, useState } from 'react';

const DashboardTest = () => {
    const [dummy, setDummy] = useState<NumOfParticipantByStudy[]>([]);

    useEffect(() => {
        const getNumOfParticipantByStudy = async () => {
            const response = await DashboardApi.getNumOfParticipantByStudy();
            if (response.code === 200) {
                console.log(response.content);
                setDummy(response.content);
            }
        };
        getNumOfParticipantByStudy();
    }, []);

    return (
        <>
            {dummy.map((item) => (
                <ul key={item.std_no}>
                    <li>{item.title}</li>
                    <li>{item.std_type}</li>
                    <li>{item.number_participant}</li>
                    <li>{item.participation_late}</li>
                    <li>{item.target_number}</li>
                </ul>
            ))}
        </>
    );
};

export default DashboardTest;
