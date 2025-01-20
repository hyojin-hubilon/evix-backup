import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    gridClasses
} from '@mui/x-data-grid';
import { Box, Button, Chip, Grid, InputAdornment, MenuItem, OutlinedInput, Select, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MouseEvent, useEffect, useState } from 'react';
import ecrfParticipantApi from '@/apis/eCrfParticipant';
import AddParticipant from './eCrfParticipants/AddParticipant';
import { ECrfParticipant, ECrfParticipantDelete } from '@/types/ecrfParticipant';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';

import DatePicker from "antd/lib/date-picker";
const { RangePicker } = DatePicker;
import { PlusOutlined } from '@ant-design/icons';
import Participant from './eCrfParticipants/Participant';
import { StudyDetail } from '@/types/study';

export interface ECrfRows extends ECrfParticipant {
	id: number;
}

export type EProParticipantsType = {
	stdNo: string | undefined,
	studyDetail: StudyDetail
}
const ECrfParticipants = ({ stdNo, studyDetail } : EProParticipantsType) => {
    const theme = useTheme();
	const [ stdNum, setStdNum ] = useState(Number(stdNo));
	const confirm = useConfirmation();
	
	const [ participantEdit, setParticipantEdit ] = useState<ECrfParticipant | null>(null);
	const [ rows, setRows ] = useState<ECrfRows[]>([]);
	const [ searchedRows, setSearchedRows ] = useState<ECrfRows[]>([]);
	const [ openAdd, setOpenAdd ] = useState(false);

	const [ selectedParticipant, setSelectedParticipant ] = useState<ECrfParticipant | null>(null);

    const columns:GridColDef[] = [
        { field: 'full_name', headerName: 'Name', minWidth: 150,
			renderCell: (param: GridRenderCellParams) => {
				return (
					<Box display="flex" alignItems="center" height="inherit" sx={{
						'&:hover': {
							textDecoration: 'underline',
							cursor: 'pointer'
						}
					}}>
						<Typography variant='h6'>{ param.formattedValue }</Typography>
					</Box>
				)
			}
		},
        { field: 'gender', headerName: 'Gender', minWidth: 100 },
        { field: 'birthday', headerName: 'Date of birth', width: 200 },
		{ field: 'age', headerName: 'Age', width: 100,
			renderCell: (param: GridRenderCellParams) => {
				return <b>{ param.formattedValue }</b>;
			}
		},
		{ field: 'number_crf_input', headerName: 'Round info', width: 150,
			renderCell: (param: GridRenderCellParams) => {
				return <Chip label={param.formattedValue ? param.formattedValue : 0} color="info" />;
			}
		},
		{ field: 'allotment_agency_name', headerName: 'Institution', width: 200,
			renderCell: (param: GridRenderCellParams) => {
				return <b>{ param.formattedValue ? param.formattedValue : '-' }</b>;
			}
		},
		
		{ field: 'created_at', headerName: 'Date of Participation', width: 200 },
		{
			field: "actions",
			headerName: "Actions",
			sortable: false,
			width: 200,
			renderCell: (params:GridRenderCellParams) => {
				const onClickEdit = (e:MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking
					const currentRow : ECrfRows = params.row as ECrfRows;
					return handleSelectEdit(currentRow);
				}

				const onClickDelete = (e:MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking
					const currentRow : ECrfRows = params.row as ECrfRows;
					return handleDeleteOne(currentRow.std_no, currentRow.std_crf_participant_no);
				}
		
				return (
					<Box>
						<Button onClick={(e) => onClickDelete(e)} variant="outlined" color="error" sx={{mr:'0.5rem'}}>Delete</Button>
						<Button onClick={(e) => onClickEdit(e)} variant="contained" color="primary">Edit</Button>
					</Box>
			);
			}
		}
    ];


	
	const [ activeDateSetting, setActiveDateSetting ] = useState('full');
	const [ dateSet, setDateSet ] = useState<{startDt: string, endDt: string}>({startDt : '', endDt: ''});
	const [ searchTerm, setSearchTerm] = useState('');

	
	const handleSearchStudy = (text:string) => {
		setSearchTerm(text);	
	}

	const handleChangeDateSetting = (newValue:string) => {
        setActiveDateSetting(newValue);
		if(newValue == 'full') {
			setDateSet({
				startDt: '',
				endDt: ''
			});
		}
	}

	const onChangeDate = (date, dateString: string[]) => {
		if(date == null) {
			setActiveDateSetting('full')
		}
		setDateSet({
			startDt: dateString[0],
			endDt: dateString[1]
		});
	};
	
	const handleSelectEdit = (participant:ECrfRows) => {
		if(participant.std_no && participant.std_crf_participant_no) {
			setParticipantEdit(participant);
			setOpenAdd(true);
		}	
	}

	const handleSelectOne = (participant:ECrfRows) => {
		setSelectedParticipant(participant);
	}

	const fetchParticipantsList = async (stdNo: number) => {
        try {
            const response = await ecrfParticipantApi.getECrfParticipantList(stdNo);
			const rows = response.content.map((participant, index) => {
				return {
					id: participant.std_crf_participant_no,
					full_name : participant.full_name,
					birthday: dayjs(participant.birthday).format('YYYY/MM/DD'),
					created_at: dayjs(participant.created_at).format('YYYY/MM/DD'),
					gender: participant.gender,
					std_crf_participant_no: participant.std_crf_participant_no,
					std_no: participant.std_no,
					age: participant.age,
					number_crf_input: participant.number_crf_input,//아직없음
					allotment_agency_name : participant.allotment_agency_name
				}
			})
		
			setRows(rows);
			setSearchedRows(rows);
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
				variant: 'danger'
			}).then(() => deleteOneParticipant(std_no, std_crf_participant_no))
		}	
	}


	useEffect(() => {
		if(stdNum) {
			fetchParticipantsList(stdNum);
		}
	}, [])

	useEffect(() => {
		let newSearchedList = rows.filter(row => {
				if(dateSet.startDt && dateSet.endDt) {
					if(dayjs(dateSet.startDt).isSameOrBefore(dayjs(row.created_at),'day') && dayjs(row.created_at).isSameOrBefore(dayjs(dateSet.endDt), 'day')) return true;
					else return false;
				} else {
					return true;
				}
			});
	
		if(searchTerm) {
			newSearchedList = newSearchedList.filter(row => {
				if(row.full_name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else if(row.gender.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else if(row.allotment_agency_name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else if(row.age === Number(searchTerm)) return true;
				//else if(STUDY_STATUS[row.std_status as STUDY_STATUS_KEY].toLowerCase().includes(searchTerm.toLowerCase())) return true; status?
				else return false;
			});
		}

		setSearchedRows(newSearchedList);
	}, [dateSet, searchTerm])

	const handleCloseAddPartipant = () => {
		setOpenAdd(false);
		fetchParticipantsList(stdNum);
		setParticipantEdit(null);
	}

    return (
        <Grid item xs={12}>
			
            <Box sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'white', p: '1rem', position:'relative' }} mb="1rem">
				{
					selectedParticipant ? 
					<Participant participant={selectedParticipant} backToList={() => setSelectedParticipant(null)} studyDetail={studyDetail} /> 
				:
				<>
					<Typography variant='h4' gutterBottom>List Participants</Typography>
					<Grid
						container
						width="100%"
						sx={{ borderBottom: 1, borderColor: 'divider' }}
						alignItems="center"
						pb={1}
						mt={2}
						columnGap={1}
					>
						<Grid item xs={activeDateSetting == 'full' ? 7 : 4.5}>
							<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								value={searchTerm}
								onChange={(e) => handleSearchStudy(e.target.value)}
								placeholder="Institution, Age, Gender"
							/>
						</Grid>
						<Grid item xs={activeDateSetting == 'full' ? 2.5 : 2}>
							<Select
								size='small'
								onChange={(e) => handleChangeDateSetting(e.target.value)}
								value={activeDateSetting} fullWidth
								sx={{bgcolor: 'white'}}
								>
								<MenuItem value="full">{t('study.full_period')}</MenuItem>
								<MenuItem value="dates">{t('study.date_setting')}</MenuItem>
							</Select>
						</Grid>
						{
							activeDateSetting == 'dates' &&
							<Grid item xs={3}>
								<RangePicker
									placement="bottomRight"
									style={{
										padding: '6px 11px',
										borderRadius: '4px',
										minHeight: '1.4375em',
										borderColor: 'rgba(0, 0, 0, 0.23)',
										width: '100%'
									}}
									onChange={onChangeDate}
								/>
							</Grid>
						}
						<Grid item xs={activeDateSetting == 'full' ? 2 : 2}>
							<Button variant="contained" onClick={() => setOpenAdd(true)} fullWidth>
								<PlusOutlined />
								<Typography sx={{ ml: 1 }}>Add Participant</Typography>
							</Button>
						</Grid>
					</Grid>
				
					
					<DataGrid
                    columns={columns}
                    rows={searchedRows}
                    autoHeight
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
					onRowClick={(e) => handleSelectOne(e.row as ECrfRows)} //List Participant eCRF로 이동?
                    sx={{
                        [`& .${gridClasses.virtualScrollerContent}`]: {
                            borderTop: `1px solid ${theme.palette.grey[400]}`,
                        },
                        [`& .${gridClasses.row}`]: {
                            borderBottom: `1px solid ${theme.palette.grey[300]}`,
                        },
						// fontSize: '0.9rem'
                    }}
                />
				</>
				}
            </Box>
			
			<AddParticipant
				isOpen={openAdd}
				handleClose={handleCloseAddPartipant} 
				stdNo={stdNum}
				participant={participantEdit}
			/>
        </Grid>
    );
};

export default ECrfParticipants;
