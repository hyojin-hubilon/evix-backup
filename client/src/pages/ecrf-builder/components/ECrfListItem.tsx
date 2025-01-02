import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, ClickAwayListener, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography, useTheme } from '@mui/material';


import dayjs from 'dayjs';
import { useState } from 'react';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';
import ecrfApi from '@/apis/ecrf';
import { MyCRFList } from '@/types/ecrf';

type ECrfListItemProps = {
	crf: MyCRFList,
	refresh: () => void
}

const ECrfListItem = ({ crf, refresh }: ECrfListItemProps) => {
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
		navigate(`/e-crf/preview/${crf.crf_no}`)
	}

	const deleteThisCrf = async () => {
		const response = await ecrfApi.deleteCrf(crf.crf_no);
		if (response.result && response.code === 200) {
			refresh();
		}
	}

	const handleCopy = () => {
		void confirm({
			title: t('ecrf.duplicate_the_ecrf'), //"ecrf 복제"
			description: t('ecrf.would_duplicate')//"복제하시겠습니까?"
		})
		.then(() => { 
			navigate(`/e-crf/copy/${crf.crf_no}`, {state: 'copy'});
		})
	}

	const handleDelete = () => {
		void confirm({
			title: t('ecrf.delete_ecrf'),//"삭제",
			description: t('ecrf.sure_delete')//"삭제하시겠습니까?"
		})
		.then(() => { 
			void deleteThisCrf()
		})
		
	}

	const handleEdit = () => {
		navigate(`/e-crf/edit/${crf.crf_no}`, {state: 'edit'});
	}
	

    return (
        <>
            <Card
                sx={{
                    bgcolor:
						crf.crf_no
                            ? theme.palette.primary.lighter
                            : theme.palette.secondary.lighter,
                    p: '1rem',
                }}
            >
                <Grid container>
                    <Grid item xs={8}>
                        
						{ crf.std_title ? 
							<Typography variant="h6" color="primary.main">
								<LinkOutlined />
								<span style={{fontSize:"0.9rem", marginLeft: "0.3rem", marginRight: "0.5rem"}}>{ crf.std_title }</span>
								<Link to={`/study/detail/${crf.std_no}`} style={{color: theme.palette.secondary.dark}}>
								{t('ecrf.go_to_study')}
								{/* Study 바로가기 */}
								</Link>
							</Typography>
							:
							<Typography variant="h6" color="secondary.main">{t('ecrf.under_construction')}</Typography> 
						} 
					
                        <Typography variant="h4" mt="0.3rem" mb="0.3rem">{crf.crf_title}</Typography>
						
						<Typography variant="h5">
                            {crf.created_user_first_name ? crf.created_user_first_name : ''}
							{crf.created_user_last_name ? crf.created_user_last_name : ''}
                        </Typography>

						<Typography variant="caption" sx={{ color: theme.palette.grey[500] }} mb="0">
                            {t('ecrf.created_date')} { dayjs(crf.created_at).format('YYYY.MM.DD') }
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
						{ crf.std_title === null && 
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
											{t('ecrf.preview')}
											{/* 미리보기 */}
										</MenuItem>
										<MenuItem onClick={handleCopy}>
											{t('ecrf.duplicate_the_ecrf')}
											{/* 복사 */}
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

export default ECrfListItem;
