import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import { Box, Button, Container, Grid, styled, Typography } from "@mui/material";
import MainCard from "@/components/MainCard";
import CircleChart, { ApexDonutChartSeriesType } from "../study/components/overview/CircleChart";
import dashboardApi from "@/apis/dashboard";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { NumOfParticipantByStudy } from "@/types/dashboard";

export const GreyBox = styled(Box)(({theme}) => ({
	backgroundColor: theme.palette.grey[50],
	borderRadius: '1rem',
	padding: '1rem',
	height: '100%',
	border: `1px solid ${theme.palette.grey[200]}`
}))

export const H5LengthSixteen = styled(Typography)`
	max-width: 240px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const DashboardDefault = () => {
	const [ participantNumber, setParticipantNumber] = useState<NumOfParticipantByStudy[]>([]);
	const [ loadedTime, setLoadedTime ] = useState(new Date());
	const getNumberParticipant = async () => {
		const response = await dashboardApi.getNumOfParticipantByStudy();
		setParticipantNumber(response.content);

		setLoadedTime(new Date())
	}
	
	const handleRefresh =() => {
		getNumberParticipant();
	}


	useEffect(() => {
		getNumberParticipant();
	}, [])

	const getPartCompleteRate = (studyNum:NumOfParticipantByStudy) => {
		const targetNumber = studyNum.target_number;
		
		return {
			labels: ['참여완료율', '미완료율'], //미완료 컬러변경 필요
			series: [studyNum.number_participant, (targetNumber - studyNum.number_participant)],
		};
	}

	
    return  (
		<>
            <Grid item rowSpacing={3} columnSpacing={1}>
                <Grid container item xs={12} justifyContent="space-between" alignItems="center" mb={2}>
                    <Box>
                        <Typography variant="h3">Dashboard</Typography>
                    </Box>
					<Box>
						<Button onClick={handleRefresh}>{ dayjs(loadedTime).format('YYYY-MM-DD hh:mm:ss')} <SyncOutlined style={{marginLeft: '0.5rem'}} /></Button>
					</Box>
                </Grid>

				<Grid item columnSpacing={1.5} xs={12}>
					
					<MainCard sx={{width: 1}}>
						<Typography variant="h4" mb={2}>Number of participants by study</Typography>
						<Grid item container xs={12} gap={2}>
							{
								participantNumber.map(study => 
									<Grid item xs={3.9} sx={{maxWidth: '300px !important'}}>
										<GreyBox>
											<H5LengthSixteen variant="h5">{study.title}</H5LengthSixteen>
											<Box display="flex" justifyContent="center">
												<Box display="flex" alignItems="center">
													<Typography variant="h3" color="primary">{ study.number_participant }</Typography>
													<Typography variant="h5" sx={{ml:'0.5rem'}}> / { study.target_number} </Typography>
												</Box>

												<CircleChart series={getPartCompleteRate(study)} />
											</Box>
										</GreyBox>
									</Grid>
								)
							}
						</Grid>
					</MainCard>

				</Grid>               
            </Grid>
        </>
	);
};

export default DashboardDefault;
