import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import { Box, Button, Grid, Typography } from "@mui/material";
import MainCard from "@/components/MainCard";
import CircleChart, { ApexDonutChartSeriesType } from "../study/components/overview/CircleChart";
import dashboardApi from "@/apis/dashboard";
import { useEffect, useState } from "react";



const DashboardDefault = () => {
	const [ participantNumber, setParticipantNumber] = useState<any>();
	const getNumberParticipant = async () => {
		const response = await dashboardApi.getNumberOfParicipant();
		setParticipantNumber(response.content);
	}


	const partCompleteRate: ApexDonutChartSeriesType = {
        labels: ['참여완료율', '미완료율'],
        series: [75, 25],
    };


	useEffect(() => {
		getNumberParticipant();
	}, [])

	
    return  (
		<>
            {/* <Grid container rowSpacing={3} columnSpacing={1}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">Dashborad</Typography>
                    </Box>
					<Box>
						<Button>2024-07-19 12:34:05 <SyncOutlined /></Button>
					</Box>
                </Grid>

				<Grid container item columnSpacing={1.5}>
				Number of participants by study
				<Grid item xs={2}>
					<MainCard sx={{height: '190px'}} overflow="visible">
						<Typography variant="h6" color="textSecondary">참여완료율</Typography>
						<CircleChart series={partCompleteRate} />
					</MainCard>
				</Grid>
				<Grid item xs={2}>
					<MainCard sx={{height: '190px'}}>
						<Typography variant="h6" color="textSecondary">
							참여자수
						</Typography>
						<Box>
							<Typography variant="h2" color="primary" sx={{display: 'block', textAlign: 'center', mt: '2rem'}}>1500</Typography>
							<Typography variant="h5" sx={{display: 'block', textAlign: 'center', ml: '2rem'}}>/2000</Typography>
						</Box>
					</MainCard>
				</Grid>
			</Grid>

                
               
            </Grid> */}
        </>
	);
};

export default DashboardDefault;
