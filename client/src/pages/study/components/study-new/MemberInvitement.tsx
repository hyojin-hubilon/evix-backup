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
    ListItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import MemberListItem from './MemberListItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { InviteMemberTempType, MemberTempType } from '@/types/study';
import { useUserProfile } from '@/context/UserProfileContext';
import { t } from 'i18next';

const MemberInvitement = ({ isOpen, handleClose, title, mode, members, setMembers }) => {
    const { userProfile, setUserProfile } = useUserProfile();
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

    // const [ownerProfileImage, setOwnerProfileImage] = useState('');
    // const [ownerName, setOwnerName] = useState('');

    // const [members, setMembers] = useState<MemberTempType[]>([]);

    const handleChangeTab = (e, newValue) => {
        setActiveTab(newValue);
    };

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
            setEmailError(t('study.check_your_email')); //이메일을 확인해주세요.
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
            setEmailError(t('study.check_your_email')); //이메일을 확인해주세요.
            return;
        }
        if (!newAuthority) {
            setAuthorityError(t('study.set_the_permissions')); //권한을 설정해주세요.
            return;
        }

        const newMembers = emails.map((email) => createData(newAuthority.toUpperCase(), email));

        setMembers((prevMembers) => [...prevMembers, ...newMembers]); // 새로운 멤버를 기존 멤버 리스트에 추가
        setEmails([]); // 이메일 목록 초기화
        setEmailInput(''); // 이메일 입력 초기화
        setNewAuthority(''); // 권한 초기화
    };

    const filteredMembers = [...members].filter((member) => {
        console.log('filtered members::', member);

        if (member.std_privilege === 'OWNER') return false;
        // if (member.inviteStatus === 'Pending') {
        //     return activeTab === '0' || activeTab === '3';
        // }
        if (activeTab === '0') return true;
        if (activeTab === '1') return member.std_privilege === 'MAINTAINER';
        if (activeTab === '2') return member.std_privilege === 'DEVELOPER';
        return false;
    });

    filteredMembers;

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
                    {t('study.inviting')}{' '}
                    <span style={{ color: primary.main }}>({members.length})</span>
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
                                <Avatar alt="Owner" src={userProfile?.profile_image_url} />
                                <Box>
                                    <Typography variant="caption" sx={{ mb: '0' }}>
                                        Owner
                                    </Typography>
                                    <Typography color="primary">
                                        {userProfile?.first_name} {userProfile?.last_name}
                                    </Typography>
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
                            {t('study.people_invited')}
                            {/* 초대받을 사람 */}
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
                                <TextField {...params} placeholder={t('study.enter_emails')} />
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
                                    <MenuItem value="">
                                        {t('study.permission')}
                                        {/* 권한 */}
                                    </MenuItem>
                                    <MenuItem value="maintainer">Maintainer</MenuItem>
                                    <MenuItem value="developer">Developer</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                sx={{ ml: 'auto' }}
                                onClick={handleAddMember}
                            >
                                {t('study.add')}
                                {/* 추가하기 */}
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
                            <Tab label={t('study.all')} value="0" />
                            <Tab label="Maintainer" value="1" />
                            <Tab label="Developer" value="2" />
                            {/* <Tab label={t('study.waiting')} value="3" /> */}
                        </Tabs>

                        {/* <List>
                            {members.map((member, index) => (
                                <MemberListItem
                                    studyNo={0}
                                    member={member}
                                    key={index}
                                    sendMailConfirm={handleSendReInvite}
                                    sendDeleteConfirm={handleMemberDelete}
                                />
                            ))}
                        </List> */}
                        <List>
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member, index) => (
                                    <MemberListItem
                                        studyNo={0}
                                        member={member}
                                        key={index}
                                        sendMailConfirm={handleSendReInvite}
                                        sendDeleteConfirm={handleMemberDelete}
                                    />
                                ))
                            ) : (
                                <ListItem>
                                    <Typography variant="body1">
                                        {t('study.no_members')}
                                        {/* 멤버가 없습니다. */}
                                    </Typography>
                                </ListItem>
                            )}
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
