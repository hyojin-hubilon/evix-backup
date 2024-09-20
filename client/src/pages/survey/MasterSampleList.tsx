import surveyApi from "@/apis/survey";
import { SampleSurveyList } from "@/types/survey";
import { Box, Container, Grid, MenuItem, Typography, Select, useTheme, Chip, Dialog, Button, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import CreateIcon from '@mui/icons-material/Create';

import { useNavigate } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { t } from "i18next";
import mastersApi from "@/apis/masters";


const MasterSampleList = () => {
	const theme = useTheme();
	const { primary, grey } = theme.palette;

	const navigate = useNavigate();

	const [samples, setSamples] = useState<SampleSurveyList[]>([]);
	const [ searched, setSearched ] = useState<SampleSurveyList[]>([]);	
	const [ diseases, setDiseases ] = useState<string[]>([])
	const [ selectedDisease, setSelectedDisease ] = useState('');

	const [ surveyNo, setSurveyNo ] = useState<number|null>(null);
	const [ isPreview, setIsPreview ] = useState(false);

	

	const getSampleList = async () => {
		try {
			const response = await mastersApi.getSamples();
			if (response.result && response.code === 200) {
				const sampleList: SampleSurveyList[] = response.content;
				
				const diseasesList = new Set();
				sampleList.forEach(sample => {
					diseasesList.add(sample.disease);
				})

				const diseasesSelection = Array.from(diseasesList) as string[];
				setDiseases(diseasesSelection);
				setSamples(sampleList);
				setSearched(sampleList);
			
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

	const handleClickNew = () => {
		navigate('/master/samples/new', {state: 'new'});
	}

	const handleShowPreview = (survey_no : number) => {
		setSurveyNo(survey_no);
		setIsPreview(true);
	}

	const handleClosePreview = () => {
		setIsPreview(false);
		setSurveyNo(null);
	}

	const handleSelectSample = () => {
		navigate(`/master/survey/new/${surveyNo}`, {state: 'new'})
	}

	return (
		<Box p={2}>
		<Container maxWidth="lg">
			<Grid container rowGap={2}>
				<Grid item xs={12}>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography variant="h3">
							{t('survey.new_survey_sample')}
							{/* Survey 샘플 생성 */}
							</Typography>
						<Select
							value={selectedDisease}
							onChange={(e) => setSelectedDisease(e.target.value)}
							sx={{ backgroundColor: 'white' }}
							displayEmpty
						>
							<MenuItem value="">{t('survey.view_samples_by_disease')}</MenuItem>
							{
								diseases.map((disease, index) => <MenuItem value={disease} key={index}>{ disease }</MenuItem>)
							}
						</Select>
					</Box>
				</Grid>
				<Grid item container xs={12} justifyContent="flex-start" gap={3}>
					<Grid item xs={3.8} alignSelf="stretch">
						<Box onClick={() => handleClickNew()}
							sx={{minHeight: '200px',
								border: `1px dashed ${theme.palette.grey[300]}`,
								borderRadius: '1rem',
								cursor: 'pointer',
								flexDirection: 'column',
								display: 'flex',
								alignItems: 'center',
								alignSelf: 'stretch',
								height:'100%',
								justifyContent:'center',
								backgroundColor: 'rgba(255,255,255,0.5)',
								gap: 2,
								'&:hover' : {
									backgroundColor: 'rgba(255,255,255,0.7)',
									border: `2px solid ${primary.main}`
								}
							 }}>
								<PlusOutlined style={{fontSize: '2rem', color: primary.main}} />
								<Typography variant="h5" sx={{color: primary.main}}>
									{t('survey.make_your_own')}
									{/* 직접 만들기 */}
								</Typography>
						</Box>
					</Grid>
					{
						searched && searched.map((sample, index) => 
							<Grid item xs={3.8} key={index} alignSelf="stretch">
								<Box sx={{
									minHeight: '200px',
									boxSizing:'border-box',
									borderRadius: '1rem',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									padding: '2rem',
									bgcolor: primary.lighter,
									border: `1px solid ${primary.light}`,
									position: 'relative',
									alignSelf: 'stretch',
									height:'100%',
									'&:hover' : {
										'&::after' : {
											display: 'block',
											content: "''",
											position:'absolute',
											left: '-1px',
											top:'-1px',
											right: '-1px',
											bottom: '-1px',
											borderRadius: '1rem',
											border: `2px solid ${primary.main}`,
										}
									}
								}}
								onClick={() => handleShowPreview(sample.survey_no)}
								>
									<Box>
										<Typography variant="h5"># {sample.survey_no}</Typography>
										<Typography variant="h5" sx={{color: primary.main}}>{sample.disease}</Typography>
										<Typography variant="h6" mb={'1rem'}>{sample.title}</Typography>
										<Box
											display="flex"
											alignItems="center"
											gap={0.5}
											sx={{fontSize: '0.7rem', color: primary.dark}}
										>
											<SpeakerNotesOutlinedIcon sx={{fontSize:'1rem', marginLeft:'2px'}} />
											{sample.question_number}</Box>
									</Box>
								</Box>
							</Grid>
						)
					}
				</Grid>
			</Grid>
		</Container>

		{
			surveyNo && isPreview &&
				<Dialog open={isPreview} maxWidth="lg" onClose={handleClosePreview} fullWidth>
					<SurveyPreview surveyNo={surveyNo} handleClose={handleClosePreview} isDialog={true} />
					<Fab variant="extended" sx={{position: 'sticky', bottom: '5%', left: '80%', width: '200px', padding: '0.7rem'}} color="primary" onClick={() => handleSelectSample()}>
						<CreateIcon sx={{ mr: 1 }} />{t('survey.write_with_this_sample')}
					</Fab>
				</Dialog>
		}
		</Box>
	)
}

export default MasterSampleList;