import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import useSticky from "@/utils/useSticky";
import { useEffect } from "react";

const SurveyNew = () => {
	
	const { ref, isSticky } = useSticky();

	useEffect(() => {
		console.log(isSticky)
	}, [isSticky])

	return (
		<Container maxWidth="sm">
			<Grid container flexDirection="column" sx={{minHeight: '100vh'}}>
				<AppBar
					position="sticky"
					sx={{bgcolor: isSticky ? `rgba(255, 255, 255, 0.7)` : "transparent", boxShadow: "none", height: '60px', top: '60px', p: '10px', width: '89%'}}
					ref={ref}
					
					>
						<Box display="flex" alignItems="center">
							{
								!isSticky && <Typography variant="h3" color="secondary.dark">Survey 생성</Typography>
							}
							
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