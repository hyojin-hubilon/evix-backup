import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    Box,
    ListItemText,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import { useState } from 'react';
import { MemberTempType } from '@/types/study';
import studyApi from '@/apis/study';
import { t } from 'i18next';

type MemberListItemProps = {
    studyNo: number;
    member: MemberTempType;
    sendMailConfirm: (member: MemberTempType) => void;
    sendDeleteConfirm: (member: MemberTempType) => void;
};

const MemberListItem = ({
    studyNo,
    member,
    sendMailConfirm,
    sendDeleteConfirm,
}: MemberListItemProps) => {
    const [memberAuth, setMemberAuth] = useState(member.std_privilege.toLowerCase());

    console.log('member: ', member);

    const handleChangePrivilege = async (e) => {
        const newPrivilege = e.target.value;
        setMemberAuth(newPrivilege);

        try {
            await studyApi.updateMemberPrivilege({
                std_no: studyNo,
                user_no: member.user_no,
                std_privilege: newPrivilege.toUpperCase(),
            });
        } catch (error) {
            console.error('Failed to update member privilege:', error);
        }
    };

    return (
        <ListItem divider>
            <ListItemAvatar>
                {member.first_name || member.last_name ? (
                    <Avatar
                        alt={`${member.first_name} ${member.last_name}`}
                        src={member.profile_image_url}
                    />
                ) : (
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                )}
            </ListItemAvatar>
            <Box width="300px">
                {member.first_name || member.last_name ? (
                    <ListItemText
                        primary={
                            <Typography
                                variant="h6"
                                color="primary"
                                fontWeight={500}
                            >{`${member.first_name} ${member.last_name}`}</Typography>
                        }
                        secondary={member.belong}
                    />
                ) : (
                    <ListItemText>{member.user_email}</ListItemText>
                )}
            </Box>

            <Box display="flex" width="300px" gap={0.5} justifyContent="flex-end">
                <FormControl
                    size="small"
                    sx={{ minWidth: member.inviteStatus !== 'Approved' ? '100px' : '148px' }}
                >
                    <Select
                        value={memberAuth}
                        // onChange={(e) => setMemberAuth(e.target.value)}
                        onChange={handleChangePrivilege}
                        sx={{ width:1, backgroundColor: 'white' }}
                        displayEmpty
                        disabled={member.inviteStatus !== 'Approved' ? true : false}
                    >
                        <MenuItem value="">{t('study.permission')}</MenuItem>
                        <MenuItem value="maintainer">Maintainer</MenuItem>
                        <MenuItem value="developer">Developer</MenuItem>
                    </Select>
                </FormControl>

                {!member.first_name && !member.last_name && (
                    <Button
                        size="small"
                        color="primary"
                        sx={{ minWidth: '40px' }}
                        variant="outlined"
                        onClick={() => sendMailConfirm(member)}
                    >
                        <MailOutlineIcon />
                    </Button>
                )}

                {member.inviteStatus === 'Approved' && (
                    <Button
                        size="small"
                        color="error"
                        sx={{ minWidth: '40px' }}
                        variant="outlined"
                        onClick={() => sendDeleteConfirm(member)}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                )}
            </Box>
        </ListItem>
    );
};

export default MemberListItem;
