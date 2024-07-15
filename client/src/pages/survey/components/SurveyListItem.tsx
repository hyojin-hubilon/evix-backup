import { Link } from 'react-router-dom';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, Grid, IconButton, Typography, useTheme } from '@mui/material';

import { MySurveyList } from '@/types/survey';

type SurveyListItemProps = {
	survey: MySurveyList,
	userNo: number
}

const SurveyListItem = ({ survey, userNo }: SurveyListItemProps) => {
    const theme = useTheme();

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
					
                        <Typography variant="h4">{survey.title}</Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                            {/* { survey.std_start_date} ~ {study.std_end_date} */}
                        </Typography>
                        <Box display="flex" mt={1}>
                           
                        </Box>
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
						
						<IconButton>
							<MoreVertIcon style={{ fontSize: '1.5rem' }} />
						</IconButton>
                        
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default SurveyListItem;
