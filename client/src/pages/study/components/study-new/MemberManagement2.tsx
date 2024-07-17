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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import InviteConfirmDialog from './InviteConfirmDialog';
import MemberListItem from './MemberListItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import studyApi from '@/apis/study';

export type MemberTempType = {
    profile_image_url: string;
    first_name: string;
    last_name: string;
    std_privilege: string;
    belong: string;
    email: string;
    inviteStatus: string;
};

const MemberManagement2 = ({ isOpen, handleClose, study }) => {
    const [activeTab, setActiveTab] = useState('0');
    const [newAuthority, setNewAuthority] = useState<string>('');

    const [emails, setEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [sendingEmails, setSendingEmails] = useState<string[]>([]);

    const [openInviteConfirm, setOpenInviteConfirm] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const [deleteMember, setDeleteMember] = useState<MemberTempType>();
    const [membersData, setMembersData] = useState<MemberTempType[]>([]);

    const emailSchema = yup.string().email();

    const theme = useTheme();
    const { primary, grey } = theme.palette;

    const handleChangeTab = (e, newValue) => {
        setActiveTab(newValue);
    };

    const ownerManager = study.managerList.find((manager) => manager.std_privilege === 'OWNER');
    const title = study.title;
    const stdNo = study.std_no;

    const handleSelectMails = (e, value) => {
        const errorEmail = value.find((email) => !emailSchema.isValidSync(email));
        if (errorEmail) {
            setEmailInput(errorEmail);
        }
        setEmails(value.filter((email) => emailSchema.isValidSync(email)));
    };

    const onInputChange = (e, newValue) => {
        setEmailInput(newValue);
    };

    const handleSendInvite = () => {
        setSendingEmails(emails);
        handleOpenSendInvite();
    };

    const handleSendReInvite = (member: MemberTempType) => {
        setSendingEmails([member.email]);
        handleOpenSendInvite();
    };

    const handleOpenSendInvite = () => {
        setOpenInviteConfirm(!openInviteConfirm);
    };

    const handleMemberDelete = (member: MemberTempType) => {
        setDeleteMember(member);
        handleOpenMemberDelete();
    };

    const handleOpenMemberDelete = () => {
        setOpenDeleteConfirm(!openDeleteConfirm);
    };

    console.log('members Data : ', membersData);

    useEffect(() => {
        if (isOpen) {
            const fetchStudyManager = async () => {
                const response = await studyApi.getStudyManager(study.std_no);
                const fetchedMembers = Array.isArray(response.content)
                    ? response.content.map((member) => ({
                          profile_image_url: member.profile_image_url || '',
                          first_name: member.first_name || '',
                          last_name: member.last_name || '',
                          std_privilege: member.std_privilege || '',
                          belong: member.company_name || '',
                          email: member.email || '',
                          inviteStatus: member.invited_at ? 'Approved' : 'Pending',
                      }))
                    : [];
                setMembersData(fetchedMembers);
            };

            fetchStudyManager();
        }
    }, [isOpen, study.std_no]);

    const memberCount = membersData.length;

    // OWNER는 리스트에서 제외
    const filteredMembers = membersData.filter((member) => {
        if (member.std_privilege === 'OWNER') return false;
        if (activeTab === '0') return true;
        if (activeTab === '1') return member.std_privilege === 'MAINTAINER';
        if (activeTab === '2') return member.std_privilege === 'DEVELOPER';
        if (activeTab === '3') return member.inviteStatus === 'Pending';
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
                                <Avatar alt="Owner" src={ownerManager.profile_image_url} />
                                <Box>
                                    <Typography variant="caption" sx={{ mb: '0' }}>
                                        Owner
                                    </Typography>
                                    <Typography color="primary">
                                        {ownerManager.first_name} {ownerManager.last_name}
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
                        <Box display="flex">
                            <FormControl size="small" sx={{ width: '8rem' }}>
                                <Select
                                    value={newAuthority}
                                    onChange={(e) => setNewAuthority(e.target.value)}
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
                                onClick={handleSendInvite}
                            >
                                보내기
                            </Button>
                        </Box>
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
                            {filteredMembers.map((member, index) => {
                                return (
                                    <MemberListItem
                                        member={member}
                                        key={index}
                                        sendMailConfirm={handleSendReInvite}
                                        sendDeleteConfirm={handleMemberDelete}
                                    />
                                );
                            })}
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
                />
            )}
        </>
    );
};

export default MemberManagement2;
