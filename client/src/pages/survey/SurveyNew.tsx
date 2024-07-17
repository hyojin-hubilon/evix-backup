import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";

const SurveyNew = () => {
	return (
		<Container maxWidth="sm">
			<Grid container flexDirection="column">
				<Grid item container>
					<Typography variant="h4">Survey 생성</Typography>
					<AppBar position="sticky" sx={{bgcolor: "transparent", boxShadow: "none"}}>
						<Toolbar>
							<Box width={1} display="flex" justifyContent="flex-end" gap={1}>
								<Button variant="outlined">미리보기</Button>
								<Button variant="outlined">임시저장</Button>
								<Button variant="contained">저장</Button>
							</Box>
						</Toolbar>
					</AppBar>
				</Grid>
				
				<FormBuilder />
			</Grid>
		</Container>

	)
}

export default SurveyNew;