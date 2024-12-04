import { PlusOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { t } from 'i18next';
import { ParticipantsList, StudyType } from '@/types/study';

type RecentParticipantTypes = {
	participantList: ParticipantsList[],
	onMoreClick:() => void;
	studyType: StudyType
}

const RecentParticipant = ({ participantList, onMoreClick, studyType }: RecentParticipantTypes) => {
    const theme = useTheme();
    const { divider } = theme.palette;

    const rows = participantList.map((participant, index) => ({
        id: participant.participant_no,
        name: participant.full_name,
        gender: participant.gender,
        dateOfBirth: participant.birthday,
        age: participant.age,
        roundInfo: studyType === 'E-CRF' ? participant.number_answer : participant.number_answer + '/' + participant.total_number_survey,
        institution: participant.allotment_agency_name,
        status: participant.participation_status === 'PROGRESS' ? 'In Progress' : 'Complete',
    }));

    return (
        <Box>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6" color="textSecondary">
                        {t('study.recent_participant_logs')}
                    </Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <Button onClick={onMoreClick}>
                        <PlusOutlined style={{ fontSize: '0.7rem', marginRight: '1rem' }} />
                        more
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow
                            sx={{
                                'td, th': { borderBottom: `1px solid ${theme.palette.grey[400]}` },
                            }}
                        >
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Date of Birth</TableCell>
                            <TableCell align="right">Round Info.</TableCell>
                            {/* <TableCell align="right">Institution</TableCell> */}
                            <TableCell align="right">Status</TableCell>
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
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.dateOfBirth}</TableCell>
                                <TableCell align="right">{row.roundInfo}</TableCell>
                                {/* <TableCell align="right">{row.institution}</TableCell> */}
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RecentParticipant;
