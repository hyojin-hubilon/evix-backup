/**
 * Study 생성 시, 초대 팝업
 */

import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Typography,
    useTheme,
    FormControl,
    Autocomplete,
    TextField,
    Chip,
    List,
    FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import MemberListItem from './MemberListItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import userApi from '@/apis/user';
import { InviteMemberTempType, MemberTempType } from '@/types/study';

const MemberInvitement = ({ isOpen, handleClose, title, mode, members, setMembers }) => {
    const [activeTab, setActiveTab] = useState('0');
    const [newAuthority, setNewAuthority] = useState<string>('');

    const [emails, setEmails] = useState<string[]>([]); // 초대받을 사람 input의 emails
    const [emailInput, setEmailInput] = useState(''); // 메일주소 입력 input의 value
    const [sendingEmails, setSendingEmails] = useState<string[]>([]); // 실제로 초대 보내고 confirm창에서 확인하는 용도

    const [openInviteConfirm, setOpenInviteConfirm] = useState(false); // 초대메일 발송 완료 Dialog
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const [deleteMember, setDeleteMember] = useState<MemberTempType>();
    const [emailError, setEmailError] = useState<string>('');
    const [authorityError, setAuthorityError] = useState<string>('');

    const emailSchema = yup.string().email();

    const theme = useTheme();
    const { primary, grey } = theme.palette;

    const [ownerProfileImage, setOwnerProfileImage] = useState('');
    const [ownerName, setOwnerName] = useState('');

    // const [members, setMembers] = useState<MemberTempType[]>([]);

    const handleChangeTab = (e, newValue) => {
        setActiveTab(newValue);
    };

    // 멤버관리 모달에서 owner 정보를 가져오기 위함
    const getMyProfile = async () => {
        try {
            const response = await userApi.getMyProfile();
            setOwnerProfileImage(response.content['profile_image_url']);
            setOwnerName(response.content['first_name'] + ' ' + response.content['last_name']);
        } catch (error) {
            console.error('Failed to fetch owner profile:', error);
        }
    };

    useEffect(() => {
        getMyProfile(); // 페이지 진입 시 owner 정보 가져오기
    }, []);

    const createData = (
        std_privilege: string, // 권한
        user_email: string // 이메일
    ): InviteMemberTempType => {
        return {
            std_privilege,
            user_email,
        };
    };

    const handleSelectMails = (e, value) => {
        const errorEmail = value.find((email) => !emailSchema.isValidSync(email));
        if (errorEmail) {
            setEmailInput(errorEmail);
            setEmailError('이메일을 확인해주세요.');
        } else {
            setEmailError('');
        }
        setEmails(value.filter((email) => emailSchema.isValidSync(email)));
    };

    const onInputChange = (e, newValue) => {
        setEmailInput(newValue);
    };

    const handleAddMember = () => {
        if (emails.length === 0) {
            setEmailError('이메일을 확인해주세요.');
            return;
        }
        if (!newAuthority) {
            setAuthorityError('권한을 설정해주세요.');
            return;
        }

        const newMembers = emails.map((email) => createData(newAuthority.toUpperCase(), email));

        setMembers((prevMembers) => [...prevMembers, ...newMembers]); // 새로운 멤버를 기존 멤버 리스트에 추가
        setEmails([]); // 이메일 목록 초기화
        setEmailInput(''); // 이메일 입력 초기화
        setNewAuthority(''); // 권한 초기화
    };

    const handleSendReInvite = (member: MemberTempType) => {
        setSendingEmails([member.user_email]);
        handleOpenSendInvite();
    };

    const handleOpenSendInvite = () => {
        setOpenInviteConfirm(!openInviteConfirm);
    };

    const handleMemberDelete = (member: MemberTempType) => {
        setDeleteMember(member);
        handleOpenMemberDelete();
    };

    const handleDeleteSuccess = () => {};

    const handleOpenMemberDelete = () => {
        setOpenDeleteConfirm(!openDeleteConfirm);
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="member-management-title"
                aria-describedby="member-management-description"
                maxWidth="sm"
            >
                <DialogTitle id="member-management-title" variant="h4" width={600}>
                    초대하기 <span style={{ color: primary.main }}>({members.length})</span>
                    <IconButton
                        size="small"
                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container mb={1}>
                        <Grid item container xs={8} alignItems="center">
                            <Typography id="member-management-description" variant="h5">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" gap={1} justifyContent="flex-end">
                                <Avatar alt="Owner" src={ownerProfileImage} />
                                <Box>
                                    <Typography variant="caption" sx={{ mb: '0' }}>
                                        Owner
                                    </Typography>
                                    <Typography color="primary">{ownerName}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{ borderRadius: '0.5rem', backgroundColor: grey[100] }}
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        p="1rem"
                    >
                        <Typography variant="h6" fontWeight="600">
                            초대받을 사람
                        </Typography>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            value={emails}
                            inputValue={emailInput}
                            onChange={handleSelectMails}
                            onInputChange={onInputChange}
                            sx={{ backgroundColor: 'white', width: 1 }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} placeholder="메일 주소 입력" />
                            )}
                        />
                        {emailError && <FormHelperText error>{emailError}</FormHelperText>}
                        <Box display="flex">
                            <FormControl size="small" sx={{ width: '8rem' }}>
                                <Select
                                    value={newAuthority}
                                    onChange={(e) => {
                                        setNewAuthority(e.target.value);
                                        setAuthorityError('');
                                    }}
                                    sx={{ width: 1, backgroundColor: 'white' }}
                                    displayEmpty
                                >
                                    <MenuItem value="">권한</MenuItem>
                                    <MenuItem value="maintainer">Maintainer</MenuItem>
                                    <MenuItem value="developer">Developer</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                sx={{ ml: 'auto' }}
                                onClick={handleAddMember}
                            >
                                추가하기
                            </Button>
                        </Box>
                        {authorityError && <FormHelperText error>{authorityError}</FormHelperText>}
                    </Box>
                    <Box mt={1}>
                        <Tabs
                            value={activeTab}
                            onChange={handleChangeTab}
                            aria-label="Study Status Tab"
                        >
                            <Tab label="전체" value="0" />
                            <Tab label="Maintainer" value="1" />
                            <Tab label="Developer" value="2" />
                            <Tab label="대기" value="3" />
                        </Tabs>

                        <List>
                            {members.map((member, index) => (
                                <MemberListItem
                                    studyNo={0}
                                    member={member}
                                    key={index}
                                    sendMailConfirm={handleSendReInvite}
                                    sendDeleteConfirm={handleMemberDelete}
                                />
                            ))}
                        </List>
                    </Box>
                </DialogContent>
            </Dialog>

            {deleteMember && (
                <DeleteConfirmDialog
                    open={openDeleteConfirm}
                    handleClose={handleOpenMemberDelete}
                    member={deleteMember}
                    studyNo={0}
                    onDeleteSuccess={handleDeleteSuccess} // 핸들러 추가
                />
            )}
        </>
    );
};

export default MemberInvitement;
