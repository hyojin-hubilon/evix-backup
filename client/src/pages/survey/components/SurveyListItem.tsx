import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, ClickAwayListener, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography, useTheme } from '@mui/material';

import { MySurveyList } from '@/types/survey';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type SurveyListItemProps = {
	survey: MySurveyList,
	userNo: number
}

const SurveyListItem = ({ survey, userNo }: SurveyListItemProps) => {
    const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	
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

	const handleCopy = () => {

	}

	const handleDelete = () => {

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
                        {/* 임시저장 등 status 추가되어야 함 */}
                        
						{ survey.study_title ? 
							<Typography variant="h6" color="primary.main">
								<LinkOutlined /><span style={{fontSize:"0.9rem", marginLeft: "0.3rem", marginRight: "0.5rem"}}>{ survey.study_title }</span> <Link to={`/study/detail/${survey.std_no}`} style={{color: theme.palette.secondary.dark}}>Study 바로가기</Link>
							</Typography>
							:
							<Typography variant="h6" color="secondary.main">작성중</Typography> 
						} 
					
                        <Typography variant="h4" mt="0.3rem" mb="0.3rem">{survey.title}</Typography>
						<Typography>
							<span style={{fontWeight:600}}>{ survey.created_user_first_name } { survey.created_user_last_name }</span> | <span>{survey.question_number}문항</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.grey[500] }} mb="0">
                            생성일 { dayjs(survey.created_at).format('YYYY.MM.DD') }
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
                       

                        {/* 수정 - 설문 참가자가 1명이상일 경우 불가능 - Status 추가되어야 함 */}
                       	{
							<Button size="large" variant="outlined">
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
										<MenuItem onClick={handlePreview}>미리보기</MenuItem>
										<MenuItem onClick={handleCopy}>설문복사</MenuItem>
										<MenuItem onClick={handleDelete}>삭제</MenuItem>
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
