/**
 * Study 멤버 관리 팝업 - 이름 수정할 것
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
    ListItem,
    FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import InviteConfirmDialog from './InviteConfirmDialog';
import MemberListItem from './MemberListItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import studyApi from '@/apis/study';
import { MemberTempType } from '@/types/study';

const MemberManagement = ({ isOpen, handleClose, studyNo }) => {
    const [activeTab, setActiveTab] = useState('0');
    const [newAuthority, setNewAuthority] = useState<string>('');

    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [sendingEmails, setSendingEmails] = useState<string[]>([]);

    const [openInviteConfirm, setOpenInviteConfirm] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const [deleteMember, setDeleteMember] = useState<MemberTempType>();
    const [membersData, setMembersData] = useState<MemberTempType[]>([]);
    const [invitedMembersData, setInvitedMembersData] = useState<MemberTempType[]>([]);

    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [ownerName, setOwnerName] = useState<string>('');

    const [title, setTitle] = useState('');

    const [emailError, setEmailError] = useState<string>('');
    const [authorityError, setAuthorityError] = useState<string>('');

    const emailSchema = yup.string().email();

    const theme = useTheme();
    const { primary, grey } = theme.palette;

    const handleChangeTab = (e, newValue) => {
        setActiveTab(newValue);
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

    const handleSendInvite = async () => {
        if (emails.length === 0) {
            setEmailError('이메일을 확인해주세요.');
            return;
        }

        if (!newAuthority) {
            setAuthorityError('권한을 설정해주세요.');
            return;
        }

        try {
            const invites = emails.map((email) => ({
                std_no: studyNo,
                user_email: email,
                std_privilege: newAuthority,
            }));

            const response = await studyApi.inviteStudyMember(invites);

            if (response.code === 200) {
                setSendingEmails(emails);
                await fetchMembers();
                handleOpenSendInvite();
            }
        } catch (error) {
            console.error('Failed to send invites:', error);
        }
    };

    const fetchMembers = async () => {
        try {
            const responseMembers = await studyApi.getStudyManager(studyNo);
            const fetchedMembers = Array.isArray(responseMembers.content)
                ? responseMembers.content.map((member) => ({
                      user_no: member.user_no,
                      profile_image_url: member.profile_image_url || '',
                      first_name: member.first_name || '',
                      last_name: member.last_name || '',
                      std_privilege: member.std_privilege || '',
                      belong: member.company_name || '',
                      user_email: member.user_email || '',
                      inviteStatus: member.invited_at ? 'Approved' : 'Pending',
                  }))
                : [];
            setMembersData(fetchedMembers);

            const responseInvited = await studyApi.getInvitedStudyManager(studyNo);
            if (responseInvited.code === 200) {
                const newInvitedMembers = Array.isArray(responseInvited.content)
                    ? responseInvited.content
                          .filter((invite) => invite.accepted_at === null)
                          .map((invite) => ({
                              user_no: invite.user_no,
                              profile_image_url: '',
                              first_name: '',
                              last_name: '',
                              std_privilege: invite.std_privilege,
                              belong: '',
                              user_email: invite.user_email,
                              inviteStatus: invite.accepted_at ? 'Approved' : 'Pending',
                          }))
                    : [];
                setInvitedMembersData(newInvitedMembers);
            }
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    };

    const studyDetail = async () => {
        const response = await studyApi.getStudyDetail(studyNo);
        setTitle(response.content['title']);
        setProfileImageUrl(
            response.content['managerList'].find((manager) => manager.std_privilege === 'OWNER')
                .profile_image_url
        );
        setOwnerName(
            response.content['managerList'].find((manager) => manager.std_privilege === 'OWNER')
                .first_name +
                response.content['managerList'].find((manager) => manager.std_privilege === 'OWNER')
                    .last_name
        );
    };

    const handleSendReInvite = async (member: MemberTempType) => {
        try {
            const invite = {
                std_no: studyNo,
                user_email: member.user_email,
                std_privilege: member.std_privilege,
            };

            // 단일 초대 요청
            const response = await studyApi.inviteStudyMember([invite]); // TODO: 대기멤버 재초대 API 미개발

            console.log(response);

            if (response.code === 200) {
                setSendingEmails([member.user_email]);
                handleOpenSendInvite(); // 초대 확인 다이얼로그 열기
            }
        } catch (error) {
            console.error('Failed to re-invite:', error);
        }
    };

    const handleOpenSendInvite = () => {
        setOpenInviteConfirm(!openInviteConfirm);
    };

    const handleMemberDelete = (member: MemberTempType) => {
        setDeleteMember(member);
        handleOpenMemberDelete();
    };

    const handleDeleteSuccess = () => {
        fetchMembers();
    };

    const handleOpenMemberDelete = () => {
        setOpenDeleteConfirm(!openDeleteConfirm);
    };

    useEffect(() => {
        if (isOpen) {
            studyDetail();
            fetchMembers();
        }
    }, [isOpen, studyNo]);

    const memberCount = membersData.length;

    const filteredMembers = [...membersData, ...invitedMembersData].filter((member) => {
        if (member.std_privilege === 'OWNER') return false;
        if (member.inviteStatus === 'Pending') {
            return activeTab === '0' || activeTab === '3';
        }
        if (activeTab === '0') return true;
        if (activeTab === '1') return member.std_privilege === 'MAINTAINER';
        if (activeTab === '2') return member.std_privilege === 'DEVELOPER';
        return false;
    });

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
                    멤버관리 <span style={{ color: primary.main }}>({memberCount})</span>
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
                                <Avatar alt="Owner" src={profileImageUrl} />
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
                        <Box display="flex" mt={1}>
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
                                    <MenuItem value="MAINTAINER">Maintainer</MenuItem>
                                    <MenuItem value="DEVELOPER">Developer</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                sx={{ ml: 'auto' }}
                                onClick={handleSendInvite}
                            >
                                보내기
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
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member, index) => (
                                    <MemberListItem
                                        studyNo={studyNo}
                                        member={member}
                                        key={index}
                                        sendMailConfirm={handleSendReInvite}
                                        sendDeleteConfirm={handleMemberDelete}
                                    />
                                ))
                            ) : (
                                <ListItem>
                                    <Typography variant="body1">멤버가 없습니다.</Typography>
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </DialogContent>
            </Dialog>

            <InviteConfirmDialog
                open={openInviteConfirm}
                handleClose={handleOpenSendInvite}
                emails={sendingEmails}
            />

            {deleteMember && (
                <DeleteConfirmDialog
                    open={openDeleteConfirm}
                    handleClose={handleOpenMemberDelete}
                    member={deleteMember}
                    studyNo={studyNo}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}
        </>
    );
};

export default MemberManagement;
