import { Box, Container, Grid, Typography } from '@mui/material';
import ECrfBuilder from './components/ECrfBuilder';
const ECrf = () => {
	return (	
		<>
			<Box>
				{/* <Typography variant="h3">
					eCRF Builder
				</Typography> */}
			</Box>
			<Grid container justifyContent="space-between" alignItems="center">
				<ECrfBuilder />
			</Grid>
		</>	
		
	)
}

export default ECrf;