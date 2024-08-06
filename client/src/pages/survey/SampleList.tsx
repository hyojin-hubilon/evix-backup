import surveyApi from "@/apis/survey";
import { SampleSurveyList } from "@/types/survey";
import { Box, Card, Container, Grid, MenuItem, Typography, Select, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const SampleList = () => {
	const [samples, setSamples] = useState<SampleSurveyList[]>([]);
	const [ searched, setSearched ] = useState<SampleSurveyList[]>([]);
	const theme = useTheme();
	const { primary } = theme.palette;

	const [ diseases, setDiseases ] = useState<string[]>([])
	const [ selectedDisease, setSelectedDisease ] = useState('');

	const getSampleList = async () => {
		try {
			const response = await surveyApi.getSamples();
			if (response.result && response.code === 200) {
				const sampleList: SampleSurveyList[] = response.content;
				
				const diseasesList = new Set();
				sampleList.forEach(sample => {
					diseasesList.add(sample.disease);
				})

				const diseasesSelection = Array.from(diseasesList) as string[];
				setDiseases(diseasesSelection);
				setSamples(sampleList);
			
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
		
	}
	useEffect(() => {
		getSampleList();
	}, []);

	useEffect(() => {
		if(selectedDisease === '') {
			setSearched(samples)
		} else {
			const searched = samples.filter(sample => selectedDisease == sample.disease);
			setSearched(searched);
		}
		
	}, [selectedDisease])

	return (
		<Container maxWidth="lg">
			<Grid container rowGap={2}>
				<Grid item xs={12}>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography variant="h3">Survey 생성</Typography>
						<Select
							value={selectedDisease}
							onChange={(e) => setSelectedDisease(e.target.value)}
							sx={{ backgroundColor: 'white' }}
							displayEmpty
						>
							<MenuItem value="">질환별 샘플보기</MenuItem>
							{
								diseases.map(disease => <MenuItem value={disease}>{ disease }</MenuItem>)
							}
						</Select>
					</Box>
				</Grid>
				<Grid item container xs={12} justifyContent="space-between" rowGap={3}>
					<Grid item xs={3.8}>
						<Box
							sx={{height: '200px',
								border: `2px dashed ${theme.palette.grey[300]}`,
								borderRadius: '1rem',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent:'center',
								'&:hover' : {
									backgroundColor: 'rgba(255,255,255,0.7)',
									border: `2px solid ${primary.main}`
								}
							 }}>
								<PlusOutlined style={{fontSize: '0.7rem', marginRight: '1rem'}} />
							직접 만들기
						</Box>
					</Grid>
					{
						searched.map((sample, index) => 
							<Grid item xs={3.8} key={index}>
								<Box sx={{
									height: '200px',
									borderRadius: '1rem',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent:'center',
									bgcolor: primary.lighter,
									'&:hover' : {
										border: `2px solid ${primary.main}`,
										// backgroundColor: 'rgba(255,255,255,0.7)'
									}
								}}>
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