import { useState } from "react";
import SurveyView from "./SurveyView";
import { Box, Button, Card, Container, Dialog, Grid, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
type SurveyPreviewTypes = {
	surveyNo?: string | number | undefined,
	handleClose?: () => void,
	isDialog?: boolean | undefined,
	headerHide?: boolean,
	isMaster?:boolean
}
const SurveyPreview = ({surveyNo, handleClose, isDialog, headerHide, isMaster} : SurveyPreviewTypes) => {
	//미리보기 / 실제 제출 가능한 서베이 차이
	//미리보기 : 상단에 PC화면/모바일화면 탭이 있음, 미리보기 종료버튼 있음. 제출 disabled 외에는 그대로?
	//제출에는 필수 입력사항 등 Validation 필요
	const [ tab, setTab ] = useState('0');
	const navigate = useNavigate();
	
	
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setTab(newValue);
    };

	const handleEndPreview = () => {
		if(isDialog && handleClose) handleClose();
		else navigate(-1);
	}

	
	return (
		<Container maxWidth="lg">
			<Grid container flexDirection="column" gap={2} width="100%">
				{
					!headerHide && <Grid item container alignItems="center" xs={12} sx={{ borderBottom: 1, borderColor: 'divider', position: isDialog ? 'sticky' : 'relative', top: 0, bgcolor: isDialog ? 'white' : 'transparent' , zIndex: 11 }}>
					<Grid item xs={8}>
						<Tabs
							value={tab}
							onChange={handleChange}
							aria-label="Survey Preview Tab"
						>
							{/* PC 화면 */}
							<Tab label={t('survey.large_screen')} value="0" /> 
							{/* 모바일 화면 */}
							<Tab label={t('survey.mobile_screen')} value="1" />
						</Tabs>
						
					</Grid>
					<Grid item xs={4}>
						<Box display="flex" justifyContent="flex-end">
							<Button variant="contained" sx={{mr: '0.5rem'}} onClick={handleEndPreview}>
								{t('survey.end_preview')}
								{/* 미리보기 종료 */}
							</Button>
							{/* 종료했을때 작성 혹은 목록으로 돌아가기 */}
						</Box>
					</Grid>
				</Grid>
				}
				
				
				<Grid item xs={12} justifyContent="center">
					<Box width={tab == '0' ? '80%' : '390px'} sx={{margin:'0 auto'}}>
						<SurveyView preview={true} surveyNo={surveyNo} isMaster={isMaster}/>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SurveyPreview;