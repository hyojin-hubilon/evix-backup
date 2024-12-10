import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridClasses,
} from '@mui/x-data-grid';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import ecrfParticipantApi from '@/apis/eCrfParticipant';
import AddParticipant from './eCrfParticipants/AddParticipant';
import { ECrfParticipant, ECrfParticipantDelete } from '@/types/ecrfParticipant';
import dayjs from 'dayjs';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';

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
	const confirm = useConfirmation();
	
	const [selectedParticipant, setSelectedParticipant] = useState<ECrfParticipant | null>(null);
	const [ rows, setRows] = useState<ECrfRows[]>([]);
	const [ openAdd, setOpenAdd] = useState(false);
	

    const columns:GridColDef[] = [
        { field: 'full_name', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'birthday', headerName: 'Date of birth', width: 200 },
		{ field: 'created_at', headerName: 'Created at', width: 200 },
		{
			field: "action",
			headerName: "Action",
			sortable: false,
			// align:'center',
			width: 200,
			
			renderCell: (params:GridRenderCellParams) => {
				const onClickEdit = (e:MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking
					const currentRow : ECrfRows = params.row as ECrfRows;
					return handleSelectOne(currentRow);
				}

				const onClickDelete = (e:MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking
					const currentRow : ECrfRows = params.row as ECrfRows;
					return handleDeleteOne(currentRow.std_no, currentRow.std_crf_participant_no);
				}
		
				return (
					<Box>
						<Button onClick={(e) => onClickEdit(e)} variant="contained" color="primary" sx={{mr:'0.5rem'}}>Edit</Button>
						<Button onClick={(e) => onClickDelete(e)} variant="outlined" color="error">Delete</Button>
					</Box>
			);
			}
		},
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

	const deleteOneParticipant = async (std_no:number, std_crf_participant_no:number) => {
		try {
			const deleteOne : ECrfParticipantDelete = {
				std_crf_participant_no: std_crf_participant_no,
				std_no:std_no
			}
			const response =  await ecrfParticipantApi.deleteECrfParticipant(deleteOne);
			if(response.result) {
				fetchParticipantsList(stdNum);
			}
		} catch (error) {
			console.error('Failed to delete participants list: ', error);
		}
	}


	const handleDeleteOne = (std_no:number, std_crf_participant_no:number) => {
		if(std_no && std_crf_participant_no) {
			confirm({
				description: t('study.are_you_sure_to_delete_this_participant'),
				variant: 'info'
			}).then(() => deleteOneParticipant(std_no, std_crf_participant_no))
		}	
	}


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
