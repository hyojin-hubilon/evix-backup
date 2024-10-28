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
			<Grid container item xs={12} justifyContent="space-between" alignItems="center" spacing={1}>
				<ECrfBuilder />
			</Grid>
		</>	
		
	)
}

export default ECrf;