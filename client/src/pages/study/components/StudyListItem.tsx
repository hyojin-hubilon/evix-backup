import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, FundViewOutlined, UserAddOutlined } from '@ant-design/icons';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Card,
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

import { ManagerList, StudyListItemProps } from '@/types/study';
import { getDecodedToken } from '@/utils/Cookie';
import StudyNew from '../StudyNew';
import { useState } from 'react';
import SurveyConnectDialog from './study-new/SurveyConnetDialog';
import MemberManagement from './study-new/MemberManagement';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// * 진행중인 상태일 경우, 한눈에 알아볼 수 있도록 bg를 다르게 처리함.
// * 배포전/일시정지/중단: 빨간색 txt 처리
// * 진행종료: 비활성화를 의미하는 회색 txt 처리

export const STUDY_STATUS = {
    'STD-CREATED': '생성완료',
    'STD-PROGRESSION': '진행중',
    'STD-DONE': '완료',
    'STD-EXPIRATION': '만료',
    'STD-PAUSE': '일시정지',
    'STD-STOP': '중지/중단',
} as const;

// 타입으로 추출
export type STUDY_STATUS_KEY = keyof typeof STUDY_STATUS;

const StudyListItem = ({ study }: StudyListItemProps) => {
    const theme = useTheme();
    const statusLabel = STUDY_STATUS[study.std_status as STUDY_STATUS_KEY];

    const managerList: ManagerList[] = study.managerList;

    const decodedToken = getDecodedToken('userInfoToken');

    const userNo = decodedToken['user-no'];

    const isOwner = managerList.some(
        (manager) => manager.user_no === userNo && manager.std_privilege === 'OWNER'
    );

    const isEditable = managerList.some(
        (manager) =>
            (manager.user_no === userNo && manager.std_privilege === 'OWNER') ||
            (manager.user_no === userNo && manager.std_privilege === 'MAINTAINER')
    );

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

    return (
        <>
            <Card
                sx={{
                    bgcolor:
                        study.std_status === 'STD-PROGRESSION'
                            ? theme.palette.primary.lighter
                            : theme.palette.secondary.lighter,
                    p: '1rem',
                }}
            >
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        {/* 진행중/배포전/진행종료/일시정지/중단/Demo */}

                        <Typography variant="h6" color={'primary.main'}>
                            {statusLabel}
                        </Typography>
                        <Typography variant="h4">{study.title}</Typography>
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
                                                {isOwner && study.std_status !== 'STD-DONE' && (
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleInviteMember(study.std_no)
                                                        }
                                                    >
                                                        Invite members
                                                    </MenuItem>
                                                )}
                                                {study.std_status !== 'STD-CREATED' && (
                                                    <MenuItem
                                                        component={Link}
                                                        to={`/study/detail/${study.std_no}`}
                                                    >
                                                        Veiw Results
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
