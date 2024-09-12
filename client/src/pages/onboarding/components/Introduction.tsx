import { Box, Button, Grid, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import logoWhite from '@assets/images/onboarding/logo_white.svg'
import { OnboardingContentsType } from "..";
import { Trans } from "react-i18next";

type IntroductionType = {
	contents: OnboardingContentsType;
	next:() => void,
	activeIndex: number,
	contentsLength: number
}

const Introduction = ({contents, next, activeIndex, contentsLength} : IntroductionType) => {
	return (
		<Box component="section" display="flex" minWidth="100vw" minHeight="100vh" bgcolor="#F9FAFB">
			<Box width="50%" position="relative">
				<Box ml="20%" mt="15%" mr="20%">
					<Typography variant="h1"
						sx={{
							fontSize: '3rem',
							fontWeight: 700,
							letterSpacing: '.02em',
							mt:'1rm',
							mb: '3rem',
							'strong' : {
								color: '#2D76EE',
								fontWeight:700
							}
						}}				
					>
						<Trans i18nKey={contents.title} components={{ strong: <strong /> }} />
					</Typography>
					<Box display="flex" flexDirection="column" gap={2}
						sx={{
							'span' : {
								fontSize: '1.5rem',
								fontWeight: 400,
								letterSpacing: '0.02em',
							}
						}}>
							{
								contents.sub.map((subText, index) => 
								<Typography display="flex" alignItems="flex-start" key={index}>
									<CheckCircleIcon sx={{mt:'0.4rem', mr: '1rem'}}/> <span>{subText}</span>
								</Typography>
								)
							}
					</Box>
				</Box>
				<Grid container position="absolute" bottom="0" left="0" width="100%" p="1rem" justifyContent="space-between" borderTop="1px solid #E4E7EC;">
					{
						activeIndex == contentsLength - 1 ? 
						<Grid item xs={5.9}>
							<Button variant="contained" fullWidth color="primary" onClick={next} size="large">시작하기</Button>
						</Grid>:
						<>
							<Grid item xs={5.9}>
								<Button variant="outlined" fullWidth size="large">Skip</Button>
							</Grid>	
							<Grid item xs={5.9}>
								<Button variant="contained" fullWidth color="primary" onClick={next} size="large">Next</Button>
							</Grid>
						</>
					}
					
				</Grid>
			</Box>
			<Box width="50%" sx={{
				background : `url(${contents.imgUrl}) no-repeat center center`,
				backgroundSize: 'cover'
				}}>
				<Box sx={{
					background: 'linear-gradient(0deg, rgba(21, 101, 216, 0.5), rgba(21, 101, 216, 0.5)), url(pills-8656650_1280.jpg)',
					height: '100vh',
					width: '100%',
					position: 'relative'
				}}>
					<Box position="absolute" top="10%" left="10%">
						<img src={logoWhite} />
					</Box>
					<Box position="absolute" bottom="3%" right="7%" color="white">
						<Typography sx={{
							fontSize: '1rem',
							fontWeight: 500,
							letterSpacing: '0.5px',
						}}>{activeIndex + 1}/5</Typography>
					</Box>
				</Box>
			</Box>
			
		</Box>
	)
}

export default Introduction;