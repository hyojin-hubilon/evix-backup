import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, ClickAwayListener, Dialog, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography, useTheme } from '@mui/material';

import { MySurveyList } from '@/types/survey';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import surveyApi from '@/apis/survey';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';

type SurveyListItemProps = {
	survey: MySurveyList,
	refresh: () => void
}

const SurveyListItem = ({ survey, refresh }: SurveyListItemProps) => {
    const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	
	const navigate = useNavigate();
	const confirm = useConfirmation();
	
	const subOpen = Boolean(anchorEl);
	const handleOpenClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePreview = () => {
		navigate(`/survey/preview/${survey.survey_no}`)
	}

	const deleteThisSurvey = async () => {
		const response = await surveyApi.deleteSurvey(survey.survey_no);
		if (response.result && response.code === 200) {
			refresh();
		}
	}

	const handleCopy = () => {
		confirm({
			title: t('survey.duplicate_the_survey'), //"설문 복제"
			description: t('survey.would_duplicate_survey')//"이 설문을 복제하시겠습니까?"
		})
		.then(() => { 
			navigate(`/survey/copy/${survey.survey_no}`, {state: 'copy'});
		})
	}

	const handleDelete = () => {
		confirm({
			title: t('survey.delete_survey'),//"설문 삭제",
			description: t('survey.sure_delete_survey')//"이 설문을 삭제하시겠습니까?"
		})
		.then(() => { 
			deleteThisSurvey()
		})
		
	}

	const handleEdit = () => {
		navigate(`/survey/edit/${survey.survey_no}`, {state: 'edit'});
	}
	

    return (
        <>
            <Card
                sx={{
                    bgcolor:
                        survey.std_no
                            ? theme.palette.primary.lighter
                            : theme.palette.secondary.lighter,
                    p: '1rem',
                }}
            >
                <Grid container>
                    <Grid item xs={8}>
                        
						{ survey.study_title ? 
							<Typography variant="h6" color="primary.main">
								<LinkOutlined />
								<span style={{fontSize:"0.9rem", marginLeft: "0.3rem", marginRight: "0.5rem"}}>{ survey.study_title }</span>
								<Link to={`/study/detail/${survey.std_no}`} style={{color: theme.palette.secondary.dark}}>
								{t('survey.go_to_study')}
								{/* Study 바로가기 */}
								</Link>
							</Typography>
							:
							<Typography variant="h6" color="secondary.main">{t('survey.under_construction')}</Typography> 
						} 
					
                        <Typography variant="h4" mt="0.3rem" mb="0.3rem">{survey.title}</Typography>
						<Typography>
							<span style={{fontWeight:600}}>{ survey.created_user_first_name } { survey.created_user_last_name }</span> | <span>{survey.question_number}{t('survey.questions')}</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.grey[500] }} mb="0">
                            {t('survey.created_date')} { dayjs(survey.created_at).format('YYYY.MM.DD') }
                        </Typography>
                      
                    </Grid>
                    <Grid
                        item
                        container
                        xs={4}
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                    >
                       

                        {/* 수정 - 설문 참가자가 1명이상일 경우 불가능 - Study 연결후엔 불가능으로 임시 설정 */}
						{ survey.study_title === null && 
							<Button size="large" variant="outlined" onClick={handleEdit}>
								<EditOutlined style={{ fontSize: '1.5rem' }} />
							</Button>
						}
						<div>
						<IconButton
							aria-label="more"
							id="long-button"
							aria-controls={subOpen ? 'long-menu' : undefined}
							aria-expanded={subOpen ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleOpenClick}

						>
							<MoreVertIcon style={{ fontSize: '1.5rem' }} />
						</IconButton>
						<Popper
							sx={{
							zIndex: 1,
							}}
							open={subOpen}
							anchorEl={anchorEl}
							
							role={undefined}
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom',
								}}
							>
								<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu" autoFocusItem>
										<MenuItem onClick={handlePreview}>
											{t('survey.preview')}
											{/* 미리보기 */}
										</MenuItem>
										<MenuItem onClick={handleCopy}>
											{t('survey.duplicate_the_survey')}
											{/* 설문복사 */}
										</MenuItem>
										<MenuItem onClick={handleDelete}>
											{t('common.delete')}
											{/* 삭제 */}
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
								</Paper>
							</Grow>
							)}
						</Popper>
						</div>
                    </Grid>
                </Grid>
            </Card>

			
        </>
    );
};

export default SurveyListItem;
