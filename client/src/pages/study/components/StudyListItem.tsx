import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    Chip,
    ClickAwayListener,
    Grid,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography,
    useTheme,
} from '@mui/material';

import { Manager, StudyListItemProps } from '@/types/study';
import { useEffect, useState } from 'react';
import MemberManagement from './study-new/MemberManagement';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    CompletedIcon,
    ExpiredIcon,
    NewIcon,
    OngoingIcon,
    PauseIcon,
    StopIcon,
} from '@/components/StatusIcons';
import { useUserProfile } from '@/context/UserProfileContext';
import { t } from 'i18next';
import moment from 'moment';

// * 진행중인 상태일 경우, 한눈에 알아볼 수 있도록 bg를 다르게 처리함.
// * 배포전/일시정지/중단: 빨간색 txt 처리
// * 진행종료: 비활성화를 의미하는 회색 txt 처리

export const STUDY_STATUS = {
    'STD-CREATED': 'New', //생성완료
    'STD-PROGRESSION': 'Ongoing', //진행중
    'STD-DONE': 'Completed', //완료
    'STD-Expired': 'Expired', //만료
    'STD-PAUSE': 'Pause', //일시정지
} as const;

// 타입으로 추출
export type STUDY_STATUS_KEY = keyof typeof STUDY_STATUS;

export const TitleStatusIcon = ({ status, color }: { status: string, color?: string }) => {
    const theme = useTheme();
    const { stdStatus } = theme.palette;
    return (
        <span>
            {
                {
                    'STD-CREATED': <NewIcon color={color ? color : stdStatus.new} />,
                    'STD-PROGRESSION': <OngoingIcon color={color ? color : stdStatus.ongoing} />,
                    'STD-DONE': <CompletedIcon color={color ? color : stdStatus.completed} />,
                    'STD-Expired': <ExpiredIcon color={color ? color : stdStatus.expired} />,
                    'STD-PAUSE': <PauseIcon color={color ? color : stdStatus.pause} />,
                }[status]
            }
        </span>
    );
};

const StudyListItem = ({ study }: StudyListItemProps) => {
    const theme = useTheme();
    // const statusLabel = STUDY_STATUS[study.std_status as STUDY_STATUS_KEY];
    const [isEditable, setIsEditable] = useState(false);
    const { stdStatus } = theme.palette;

    const { userProfile } = useUserProfile();

    const managerList: Manager[] = study.managerList;

    const navigate = useNavigate();

    const handleEditClick = (std_no: number) => {
        navigate('/study/new', { state: { mode: 'edit', stdNo: std_no } });
    };

    const [isOpenMember, setIsOpenMember] = useState(false);

    const handleCloseMember = () => {
        setIsOpenMember(!isOpenMember);
    };

    const handleInviteMember = (std_no: number) => {
        setIsOpenMember(true);
    };

    const handleMemberManagementClose = () => {
        setIsOpenMember(false);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const subOpen = Boolean(anchorEl);

    const handleOpenClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShowStudy = () => {
        navigate(`/study/detail/${study.std_no}`);
    };

    useEffect(() => {
        const user_no = userProfile?.user_no;

        if (user_no) {
            const isEditable = managerList.some(
                (manager) =>
                    (manager.user_no === user_no && manager.std_privilege === 'OWNER') ||
                    (manager.user_no === user_no && manager.std_privilege === 'MAINTAINER')
            );
            setIsEditable(isEditable);
        }
    }, []);

    const today = moment().format('YYYY-MM-DD');
    const endDate = study.std_end_date;

    const getStatusLabel = () => {
        if (endDate < today) {
            return 'Expired';
        }
        return STUDY_STATUS[study.std_status as STUDY_STATUS_KEY];
    };

    const statusLabel = getStatusLabel();

    return (
        <>
            <Card
                sx={{
                    bgcolor: theme.palette.secondary.lighter,
                    ...(study.std_status === 'STD-PROGRESSION' && {
                        bgcolor: theme.palette.primary.lighter,
                    }), //Ongoing
                    ...(study.std_status === 'STD-DONE' && {
                        bgcolor: theme.palette.success.lighter,
                    }), //Completed
                    ...(endDate < today &&
                        'STD-Expired' && {
                            bgcolor: theme.palette.purple.lighter,
                        }), //Expired
                    p: '1rem',
                    cursor: 'pointer',
                }}
            >
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        {/* 진행중/배포전/진행종료/일시정지/중단/Demo */}

                        <Typography
                            sx={{
                                color: stdStatus.new,
                                ...(study.std_status === 'STD-PROGRESSION' && {
                                    color: stdStatus.ongoing,
                                }), //Ongoing
                                ...(study.std_status === 'STD-DONE' && {
                                    color: stdStatus.completed,
                                }), //Completed
                                ...(endDate < today &&
                                    'STD-Expired' && {
                                        color: stdStatus.expired,
                                    }), //Expired
                            }}
                            fontWeight="600"
                        >
                            {/* <TitleStatusIcon status={study.std_status} /> {statusLabel} */}
                            <TitleStatusIcon
                                status={endDate < today ? 'STD-Expired' : study.std_status}
                            />{' '}
                            {statusLabel}
                        </Typography>
						<Box display="flex" alignItems="center" mt="0.3rem" mb="0.3rem">
							<Chip
								label={study.std_type}
								size="small" 
								sx={{mr:'0.3rem',
									fontSize:'0.7rem',
									opacity: (study.std_status === 'STD-PROGRESSION' && endDate > today) ? 1 : 0.5
								}} 
								color={
									study.std_type === 'E-PRO' ? "primary" : "info"}
								/>
							<Typography
								variant="h4"
								onClick={handleShowStudy}
								sx={{
									maxHeight: '30px',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
								}}
							>
								{study.title}
							</Typography>
						</Box>
                        <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                            {study.std_start_date} ~ {study.std_end_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex">
                            <AvatarGroup total={managerList.length} max={4}>
                                {managerList.map((manager, index) => (
                                    <Avatar
                                        key={index}
                                        alt={manager.profile_image_name}
                                        src={manager.profile_image_url}
                                    />
                                ))}
                            </AvatarGroup>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={1}
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                    >
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
                                            <MenuList id="study-button-menu" autoFocusItem>
                                                {study.std_privilege === 'OWNER' &&
                                                    study.std_status !== 'STD-DONE' && (
                                                        <MenuItem
                                                            onClick={() =>
                                                                handleInviteMember(study.std_no)
                                                            }
                                                        >
                                                            {t('study.invite_members')}
                                                            {/* Invite members */}
                                                        </MenuItem>
                                                    )}
                                                {study.std_status !== 'STD-CREATED' && (
                                                    <MenuItem
                                                        component={Link}
                                                        to={`/study/detail/${study.std_no}`}
                                                    >
                                                        {t('study.view_results')}
                                                        {/* Veiw Results */}
                                                    </MenuItem>
                                                )}
                                                {isEditable && (
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleEditClick(study.std_no)
                                                        }
                                                    >
                                                        Settings
                                                    </MenuItem>
                                                )}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>

                        {/* 멤버초대 - OWNER */}
                        {/* Study가 종료상태일 때는 멤버 초대할수 없으므로 버튼 비노출 */}
                        {/* {isOwner && study.std_status !== 'STD-DONE' && (
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={() => handleInviteMember(study.std_no)}
                            >
                                <UserAddOutlined style={{ fontSize: '1.5rem' }} />
                            </Button>
                        )} */}

                        {/* 수정 - OWNER, MAINTAINER */}
                        {/* {isEditable && (
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={() => handleEditClick(study.std_no)}
                            >
                                <EditOutlined style={{ fontSize: '1.5rem' }} />
                            </Button>
                        )} */}

                        {/* Overview  */}
                        {/* Study가 배포전일 때는 결과 데이터가 없으므로 버튼 비노출 */}
                        {/* {study.std_status !== 'STD-CREATED' && (
                            <Button
                                component={Link}
                                to={`/study/detail/${study.std_no}`}
                                size="large"
                                variant="outlined"
                            >
                                <FundViewOutlined style={{ fontSize: '1.5rem' }} />
                            </Button>
                        )} */}
                    </Grid>
                </Grid>
            </Card>
            <MemberManagement
                isOpen={isOpenMember}
                studyNo={study.std_no}
                handleClose={handleCloseMember}
            />
        </>
    );
};

export default StudyListItem;
