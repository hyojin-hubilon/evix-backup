import { Box, Button, Grid, Typography } from '@mui/material';
import CircleChart, { ApexDonutChartSeriesType } from './overview/CircleChart';
import MainCard from '@/components/MainCard';
import GenderAgeChart from './overview/GenderAgeChart';
import AllPartTransitionChart from './overview/AllPartTransitionChart';
import PartByHospitalsChart from './overview/PartByHospitalsChart';
import RecentParticipant from './overview/RecentParticipant';
import { ParticipantsList, ParticipationRateByAge, StudyType } from '@/types/study';
import { t } from 'i18next';
import { downloadPNG } from '@/utils/helper';
import { useRef } from 'react';

type StudyOverviewProps = {
    partCompleteRate: ApexDonutChartSeriesType;
    totalParticipants: {
        number_participant: number;
        target_number: number;
    };
    participationRateByAge: ParticipationRateByAge;
    participantList: ParticipantsList[];
    participationRateByPeriod: any;
    onPeriodChange: (newPeriod: 'WEEK' | 'MONTH' | 'YEAR') => void;
    onMoreClick: () => void;
	stdType: StudyType
};

const StudyOverView = ({
    partCompleteRate,
    totalParticipants,
    participationRateByAge,
    participantList,
    participationRateByPeriod,
    onPeriodChange,
    onMoreClick,
	stdType
}: StudyOverviewProps) => {

	
    return (
        <>
            <Grid container item columnSpacing={1.5}>
                <Grid item xs={2}>
                    <MainCard sx={{ height: '190px', position: 'relative' }} overflow="visible">
                        <Typography variant="h6" color="textSecondary">
                            {t('study.participation_completion_rate')}
                            {/* 참여완료율 */}
                        </Typography>
						<Box sx={{
							position: 'absolute',
							top:'20px',
							left: '50%',
							transform: 'translateX(-50%)'
						}}>
							
                        <CircleChart series={partCompleteRate} id={"participant_rate"}  />
						</Box>
                    </MainCard>
                </Grid>
                <Grid item xs={2}>
                    <MainCard sx={{ height: '190px' }}>
                        <Typography variant="h6" color="textSecondary">
                            {t('study.number_of_participants')}
                            {/* 참여자수 */}
                        </Typography>
                        <Box display="flex" alignItems="flex-end" justifyContent="center" pt="2.5rem">
                            <Typography
                                variant="h2"
                                color="primary"
                            >
                                {totalParticipants.number_participant}
                            </Typography>
							<Typography variant='h5' sx={{ml: '0.5rem', mr: '0.5rem'}}> / </Typography>
                            <Typography
                                variant="h5"
                            >
								{totalParticipants.target_number}
                            </Typography>
                        </Box>
                    </MainCard>
                </Grid>
                <Grid item xs={8}>
                    <MainCard sx={{ height: '190px' }} overflow="visible">
                        <GenderAgeChart participationRateByAge={participationRateByAge} />
                    </MainCard>
                </Grid>
            </Grid>

            <Grid container item columnSpacing={1.5}>
                <Grid item xs={12}>
                    <MainCard sx={{ height: '300px' }} overflow="visible">
                        <AllPartTransitionChart
                            title={t('study.total_participant_trends')}
                            participationRateByPeriod={participationRateByPeriod}
                            onPeriodChange={onPeriodChange}
                        />
                        {/* 전체 참여자 추이 */}
                    </MainCard>
                </Grid>
                {/* <Grid item xs={5}>
                    <MainCard sx={{ height: '300px' }}>
                        <PartByHospitalsChart title={t('study.status_by_institution')} />
                    </MainCard>
                </Grid> */}
            </Grid>

            <Grid item xs={12}>
                <MainCard>
                    <RecentParticipant
                        participantList={participantList}
                        onMoreClick={onMoreClick}
						studyType={stdType}
                    />
                </MainCard>
            </Grid>
        </>
    );
};

export default StudyOverView;
