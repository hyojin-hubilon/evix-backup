import { ParticipationRateByAge } from '@/types/study';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const GenderAgeChart = ({
    participationRateByAge,
}: {
    participationRateByAge: ParticipationRateByAge;
}) => {
    const theme = useTheme();

    console.log('participationRateByAge: ', participationRateByAge);

    const genderChartSeries = [
        {
            name: '남성',
            data: [participationRateByAge.num_male],
        },
        {
            name: '여성',
            data: [participationRateByAge.num_female],
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
            categories: ['성별'],
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
            categories: ['10대', '20대', '30대', '40대', '50대', '60대', '70대 이상'],
            labels: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '명';
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
            name: '남성',
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
            name: '여성',
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
                            참여자 성별/연령대
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
