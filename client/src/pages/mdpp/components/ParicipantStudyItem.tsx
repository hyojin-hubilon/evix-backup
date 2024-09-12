import { ParticipantStudyList, StudyParticipantStatus } from '@/types/participant';
import { Box } from '@mui/material';
import * as S from '../styles';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

type ParticipantStudyItemType = {
    study: ParticipantStudyList;
    selectStudy: (study) => void;
};

const getStudyStatus = (
    now: dayjs.Dayjs,
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
    eicName?: string
): StudyParticipantStatus => {
    // 전자서명필요: EIC 파일명이 null
    // 참여중: startDate < 현재일 < endDate
    // 참여완료: 현재일 > endDate
    if (!eicName) {
        return StudyParticipantStatus.NEED_EIC;
    }
    if (now.isBetween(startDate, endDate, null, '[]')) {
        return StudyParticipantStatus.IN_PROGRESS;
    }
    if (now.isAfter(endDate)) {
        return StudyParticipantStatus.DONE;
    }
    return StudyParticipantStatus.NEED_EIC;
};

const ParticipantStudyItem = ({ study, selectStudy }: ParticipantStudyItemType) => {
    const now = dayjs();
    const startDate = dayjs(study.std_start_date || new Date());
    const endDate = dayjs(study.std_end_date || new Date());
    console.log(study);

    const studyStatusKr: Record<StudyParticipantStatus, string> = {
        [StudyParticipantStatus.NEED_EIC]: '전자서명필요',
        [StudyParticipantStatus.IN_PROGRESS]: '참여중',
        [StudyParticipantStatus.DONE]: '참여종료',
    };

    const status = getStudyStatus(now, startDate, endDate, study.signature_eic_name);
    const statusLabel = studyStatusKr[status];

    const handleSelectStudy = (study) => {
		if (status === StudyParticipantStatus.NEED_EIC) {
            navigate(`/mdpp/eic/${study.std_no}`, { state: { study } });
        }
        else if (study.status !== StudyParticipantStatus.DONE) {
            selectStudy(study);
        }
    };

    const navigate = useNavigate();
    // const handleEicPage = () => {
        
    // };

    return (
        <Box p="20px 25px" borderBottom="1px solid #E0E5E9" position="relative" 
			sx={{cursor: status === StudyParticipantStatus.DONE ?  undefined : 'pointer'}}
			onClick={() => handleSelectStudy(study)}>
            <div>
                <Box display="flex" height="21px" alignItems="center" gap="10px">
                    <S.StudyStatus studyStatus={status}>{statusLabel}</S.StudyStatus>
                    <S.StudyTitle>{study.title}</S.StudyTitle>
                </Box>
                <Box pt="14px">
                    <S.StudyDetail>
                        참여기간: {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
                    </S.StudyDetail>
                    <S.StudyDetail>참여기관: {study.participation_organization}</S.StudyDetail>
                </Box>
                <Box display="flex" alignItems="center" gap="5px" mt="15px">
                    <S.StudyTags>
                        {study.number_answer === 0
                            ? '참여대기중'
                            : `총 ${study.number_answer}회 참여`}
                    </S.StudyTags>
                </Box>
            </div>
            <Box
                sx={{
                    position: 'absolute',
                    right: '35px',
                    top: '50%',
                    width: '21px',
                    height: '21px',
                    marginTop: '-10px',
                    color: status === StudyParticipantStatus.DONE ? '#000001' : '#AFB3BA' , // 색상 변경 예시
                }}
                // onClick={handleEicPage}
            >
                <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.85712 6L13.1428 10.2857L8.85712 14.5714"
                        stroke={status !== StudyParticipantStatus.DONE ? '#000001': '#AFB3BA'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z"
                        stroke={status !== StudyParticipantStatus.DONE ? '#000001' : '#AFB3BA'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Box>
        </Box>
    );
};

export default ParticipantStudyItem;
