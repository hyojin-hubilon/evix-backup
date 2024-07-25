import { useState } from "react";
import { useParams } from "react-router-dom";
import SurveyDetail from "./SurveyDetail";
import { Box, Card, Container, Grid, Tab, Tabs } from "@mui/material";

const SurveyPreview = () => {
	//미리보기 / 실제 제출 가능한 서베이 차이
	//미리보기 : 상단에 PC화면/모바일화면 탭이 있음, 미리보기 종료버튼 있음. 제출 disabled 외에는 그대로?
	//제출에는 필수 입력사항 등 Validation 필요
	const [ tab, setTab ] = useState('0');
	const { survey_no } = useParams<{ survey_no: any }>();

	
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setTab(newValue);
    };
	
	return (
		<Container maxWidth="lg">
			<Grid container flexDirection="column" gap={1}>
				<Grid item xs={12}>
					<Tabs
						value={tab}
						onChange={handleChange}
						aria-label="Survey Preview Tab"
						sx={{ borderBottom: 1, borderColor: 'divider' }}
					>
						<Tab label="PC 화면" value="0" />
						<Tab label="모바일 화면" value="1" />
					</Tabs>

				</Grid>
				
				<Grid item xs={tab === '0' ? 12 : 5} justifyContent="center">
					<Card sx={{backgroundColor: 'white'}}>
						<SurveyDetail surveyNo={survey_no} />
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SurveyPreview;