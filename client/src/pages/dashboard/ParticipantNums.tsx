import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import CircleChart from "../study/components/overview/CircleChart"
import { GreyBox, H5LengthSixteen } from "./styles"
import { NumOfParticipantByStudy } from "@/types/dashboard"


import Carousel from 'react-multi-carousel';
import { t } from "i18next";
import { useSelector } from "react-redux";
import { IRootState } from "@/store/reducers";
import { useNavigate } from 'react-router-dom';


type ParticipantNumsType = {
	participantNumber : NumOfParticipantByStudy[]
}

const ParticipantNums = ({participantNumber} : ParticipantNumsType) => {
	const { drawerOpen  } = useSelector((state: IRootState) => state.menu);
	const getPartCompleteRate = (studyNum:NumOfParticipantByStudy) => {
		console.log(studyNum)
		
		return {
			labels: [t('study.completion')], //참여자
			series: [studyNum.participation_late],
		};
	}

	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
	const navigate = useNavigate();

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: drawerOpen ? 1300 : 1024 },
			items: 4,
			partialVisibilityGutter: 40
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			partialVisibilityGutter: 40
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			partialVisibilityGutter: 40

		}
	};

	const handleNewStudy = () => {
		navigate('/study/new');
	}

	return (
		<>
		
		
		{
			participantNumber.length < 3  && matchUpMd ? 
			<Box sx={{
				display:'flex',
				gap: 1
			}}>
				{
					participantNumber.map((study, index) => 
						<div style={{width: '290px', height: '180px'}} key={index}>
							<GreyBox>
								<H5LengthSixteen variant="h5">{study.title}</H5LengthSixteen>
								<Box position="relative">
									<Box sx={{
										position: 'absolute',
										left:'10px',
										top:'50px',
										display: 'flex',
										alignItems: 'flex-end'
									}}>
										<Typography variant="h3" color="primary">{ study.number_participant }</Typography>
										<Typography variant="h5" sx={{ml:'0.5rem'}}> / { study.target_number} </Typography>
									</Box>
									<Box sx={{
										position: 'absolute',
										right: '-30px',
										top: '-20px'
									}}>
										<CircleChart series={getPartCompleteRate(study)} />
									</Box>
								</Box>
							</GreyBox>
						</div>
					)
				}

				<Box alignSelf="stretch" display="flex" flex={1} alignItems="center" justifyContent="center"
					sx={{
						backgroundColor: theme.palette.grey[50],
						borderRadius: '1rem',
					}}>
						<Button onClick={handleNewStudy}>
							<AddIcon sx={{display: 'block'}} />
							<Typography variant="h5">Add a study</Typography>
						</Button>
				</Box>
			</Box>
			:
			<Box sx={{
				width: drawerOpen ? 'calc(100vw - 360px)' : 'calc(100vw - 85px)',
				'li': { width: '290px!important'}
			}}>
			<Carousel
				responsive={responsive}
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className=""
				containerClass="container"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite={false}
				itemClass=""
				keyBoardControl
				minimumTouchDrag={80}
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
			>
			{
				participantNumber.map((study, index) => 
					<div style={{width: '280px', height: '180px'}} key={index}>
						<GreyBox>
							<H5LengthSixteen variant="h5">{study.title}</H5LengthSixteen>
							<Box position="relative">
									<Box sx={{
										position: 'absolute',
										left:'10px',
										top:'50px',
										display: 'flex',
										alignItems: 'flex-end'
									}}>
									<Typography variant="h3" color="primary">{ study.number_participant }</Typography>
									<Typography variant="h5" sx={{ml:'0.5rem'}}> / { study.target_number} </Typography>
								</Box>
								<Box sx={{
										position: 'absolute',
										right: '-30px',
										top: '-20px'
									}}>
									<CircleChart series={getPartCompleteRate(study)} />
								</Box>
							</Box>
						</GreyBox>
					</div>
				)
			}
			</Carousel>
			</Box>
		}
		</>
	)
}

export default ParticipantNums;