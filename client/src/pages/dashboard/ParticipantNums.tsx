import { Box, Grid, Typography } from "@mui/material"
import CircleChart from "../study/components/overview/CircleChart"
import { GreyBox, H5LengthSixteen } from "./styles"
import { NumOfParticipantByStudy } from "@/types/dashboard"


import Carousel from 'react-multi-carousel';


type ParticipantNumsType = {
	participantNumber : NumOfParticipantByStudy[]
}

const ParticipantNums = ({participantNumber} : ParticipantNumsType) => {
	const getPartCompleteRate = (studyNum:NumOfParticipantByStudy) => {
		const targetNumber = studyNum.target_number;
		
		return {
			labels: ['참여완료율', '미완료율'],
			series: [studyNum.number_participant, (targetNumber - studyNum.number_participant)],
		};
	}

	const responsive = {
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 4
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 2
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1
		}
	  };

	return (
		
		<Box sx={{
			// 'ul' : { width: 'inherit'}
			'li': { width: '290px!important'}
		}}>
		{
			participantNumber && 
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
				renderDotsOutside={false}>
			{
				participantNumber.map((study, index) => 
					<div style={{width: '280px', height: '180px'}} key={index}>
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
					</div>
				)
			}
			</Carousel>
			
		}
		</Box>
		
	)
}

export default ParticipantNums;