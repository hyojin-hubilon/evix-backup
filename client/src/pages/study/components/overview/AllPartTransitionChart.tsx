import { Box, Button, Stack, Typography, useTheme, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type PeriodType = 'WEEK' | 'MONTH' | 'YEAR';

const areaChartOptions: ApexOptions = {
    chart: {
        height: 230,
        type: 'line',
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        x: {
            format: 'dd MMM yyyy',
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 0,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
};

const AllPartTransitionChart = ({
    title,
    participationRateByPeriod,
    onPeriodChange,
}: {
    title: string;
    participationRateByPeriod: any;
    onPeriodChange: (period: PeriodType) => void;
}) => {
    const [slot, setSlot] = useState<PeriodType>('WEEK');
    const [series, setSeries] = useState<any[]>([]);
    const theme = useTheme();

    const [options, setOptions] = useState<ApexOptions>(areaChartOptions);

    useEffect(() => {
        const processData = () => {
            if (!participationRateByPeriod) return;

            let data: any[] = [];
            switch (slot) {
                case 'WEEK':
                    data = [
                        {
                            day: participationRateByPeriod.current_day,
                            male: participationRateByPeriod.num_current_day_male,
                            female: participationRateByPeriod.num_current_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_1_day,
                            male: participationRateByPeriod.num_ago_1_day_male,
                            female: participationRateByPeriod.num_ago_1_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_2_day,
                            male: participationRateByPeriod.num_ago_2_day_male,
                            female: participationRateByPeriod.num_ago_2_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_3_day,
                            male: participationRateByPeriod.num_ago_3_day_male,
                            female: participationRateByPeriod.num_ago_3_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_4_day,
                            male: participationRateByPeriod.num_ago_4_day_male,
                            female: participationRateByPeriod.num_ago_4_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_5_day,
                            male: participationRateByPeriod.num_ago_5_day_male,
                            female: participationRateByPeriod.num_ago_5_day_female,
                        },
                        {
                            day: participationRateByPeriod.ago_6_day,
                            male: participationRateByPeriod.num_ago_6_day_male,
                            female: participationRateByPeriod.num_ago_6_day_female,
                        },
                    ];
                    break;

                case 'MONTH':
                    if (Array.isArray(participationRateByPeriod)) {
                        data = participationRateByPeriod.map((item: any) => ({
                            day: item.stats_day,
                            male: item.num_participant_male,
                            female: item.num_participant_female,
                        }));
                    } else {
                        console.error('Invalid data format for MONTH', participationRateByPeriod);
                    }
                    break;
                case 'YEAR':
                    data = [
                        {
                            day: participationRateByPeriod.current_month,
                            male: participationRateByPeriod.num_current_month_male,
                            female: participationRateByPeriod.num_current_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_1_month,
                            male: participationRateByPeriod.num_ago_1_month_male,
                            female: participationRateByPeriod.num_ago_1_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_2_month,
                            male: participationRateByPeriod.num_ago_2_month_male,
                            female: participationRateByPeriod.num_ago_2_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_3_month,
                            male: participationRateByPeriod.num_ago_3_month_male,
                            female: participationRateByPeriod.num_ago_3_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_4_month,
                            male: participationRateByPeriod.num_ago_4_month_male,
                            female: participationRateByPeriod.num_ago_4_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_5_month,
                            male: participationRateByPeriod.num_ago_5_month_male,
                            female: participationRateByPeriod.num_ago_5_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_6_month,
                            male: participationRateByPeriod.num_ago_6_month_male,
                            female: participationRateByPeriod.num_ago_6_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_7_month,
                            male: participationRateByPeriod.num_ago_7_month_male,
                            female: participationRateByPeriod.num_ago_7_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_8_month,
                            male: participationRateByPeriod.num_ago_8_month_male,
                            female: participationRateByPeriod.num_ago_8_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_9_month,
                            male: participationRateByPeriod.num_ago_9_month_male,
                            female: participationRateByPeriod.num_ago_9_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_10_month,
                            male: participationRateByPeriod.num_ago_10_month_male,
                            female: participationRateByPeriod.num_ago_10_month_female,
                        },
                        {
                            day: participationRateByPeriod.ago_11_month,
                            male: participationRateByPeriod.num_ago_11_month_male,
                            female: participationRateByPeriod.num_ago_11_month_female,
                        },
                    ];
                    break;
                default:
                    break;
            }

            const maleSeries = data.map((item) => ({
                x: new Date(item.day).getTime(),
                y: item.male,
            }));
            const femaleSeries = data.map((item) => ({
                x: new Date(item.day).getTime(),
                y: item.female,
            }));

            setSeries([
                {
                    name: t('study.male'),
                    data: maleSeries,
                },
                {
                    name: t('study.female'),
                    data: femaleSeries,
                    color: theme.palette.error.main,
                },
            ]);
        };

        processData();
    }, [slot, participationRateByPeriod, theme]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.secondary.main],
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: [theme.palette.text.secondary],
                    },
                },
                axisBorder: {
                    show: true,
                    color: theme.palette.divider,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [theme.palette.text.secondary],
                    },
                },
                axisBorder: {
                    show: true,
                    color: theme.palette.divider,
                },
            },
            tooltip: {
                y: {
                    formatter: (value) => value + ' ' + t('study.person'),
                },
            },
            grid: {
                borderColor: theme.palette.divider,
            },
        }));
    }, [theme]);

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h6" color="textSecondary">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={1}
                    >
                        <Button
                            size="small"
                            onClick={() => {
                                setSlot('WEEK');
                                onPeriodChange('WEEK');
                            }}
                            color={slot === 'WEEK' ? 'primary' : 'secondary'}
                            variant={slot === 'WEEK' ? 'outlined' : 'text'}
                            sx={{ fontSize: '0.7rem' }}
                        >
                            WEEK
                        </Button>
                        <Button
                            size="small"
                            onClick={() => {
                                setSlot('MONTH');
                                onPeriodChange('MONTH');
                            }}
                            color={slot === 'MONTH' ? 'primary' : 'secondary'}
                            variant={slot === 'MONTH' ? 'outlined' : 'text'}
                            sx={{ fontSize: '0.7rem' }}
                        >
                            MONTH
                        </Button>
                        <Button
                            size="small"
                            onClick={() => {
                                setSlot('YEAR');
                                onPeriodChange('YEAR');
                            }}
                            color={slot === 'YEAR' ? 'primary' : 'secondary'}
                            variant={slot === 'YEAR' ? 'outlined' : 'text'}
                            sx={{ fontSize: '0.7rem' }}
                        >
                            YEAR
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <Box sx={{ pt: 2 }}>
                <ReactApexChart options={options} series={series} type="line" height={230} />
            </Box>
        </>
    );
};

export default AllPartTransitionChart;
