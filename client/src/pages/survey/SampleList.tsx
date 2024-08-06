import surveyApi from "@/apis/survey";
import { SampleSurveyList } from "@/types/survey";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SampleList = () => {
	const [samples, setSamples] = useState<SampleSurveyList[]>([]);

	const getSampleList = async () => {
		try {
			const response = await surveyApi.getSamples();
			if (response.result && response.code === 200) {
				console.log(response);

				setSamples(response.content)
			
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
		
	}
	useEffect(() => {
		getSampleList();
	}, [])

	return (
		<Container maxWidth="lg">
			<Grid container rowGap={2}>
				<Grid item xs={12}>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography variant="h3">Survey 생성</Typography>
					</Box>
				</Grid>
				<Grid item container xs={12} columnGap={3} rowGap={3}>
					<Grid item xs={3.8}>
						<Box sx={{height: '200px'}}>
							직접 만들기
						</Box>
					</Grid>
					{
						samples.map(sample => 
							<Grid item xs={3.8}>
								<Box sx={{height: '200px'}}>
									{sample.title}
								</Box>
							</Grid>
						)
					}
				</Grid>
			</Grid>
		</Container>
	)
}

export default SampleList;