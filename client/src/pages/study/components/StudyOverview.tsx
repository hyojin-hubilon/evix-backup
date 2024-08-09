import { Box, Grid, Typography } from '@mui/material';
import CircleChart, { ApexDonutChartSeriesType } from './overview/CircleChart';
import MainCard from '@/components/MainCard';
import GenderAgeChart from './overview/GenderAgeChart';
import AllPartTransitionChart from './overview/AllPartTransitionChart';
import PartByHospitalsChart from './overview/PartByHospitalsChart';
import RecentParticipant from './overview/RecentParticipant';
import { ParticipationRateByAge } from '@/types/study';

type StudyOverviewProps = {
    partCompleteRate: ApexDonutChartSeriesType;
    totalParticipants: {
        number_participant: number;
        target_number: number;
    };
    participationRateByAge: ParticipationRateByAge;
};
const StudyOverView = ({
    partCompleteRate,
    totalParticipants,
    participationRateByAge,
}: StudyOverviewProps) => {
    return (
        <>
            <Grid container item columnSpacing={1.5}>
                <Grid item xs={2}>
                    <MainCard sx={{ height: '190px' }} overflow="visible">
                        <Typography variant="h6" color="textSecondary">
                            참여완료율
                        </Typography>
                        <CircleChart series={partCompleteRate} />
                    </MainCard>
                </Grid>
                <Grid item xs={2}>
                    <MainCard sx={{ height: '190px' }}>
                        <Typography variant="h6" color="textSecondary">
                            참여자수
                        </Typography>
                        <Box>
                            <Typography
                                variant="h2"
                                color="primary"
                                sx={{ display: 'block', textAlign: 'center', mt: '2rem' }}
                            >
                                {totalParticipants.number_participant}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ display: 'block', textAlign: 'center', ml: '2rem' }}
                            >
                                /{totalParticipants.target_number}
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
                <Grid item xs={7}>
                    <MainCard sx={{ height: '300px' }} overflow="visible">
                        <AllPartTransitionChart title="전체 참여자 추이" />
                    </MainCard>
                </Grid>
                <Grid item xs={5}>
                    <MainCard sx={{ height: '300px' }}>
                        <PartByHospitalsChart title="병원별 참여자" />
                    </MainCard>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <MainCard>
                    <RecentParticipant />
                </MainCard>
            </Grid>
        </>
    );
};

export default StudyOverView;
