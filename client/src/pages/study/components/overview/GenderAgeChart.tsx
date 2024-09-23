import { ParticipationRateByAge } from '@/types/study';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { t } from 'i18next';
import ReactApexChart from 'react-apexcharts';

const GenderAgeChart = ({
    participationRateByAge,
}: {
    participationRateByAge: ParticipationRateByAge;
}) => {
    const theme = useTheme();

    const totalParticipants = participationRateByAge.num_male + participationRateByAge.num_female;

    const genderChartSeries = [
        {
            name: t('study.male'),
            data: [
                totalParticipants > 0
                    ? Number((participationRateByAge.num_male / totalParticipants) * 100).toFixed()
                    : 0,
            ],
        },
        {
            name: t('study.female'),
            data: [
                totalParticipants > 0
                    ? Number(
                          (participationRateByAge.num_female / totalParticipants) * 100
                      ).toFixed()
                    : 0,
            ],
        },
    ];

    const genderChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        colors: [theme.palette.primary.main, theme.palette.error.main],
        plotOptions: {
            bar: {
                barHeight: '100%',
            },
        },
        xaxis: {
            categories: [t('study.gender')],
            labels: {
                show: false,
            },
        },
        yaxis: {
            max: 100,
            labels: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '%';
                },
            },
        },
    };

    const ageChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            },
        },
        colors: [theme.palette.primary.light, theme.palette.error.light],
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        xaxis: {
            categories: [
                `10${t('study.s')}`,
                `20${t('study.s')}`,
                `30${t('study.s')}`,
                `40${t('study.s')}`,
                `50${t('study.s')}`,
                `60${t('study.s')}`,
                t('study.over_70s'),
            ],
            labels: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + t('study.person');
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: false,
        },
    };

    const ageChartSeries = [
        {
            name: t('study.male'), //남성
            data: [
                participationRateByAge.num_age_10s_m,
                participationRateByAge.num_age_20s_m,
                participationRateByAge.num_age_30s_m,
                participationRateByAge.num_age_40s_m,
                participationRateByAge.num_age_50s_m,
                participationRateByAge.num_age_60s_m,
                participationRateByAge.num_age_70s_m,
            ],
        },
        {
            name: t('study.female'), //여성
            data: [
                participationRateByAge.num_age_10s_f,
                participationRateByAge.num_age_20s_f,
                participationRateByAge.num_age_30s_f,
                participationRateByAge.num_age_40s_f,
                participationRateByAge.num_age_50s_f,
                participationRateByAge.num_age_60s_f,
                participationRateByAge.num_age_70s_f,
            ],
        },
    ];

    return (
        <Box>
            <Grid container>
                <Grid item xs={3}>
                    <Stack>
                        <Typography variant="h6" color="textSecondary">
                            {t('study.participant_gender_age_group')}
                            {/* 참여자 성별/연령대 */}
                        </Typography>
                        <ReactApexChart
                            options={genderChartOptions}
                            series={genderChartSeries}
                            type="bar"
                            height={150}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ mt: '-30px' }}>
                        <ReactApexChart
                            options={ageChartOptions}
                            series={ageChartSeries}
                            type="bar"
                            height={200}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GenderAgeChart;
