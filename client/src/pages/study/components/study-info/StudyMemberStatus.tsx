import {
    Avatar,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';

export interface ManagerType {
    std_no: number;
    user_no: number;
    std_privilege: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image_url: string | null;
    profile_image_name: string | null;
    company_name: string;
    invited_at: string;
}

interface InviteType {
    std_no: number;
    user_email: string;
    std_privilege: string;
    created_at: string;
    accepted_at: string | null;
}

interface StudyMemberStatusProps {
    managerList: ManagerType[];
    inviteList: InviteType[];
}

const StudyMemberStatus = ({ managerList, inviteList }: StudyMemberStatusProps) => {
    console.log('inviteList: ', inviteList);
    console.log('managerList: ', managerList);

    const theme = useTheme();
    const { divider } = theme.palette;

    const createData = (
        profilePic: string, //프로필이미지
        name: string, //이름
        authority: string, //권한
        belong: string, //소속
        email: string, //이메일
        inviteDate: string, //초대발송일자
        inviteStatus: string //승인상태
    ) => {
        return { profilePic, name, authority, belong, email, inviteDate, inviteStatus };
    };

    // 매니저 리스트(초대 승인한 멤버)
    const rows = managerList.map((manager) =>
        createData(
            manager.profile_image_url || '',
            `${manager.first_name} ${manager.last_name}`,
            manager.std_privilege,
            manager.company_name || '-',
            manager.email,
            manager.invited_at || '-',
            'Approved'
        )
    );

    // 초대 리스트(초대 승인 + 초대 승인X)
    inviteList
        .filter((invite) => invite.accepted_at === null)
        .map((invite) => {
            rows.push(
                createData(
                    '',
                    '-',
                    invite.std_privilege,
                    '-',
                    invite.user_email,
                    invite.created_at,
                    'Waiting for approval'
                )
            );
        });

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow
                            sx={{
                                'td, th': { borderBottom: `1px solid ${theme.palette.grey[400]}` },
                            }}
                        >
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">권한</TableCell>
                            <TableCell align="center">소속</TableCell>
                            <TableCell align="center">email</TableCell>
                            <TableCell align="center">초대발송일자</TableCell>
                            <TableCell align="center">승인상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    'td, th': { borderBottom: `1px solid ${divider}` },
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar alt={row.name} src={row.profilePic} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.authority}</TableCell>
                                <TableCell align="center">{row.belong}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.inviteDate}</TableCell>
                                <TableCell align="center">{row.inviteStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudyMemberStatus;
