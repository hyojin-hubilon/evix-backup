import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Grid, useTheme } from '@mui/material';
import { EProParticipantRows, ParticipantsList } from '@/types/study';
import { useEffect, useState } from 'react';
import SurveyAnswerView from './participants/SurveyAnswerView';
import studyApi from '@/apis/study';

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

export type EProParticipantsType = {
	stdNo: string | undefined
}
const EProParticipants = ({ stdNo } : EProParticipantsType) => {
    const theme = useTheme();
    

	const [ selectedParticipant, setSelectedParticipant ] = useState<SelectedParticipantType>({stdNo: null, participantNo: null });
	const [ showSurveyList, setShowSurveyList] = useState<boolean>(false);
	// const [participantList, setParticipantList] = useState<ParticipantsList[]>([]);
	const [ rows, setRows] = useState<EProParticipantRows[]>([]);
	

    const columns = [
        { field: 'full_name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'birthday', headerName: 'Date of birth', width: 200 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'round_info', headerName: 'Round Info.', width: 150 },
        { field: 'allotment_agency_name', headerName: 'Institution', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];


	
	const handleSelectOne = (e) => {
		console.log(e);
		if(e.row.std_no && e.row.participant_no) {
			setSelectedParticipant({stdNo: e.row.std_no, participantNo: e.row.participant_no })
			setShowSurveyList(true);
		}	
	}

	const handleCloseSurveyDialog = () => {
		setShowSurveyList(false);
		setSelectedParticipant({stdNo: null, participantNo: null })
	}

	const fetchParticipantsList = async (stdNo: number) => {
        try {
            const response = await studyApi.participantList(stdNo);

            
			
			const rows = response.content.map((participant, index) => ({
				id: participant.participant_no,
				full_name: participant.full_name,
				gender: participant.gender,
				birthday: participant.birthday,
				age: participant.age,
				round_info: participant.number_answer + '/' + participant.total_number_survey,
				allotment_agency_name: participant.allotment_agency_name,
				status: participant.participation_status === 'PROGRESS' ? 'In Progress' : 'Complete',
				std_no: participant.std_no,
				participant_no: participant.participant_no
			}));

			setRows(rows);

           
        } catch (error) {
            console.error('Failed to fetch participants list: ', error);
        }
    };


	useEffect(() => {
		if(stdNo) {
			const std_no = Number(stdNo);
			fetchParticipantsList(std_no);
		}
	}, [])

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

export default EProParticipants;
