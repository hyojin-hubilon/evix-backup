import { Box, Button, Grid, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import logoWhite from '@assets/images/onboarding/logo_white.svg'
import onboardingImg01 from '@assets/images/onboarding/01.jpg'
const Introduction = () => {
	return (
		<Box component="section" display="flex" minWidth="100vw" minHeight="100vh" bgcolor="#F9FAFB">
			<Box width="50%" position="relative">
				<Box ml="20%" mt="20%">
					<Typography variant="h1"
						sx={{
							fontSize: '3rem',
							fontWeight: 700,
							lineHeight: '126px',
							letterSpacing: '.02em',
							mb: '3rem'
						}}				
					>
						Welcome to evix-DCT
					</Typography>
					<Box display="flex" flexDirection="column" gap={2}
						sx={{
							'span' : {
								fontSize: '1.5rem',
								fontWeight: 400,
								letterSpacing: '0.02em',
							}
						}}>
						<Typography display="flex" alignItems="center">
							<CheckCircleIcon sx={{mr: '1rem'}}/> <span>Create Study</span>
						</Typography>

						<Typography display="flex" alignItems="center">
							<CheckCircleIcon sx={{mr: '1rem'}}/> <span>Open Study</span>
						</Typography>

						<Typography display="flex" alignItems="center">
							<CheckCircleIcon sx={{mr: '1rem'}}/> <span>Real-time monitoring</span>
						</Typography>

						<Typography display="flex" alignItems="center">
							<CheckCircleIcon sx={{mr: '1rem'}}/> <span>Report results</span>
						</Typography>
					</Box>
				</Box>
				<Grid container position="absolute" bottom="0" left="0" width="100%" p="1rem" justifyContent="space-between" borderTop="1px solid #E4E7EC;">
					<Grid item xs={5.9}>
						<Button variant="outlined" fullWidth>Skip</Button>
					</Grid>	
					<Grid item xs={5.9}>
						<Button variant="contained" fullWidth color="primary">Next</Button>
					</Grid>
				</Grid>
			</Box>
			<Box width="50%" sx={{
				background : `url(${onboardingImg01}) no-repeat center center`,
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
						}}>1/5</Typography>
					</Box>
				</Box>
			</Box>
			
		</Box>
	)
}

export default Introduction;