import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Grid, useTheme } from '@mui/material';
import { ParticipantsList } from '@/types/study';
import { useState } from 'react';
import SurveyAnswerView from './participants/SurveyAnswerView';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

export type SelectedParticipantType = {
	stdNo:number | null,
	participantNo: number | null
}

const StudyParticipants = ({ participantList } : {participantList: ParticipantsList[]}) => {
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
		stdNo: participant.std_no,
		participantNo: participant.participant_no
    }));

	const [ selectedParticipant, setSelectedParticipant ] = useState<SelectedParticipantType>({stdNo: null, participantNo: null });
	const [ showSurveyList, setShowSurveyList] = useState<boolean>(false);

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'dateOfBirth', headerName: 'Date of birth', width: 200 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'roundInfo', headerName: 'Round Info.', width: 150 },
        { field: 'institution', headerName: 'Institution', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];


	
	const handleSelectOne = (e) => {
		console.log(e);
		if(e.row.stdNo && e.row.participantNo) {
			setSelectedParticipant({stdNo: e.row.stdNo, participantNo: e.row.participantNo })
			setShowSurveyList(true);
		}	
	}

	const handleCloseSurveyDialog = () => {
		setShowSurveyList(false);
		setSelectedParticipant({stdNo: null, participantNo: null })
	}

    return (
        <Grid item xs={12}>
            <Box sx={{ minHeight: 400, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
					onRowClick={handleSelectOne}
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
			<SurveyAnswerView
				isOpen={showSurveyList}
				handleClose={handleCloseSurveyDialog}
				participant={selectedParticipant}
			/>
        </Grid>
    );
};

export default StudyParticipants;
