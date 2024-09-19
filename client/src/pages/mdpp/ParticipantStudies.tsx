import { Box, Card, Typography } from '@mui/material';
import MdppHeader from './components/MdppHeader';
import * as S from './styles';
import ParticipantStudyItem from './components/ParicipantStudyItem';
import { ParticipantStudyList } from '@/types/participant';
import participantStudyApi from '@/apis/participantStudy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantStudies = () => {
    const [participantStudy, setParticipantStudy] = useState<ParticipantStudyList[]>([]);
	const navigate = useNavigate();

    useEffect(() => {
        login(); //TODO: 임시 로그인임,  삭제 처리할 것..
        fetchStudyList();
    }, []);

    const login = async () => {
        const response = await participantStudyApi.login();
		console.log(response);
    };
    const fetchStudyList = async () => {
        try {
            const response = await participantStudyApi.studyList();
            const content = response.content as { studyMyList: ParticipantStudyList[] };

            if (content.studyMyList) {
                setParticipantStudy(content.studyMyList);
            }
        } catch (error) {
            console.error('Failed to get participants study list', error);
        }
    };

	const selectStudy = (study : ParticipantStudyList) => {
		navigate(`/mdpp/study/${study.std_no}/surveys`);
	}

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pt: '22px' }}>
            <MdppHeader title="임상연구 설문 참여" backBtn backExitWebview></MdppHeader>
            <Box p="23px">
                <S.CommonText>
                    임상연구에 참여해 주셔서 감사드립니다. 참여하고 있는 연구를 확인하고, 설문을
                    진행해 주세요.
                </S.CommonText>
            </Box>

            <Box mt="21px" borderTop="1px solid #E0E5E9">
                {participantStudy.map((study, index) => (
                    <ParticipantStudyItem study={study} selectStudy={selectStudy} key={study.std_no} />
                ))}
            </Box>
            <Box p="50px 23px">
                <S.GreyBox>
                    <Typography variant="h5">임상연구 참여 안내</Typography>
                    <S.CommonText>
                        메디팡팡은 임상연구자와 참여자 연결 역할을 담당하고 있습니다. 임상연구와
                        관련한 문의는 참여하신 병원 또는 연구기관으로 문의해 주세요.
                    </S.CommonText>
                </S.GreyBox>
            </Box>
        </Box>
    );
};

export default ParticipantStudies;
