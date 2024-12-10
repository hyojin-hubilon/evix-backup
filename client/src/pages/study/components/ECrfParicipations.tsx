import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ecrfParticipantApi from '@/apis/eCrfParticipant';
import AddParticipant from './eCrfParticipants/AddParticipant';
import { ECrfParticipant } from '@/types/ecrfParticipant';
import dayjs from 'dayjs';
import { ParticipantsList } from '@/types/study';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

export interface ECrfRows extends ECrfParticipant {
	id: number;
}

export type EProParticipantsType = {
	stdNo: string | undefined
}
const ECrfParticipants = ({ stdNo } : EProParticipantsType) => {
    const theme = useTheme();
	const [stdNum, setStdNum] = useState(Number(stdNo));

	
	const [selectedParticipant, setSelectedParticipant] = useState<ECrfParticipant | null>(null);
	const [ rows, setRows] = useState<ECrfRows[]>([]);
	const [ openAdd, setOpenAdd] = useState(false);
	

    const columns = [
        { field: 'full_name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'birthday', headerName: 'Date of birth', width: 200 },
		{ field: 'created_at', headerName: 'Created at', width: 200 },
    ];


	
	const handleSelectOne = (participant:ECrfRows) => {
		if(participant.std_no && participant.std_crf_participant_no) {
			setSelectedParticipant(participant);
			setOpenAdd(true);
		}	
	}

	const fetchParticipantsList = async (stdNo: number) => {
        try {
            const response = await ecrfParticipantApi.getECrfParticipantList(stdNo);
			console.log(response.content)
			

			const rows = response.content.map((participant, index) => ({
				id: participant.std_crf_participant_no,
				full_name : participant.full_name,
				birthday: dayjs(participant.birthday).format('YYYY/MM/DD'),
				created_at: dayjs(participant.created_at).format('YYYY/MM/DD'),
				gender: participant.gender,
				std_crf_participant_no: participant.std_crf_participant_no,
				std_no: participant.std_no
			}));

			setRows(rows);
           
        } catch (error) {
            console.error('Failed to fetch participants list: ', error);
        }
    };


	useEffect(() => {
		if(stdNum) {
			fetchParticipantsList(stdNum);
		}
	}, [])

	const handleCloseAddPartipant = () => {
		setOpenAdd(false);
		fetchParticipantsList(stdNum);
		setSelectedParticipant(null)
	}

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '100%' }} mb="1rem">
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
					onRowClick={(e) => handleSelectOne(e.row as ECrfRows)}
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
			<Box display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={() => setOpenAdd(true)}>Add Participant</Button>
			</Box>
			<AddParticipant
				isOpen={openAdd}
				handleClose={handleCloseAddPartipant} 
				stdNo={stdNum}
				participant={selectedParticipant}
			/>
        </Grid>
    );
};

export default ECrfParticipants;
