import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import CircleChart from "../study/components/overview/CircleChart"
import { GreyBox, H5LengthSixteen } from "./styles"
import { NumOfParticipantByStudy } from "@/types/dashboard"

import Slider from "react-slick";

import { t } from "i18next";
import { useSelector } from "react-redux";
import { IRootState } from "@/store/reducers";
import { useNavigate } from 'react-router-dom';
import { SlickNextArrow, SlickPrevArrow } from '@/components/@extended/SlickArrows';


type ParticipantNumsType = {
	participantNumber : NumOfParticipantByStudy[]
}

const ParticipantNums = ({participantNumber} : ParticipantNumsType) => {
	const { drawerOpen  } = useSelector((state: IRootState) => state.menu);
	const getPartCompleteRate = (studyNum:NumOfParticipantByStudy) => {
		return {
			labels: [t('study.completion')], //참여자
			series: [studyNum.participation_late],
		};
	}

	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
	const navigate = useNavigate();

	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToScroll: 3,
		initialSlide: 0,
		adaptiveHeight: false,
		variableWidth: true,
		arrows:true,
		nextArrow: <SlickNextArrow />,
		prevArrow: <SlickPrevArrow />,
		responsive: [
		  {
			breakpoint: 1400,
			settings: {
			  slidesToScroll: 2
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToScroll: 1
			}
		  }
		]
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
				width: drawerOpen ? 'calc(100vw - 360px)' : 'calc(100vw - 100px)',
				height: '190px'
			}}>
			<Slider {...settings}>
			{
				participantNumber.map((study, index) => 
					<div style={{width: '290px', height: '180px', paddingRight:'1rem'}} key={index}>
						<GreyBox sx={{width: '280px', height: '180px'}}>
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
			</Slider>
			</Box>
		}
		</>
	)
}

export default ParticipantNums;