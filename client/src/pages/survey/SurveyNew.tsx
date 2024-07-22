import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";

const SurveyNew = () => {
	return (
		<Container maxWidth="sm">
			<Grid container flexDirection="column" sx={{minHeight: '100vh'}}>
				<AppBar position="sticky" sx={{bgcolor: "transparent", boxShadow: "none", height: '60px', top: '70px'}}>
					
						<Box display="flex" alignItems="center">
							<Typography variant="h3" color="secondary.dark">Survey 생성</Typography>
							<Box display="flex" justifyContent="flex-end" gap={1} sx={{ml: 'auto'}}>
								<Button variant="outlined">미리보기</Button>
								<Button variant="outlined">임시저장</Button>
								<Button variant="contained">저장</Button>
							</Box>
						</Box>
					
				</AppBar>	
				<FormBuilder />
			</Grid>
		</Container>

	)
}

export default SurveyNew;