import { Box, Button, Grid, IconButton, MenuItem, Pagination, Select, Tab, Tabs, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ECrfParticipant } from "@/types/ecrfParticipant";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "antd/lib/date-picker";
import ecrfApi from "@/apis/ecrf";
import { StudyCrfListRespone } from "@/types/ecrf";
import eCrfInputApi from "@/apis/eCrfInput";
import { StudyDetail } from "@/types/study";
import ECrfInputDialog from "@/pages/ecrf-builder/components/ECrfInputDialog";
import { InputCrfDetail, InputCrfList } from "@/types/eCrfInput";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
import { paginator } from '@/utils/helper';
import { Title } from '../../../mdpp/styles';
import { useConfirmation } from "@/context/ConfirmDialogContext";
import ECrfEditDialog from "@/pages/ecrf-builder/components/ECrfEditDialog";


type ParticipantType = {
	participant: ECrfParticipant;
	backToList: () => void,
	studyDetail: StudyDetail 
}

const Participant = ({participant, backToList, studyDetail}: ParticipantType) => {
	const [ activeDateSetting, setActiveDateSetting ] = useState('full');
	const [ dateSet, setDateSet ] = useState<{startDt: string, endDt: string}>({startDt : '', endDt: ''});
	const [ crfPairList, setCrfPairList ] = useState<StudyCrfListRespone[] | []>([]);
	const [ activeTab, setActiveTab ] = useState<number | null>(null);
	const [ selectedCrf, setSelectedCrf ] =  useState<StudyCrfListRespone | null>(null);
	const [ inputList, setInputList] = useState<InputCrfList[]>([]);
	const [ searched, setSearched ] = useState<InputCrfList[]>([]);
	
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	
	const itemPerPage = 10;

	const [ openInput, setOpenInput ] = useState<boolean>(false);
	const [ openEdit, setOpenEdit ] = useState<boolean>(false);
	const [ selectedCrfInput, setSelectedCrfInput ] = useState<InputCrfDetail | null>(null)

	const confirm = useConfirmation();

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

	const getECRFList = async () => {
		if(participant.std_no) {
			const reponse = await ecrfApi.getStudyCrfpair(participant.std_no);
			const crfList = reponse.content;
			setCrfPairList(crfList);
			if(crfList[0]) {
				setActiveTab(crfList[0].pair_no);
				const firstCrf = crfList[0];
				setSelectedCrf(firstCrf);
				getCRFInputList(firstCrf.pair_no, firstCrf.std_no, firstCrf.crf_no)	
			}
			
		} else {
			setCrfPairList([])
		}	
	};


	const getCRFInputList = async (pair_no:number, std_no:number, crf_no:number) => {
		if(participant) {
			const response = await eCrfInputApi.getECrfInputList(pair_no, std_no, crf_no, participant.std_crf_participant_no)
			const inputList = response.content;
			setInputList(inputList);
			setSearched(inputList);
			setPageCount(Math.ceil(inputList.length/itemPerPage));
		}
	}

	useEffect(() => {
		getECRFList();
	}, [participant])

	const handleChangeTab = (crf:StudyCrfListRespone) => {
		setActiveTab(crf.pair_no);
		setSelectedCrf(crf);
		getCRFInputList(crf.pair_no, crf.std_no, crf.crf_no);
	}

	const addNewInput = () => {
		setOpenInput(true);
	}

	const handleCloseInput = () => {
		setOpenInput(false);
		if(selectedCrf) {
			getCRFInputList(selectedCrf.pair_no, selectedCrf.std_no, selectedCrf.crf_no);
		}
	}

	const handleCloseInputEdit = () => {
		setOpenEdit(false);
	}

	const handleChangePage = (_e, value:number) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}

	const deleteSelectedCrfInput = async (crf_input_no:number) => {
		const resp = await eCrfInputApi.deleteECrfInput(crf_input_no);
		if(resp.result) {
			if(selectedCrf) getCRFInputList(selectedCrf.pair_no, selectedCrf.std_no, selectedCrf.crf_no);
		}
	}

	const handleDeleteCrfInput = (crf_input_no:number) => {	
		confirm({
			description: '이 CRF를 삭제하시겠습니까?',
			variant: 'danger',
		}).then(() => {		
			deleteSelectedCrfInput(crf_input_no);}
		);
	}

	const handleEditCrfInputOpen = async (crf_input_no: number) => {
		const resp = await eCrfInputApi.getECrfInputDetail(crf_input_no);
		if(resp.result) {
			console.log(resp.content)
			setOpenEdit(true);
			setSelectedCrfInput(resp.content);
		}
	}
	
	return (
		<>
			<Box display="flex" alignItems="center" gap={1}>
				<IconButton onClick={backToList}>
					<ArrowBackIcon  />
				</IconButton>
				<Typography variant='h4'>List Participant eCRF</Typography>
			</Box>
			<Box display="flex" justifyContent="flex-end" gap={1}>
				<Button variant="outlined" onClick={backToList}>
					<ArrowLeftOutlined />
					<Typography sx={{ ml: 1 }}>Move to List Participants</Typography>
				</Button>
				{
					crfPairList && crfPairList.length > 0 &&
					<Button variant="contained" onClick={addNewInput}>
						<PlusOutlined />
						<Typography sx={{ ml: 1 }}>New Input eCRF</Typography>
					</Button>
				}
				
				<Select
					size='small'
					onChange={(e) => handleChangeDateSetting(e.target.value)}
					value={activeDateSetting}
					sx={{bgcolor: 'white'}}
					>
					<MenuItem value="full">{t('study.full_period')}</MenuItem>
					<MenuItem value="dates">{t('study.date_setting')}</MenuItem>
				</Select>
				{
					activeDateSetting == 'dates' &&
						<RangePicker
							placement="bottomRight"
							style={{
								padding: '6px 11px',
								borderRadius: '4px',
								minHeight: '1.4375em',
								borderColor: 'rgba(0, 0, 0, 0.23)'
							}}
							onChange={onChangeDate}
						/>
				}
			</Box>
			{
				crfPairList && crfPairList.length > 0 ? 
				<Box>
					<Tabs
						value={activeTab}
						aria-label="CRF-List"
					>
						{
							crfPairList.map((crf: StudyCrfListRespone, index) => 
								<Tab label={crf.crf_title} key={index} value={crf.pair_no} onClick={() => handleChangeTab(crf)} />
							)
						}
					</Tabs>
					<Box>
						<Grid container mt={1}>
								
							<Grid container item xs={12} sx={{borderBottom : '1px solid #ddd', fontWeight: 'bold', color: 'gray', p: '0.5rem 0'}}>
								<Grid item xs={5}>CRF Title</Grid>
								<Grid item xs={2}>Date of Inspect</Grid>
								<Grid item xs={2}>Date of Input</Grid>
								<Grid item xs={3}>Etc</Grid>
							</Grid>
						{
							inputList && inputList.length > 0 ?
							<>
								{paginator(searched, page, itemPerPage).data.map((inputCrf, index) => {
									
									return (
									<Grid item container xs={12} key={index} sx={{borderBottom : '1px solid #eee', p: '0.5rem 0'}}>
										<Grid item xs={5} alignContent="center">
											<Typography>{selectedCrf?.crf_title}</Typography>
										</Grid>
										<Grid item xs={2} alignContent="center">
											<Typography>{dayjs(inputCrf.inspect_date).format('YY/MM/DD')}</Typography>
										</Grid>
										<Grid item xs={2} alignContent="center">
											<Typography>{dayjs(inputCrf.input_date).format('YY/MM/DD')}</Typography>
										</Grid>
										<Grid item xs={3}>
											<Box gap={1} display="flex">
												<Button color="error" variant="contained" onClick={() => handleDeleteCrfInput(inputCrf.crf_input_no)}>Delete</Button>
												<Button variant="contained" onClick={() => handleEditCrfInputOpen(inputCrf.crf_input_no)}>Edit</Button>
											</Box>
										</Grid>
									</Grid>
									)
								})}
								{
									pageCount > 0 &&  
									<Grid item container xs={12} justifyContent="center" mt={2}>
										<Pagination
											count={pageCount}
											page={page}
											onChange={handleChangePage}
											color="primary"
										/>
									</Grid>
								}	
							</>
							:
							<Grid item xs={12} sx={{background: '#eee'}} p={2} borderRadius={1} mt={2} textAlign="center">
								There is no eCRF Input.
							</Grid>
						}
						</Grid>
					</Box>
				</Box>

				: 
				<Box sx={{background: '#eee'}} p={2} borderRadius={1} mt={2} textAlign="center">
					There is no eCRF Sheet connected. Please register the eCRF Sheet.
					{/* 연결된 eCRF Sheet가 없습니다. eCRF Sheet를 등록 해 주세요. */}
				</Box>
			}

			<ECrfInputDialog 
				isOpen={openInput}
				handleClose={handleCloseInput} 
				studyDetail={studyDetail}
				participant={participant}
				crfPairList={crfPairList}
				selectedCrf={selectedCrf}
			/>
			
			<ECrfEditDialog
				isOpen={openEdit}
				handleClose={handleCloseInputEdit}
				studyDetail={studyDetail}
				participant={participant}
				selectedCrfInput={selectedCrfInput}
			/>
		</>
	);
}

export default Participant;