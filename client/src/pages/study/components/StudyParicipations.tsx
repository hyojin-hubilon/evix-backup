import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Grid, useTheme } from '@mui/material';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

const StudyParticipants = ({ participantList }) => {
    const theme = useTheme();
    const rows = participantList.map((participant, index) => ({
        id: participant.participant_no,
        name: participant.full_name,
        gender: participant.gender,
        dateOfBirth: participant.birthday,
        age: participant.age,
        roundInfo: participant.number_answer + '/' + participant.total_number_survey,
        institution: participant.allotment_agency_name,
        status: participant.participation_status === 'PROGRESS' ? 'In Progress' : 'Complete',
    }));

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'dateOfBirth', headerName: 'Date of birth', width: 200 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'roundInfo', headerName: 'Round Info.', width: 150 },
        { field: 'institution', headerName: 'Institution', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    return (
        <Grid xs={12}>
            <Box sx={{ minHeight: 400, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: CustomToolbar }}
                    sx={{
                        border: '1px solid #ddd',
                        [`& .${gridClasses.virtualScrollerContent}`]: {
                            borderTop: `1px solid ${theme.palette.grey[500]}`,
                        },
                        [`& .${gridClasses.row}`]: {
                            borderBottom: `1px solid ${theme.palette.grey[400]}`,
                        },
                        bgcolor: 'white',
                        p: '1rem',
                    }}
                />
            </Box>
        </Grid>
    );
};

export default StudyParticipants;
