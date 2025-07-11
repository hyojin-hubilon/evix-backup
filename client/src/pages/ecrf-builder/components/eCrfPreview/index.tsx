import ecrfApi from "@/apis/ecrf";
import { CRFFormJson, ECrfDetail } from "@/types/ecrf";
import { useCallback, useEffect, useRef, useState } from "react";
import { ItemType } from '../../../../types/ecrf';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import InputItem, { ChangedItmeType, ItemErrorType } from "./InputItem";
import CrfFileDropzone from "./CrfFileDropZone";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import eCrfInputApi from '@/apis/eCrfInput';
import { AttachmentList, ECrfPostReqBody, InputCrfDetail } from "@/types/eCrfInput";
import { useConfirmation } from "@/context/ConfirmDialogContext";

type ECrfPreviewType = {
	crfNo?: number | null;
	pairNo?: number;
	stdNo?: number;
	participantNo?: number;
	selectedCrfInput?: InputCrfDetail;
	saveClick?:boolean;
	handleCloseDialog?: () => void
}
const ECrfPreview = ({crfNo, pairNo, stdNo, participantNo, selectedCrfInput, saveClick, handleCloseDialog} : ECrfPreviewType) => {

	const confirm = useConfirmation();
	
	const [crfDetail, setCrfDetail] = useState<ECrfDetail | null>(null);
	const [crfFile, setCrfFile] = useState<ItemType | null>(null)
	const [crfJson, setCrfJson] = useState<CRFFormJson[] | null>(null);
	const [addedFiles, setAddedFiles] = useState<(File | null)[]>([null, null, null]);
	const [fileError, setFileError] = useState<string | null>(null);
	const [inspactDate, setInspactDate] = useState<Dayjs | null | undefined>(null);
	const [inspectDateError, setInspectDateError] = useState<string | null>(null);
	const [submitCheck, setSubmitCheck] = useState<boolean>(false);
	const [fieldError, setFieldError] = useState<null[][][]>([]);
	const [selectedCrfNo, setSelectedCrfNo] = useState<number | null>(crfNo ? crfNo : null);
	const [attchedFile, setAttachedFile] = useState<AttachmentList[]>([])

	const handleValidateStart = async () => {
		setSubmitCheck(true);
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	
	const getCrfDetail = useCallback(async (crfNo:number, edit: boolean) => {
		const response = await ecrfApi.getCRF(crfNo);
		if(response.code === 200) {
			setCrfDetail(response.content);
			if('itemType' in response.content.crf_form_json[0] && response.content.crf_form_json[0].itemType === 'File Input') {
				setCrfFile(response.content.crf_form_json[0]);
			}
			if(!edit) { 
				handleSetData(response.content.crf_form_json as CRFFormJson[]);
			}
		}
	}, []);

	const handleSetData = (data:CRFFormJson[]) => {
		const detail = data;

		let editJson : CRFFormJson[] = [];
		//첫번째에 파일인풋이 있는 경우
		if('itemType' in detail[0] && detail[0].itemType === 'File Input') {
			editJson = detail.slice(1);
		} else {
			editJson = detail;
		}

		const crfList: null[][][] = [];
		editJson.forEach(crf => {
			const crfItem: null[][] = [];
			Object.keys(crf).map(key => {
				const items: ItemType[] = crf[key];
				const itemList: null[] = [];
				if (items) {
					items.map(item => itemList.push(null));
				}
				crfItem.push(itemList)
			})

			crfList.push(crfItem);
		});

		console.log(editJson);

		setFieldError(crfList);
		setCrfJson(editJson);
	}

	useEffect(() => {
		if(crfNo) getCrfDetail(crfNo, false);
	}, [crfNo, getCrfDetail]);

	const handleSetEditData = (inputDetail:InputCrfDetail) => {
		const detail:CRFFormJson[] = inputDetail.input_crf_form_json;
		setAttachedFile(inputDetail.attachment_list);
		
		const crfList: null[][][] = [];
		detail.forEach(crf => {
			const crfItem: null[][] = [];
			Object.keys(crf).map(key => {
				const items: ItemType[] = crf[key];
				const itemList: null[] = [];
				if (items) {
					items.map(item => itemList.push(null));
				}
				crfItem.push(itemList)
			})

			crfList.push(crfItem);
		});

		setFieldError(crfList);
		setCrfJson(detail);
	}

	useEffect(() => {
		console.log(selectedCrfInput);
		if(selectedCrfInput) {
			handleSetEditData(selectedCrfInput);
			getCrfDetail(selectedCrfInput.crf_no, true);
		}
	}, [selectedCrfInput, getCrfDetail])

	const changeValue = ({changedItem, answerIndex, answerKey, itemIndex}:ChangedItmeType) => {
		setCrfJson((prev) => {
			const newJson = prev ? [...prev] : [];
			newJson[answerIndex][answerKey][itemIndex] = changedItem;
			return newJson;
		});
	}

	const errorCheck = ({error, answerIndex, answerKey, itemIndex}:ItemErrorType) => {
		setFieldError((prev) => {
			const newJson = prev ? [...prev] : [];
			newJson[answerIndex][answerKey][itemIndex] = error;
			return newJson;
		});
	}

	const onChangeFile = (file: File | null, indexNum:number) => {
		const newFiles = [...addedFiles];
		newFiles.splice(indexNum, 1, file);
		setAddedFiles(newFiles);
	}

	const onChangeExistFile = (file: AttachmentList | null, indexNum:number) => { //put 일때 교체
		const newFiles = [...attchedFile];
		newFiles.splice(indexNum, 1);
		setAttachedFile(newFiles);
	}


	const inspectDateValidate = () => {
		console.log('dateCheck');
		return new Promise<void>((resolve, reject) => {
			if (!inspactDate) {
				const error = '필수 입력사항입니다.';
				setInspectDateError(error);
				reject();
			} else {
				setInspectDateError(null);
				resolve();
			}		
		});
	}

	const fileRequiredCheck = () => {
		console.log('fileCheck');
		return new Promise<void>((resolve, reject) => {
			if(crfFile && crfFile.content.required && (addedFiles.map(file => file !== null).filter(Boolean).length === 0 && attchedFile.length === 0)) {
				setFileError('적어도 한개의 파일이 필요합니다.');
				reject();
			} else {
				setFileError(null);
				resolve();
			}
		});
	};

	const checkFieldError = () => {
		console.log(crfJson, 'fieldCheck')
		return new Promise<void>((resolve, reject) => {
			let notNullError = [];
		
			fieldError.forEach(subArray => {
				subArray.forEach(items => {
					const notNull = items.filter(el => el !== null);
					notNullError = notNull.concat(notNullError);
				})	
			})

			if(notNullError.length > 0) {
				reject();
			} else {
				resolve();
			}
		})
	}

	const handleCollectData = async () => {
		if(selectedCrfInput) {
			const crfInputValues: ECrfPostReqBody = {
				pair_no: selectedCrfInput.pair_no,
				std_no: selectedCrfInput.std_no,
				crf_no: selectedCrfInput.crf_no,
				std_crf_participant_no: selectedCrfInput.std_crf_participant_no,
				inspect_date: dayjs(inspactDate).format('YYYY-MM-DD'),
				input_crf_form_json: crfJson
			}
	
			console.log(crfInputValues);
			
			const formData = new FormData();
			
			formData.append(
				'requestDto',
				new Blob([JSON.stringify(crfInputValues)], { type: 'application/json' })
			);
	
			if (addedFiles) {
				const files = addedFiles.filter(el => el !== null);
				files.forEach(file => {
					formData.append('crf_file_attachments', files[0], files[0].name)
				})
			}

			const resp = await eCrfInputApi.putECrfInput(formData);
			if(resp.result) {
				confirm({
					description: "저장되었습니다."
				});
			}
			
		} else {
			const crfInputValues: ECrfPostReqBody = {
				pair_no: pairNo,
				std_no: stdNo,
				crf_no: selectedCrfNo,
				std_crf_participant_no: participantNo,
				inspect_date: dayjs(inspactDate).format('YYYY-MM-DD'),
				input_crf_form_json: crfJson
			}
	
			console.log(crfInputValues);
			
			const formData = new FormData();
			
			formData.append(
				'requestDto',
				new Blob([JSON.stringify(crfInputValues)], { type: 'application/json' })
			);
	
			if (addedFiles) {
				const files = addedFiles.filter(el => el !== null);
				files.forEach(file => {
					formData.append('crf_file_attachments', files[0], files[0].name)
				})
			}

			const resp = await eCrfInputApi.postECrfInput(formData);
			if(resp.result) {
				confirm({
					description: "저장되었습니다."
				}).then(() => { if (handleCloseDialog) handleCloseDialog(); });
			}
		}
	}

	const handleSumbitCRF = () => {
		console.log('submit');
		handleValidateStart()
			.then(() => inspectDateValidate())
			.then(() => fileRequiredCheck())
			.then(() => checkFieldError())
			.then(() => {
				console.log('save')
				handleCollectData();
				setSubmitCheck(false);
			})
			.catch((e) => {
				setSubmitCheck(false);
			})
	}		

	useEffect(() => {
		if(saveClick) handleSumbitCRF();
	}, [saveClick])

	return (
		<div>
			
			<Card sx={{p:"10px 20px", mb:1}}>
				<Box display="flex" gap={2} alignItems="center">
					<Typography variant="h5">Inspect(Visit) Date <span style={{color: 'red'}}>*</span></Typography>
					<DatePicker 
						value={inspactDate}
						format="YYYY/MM/DD"
						onChange={(e) => {
							setInspactDate(e);
						}}
						name="inspectDate"
						
					/>
					{inspectDateError && <Typography color="error">{inspectDateError}</Typography>}
				</Box>
			</Card>
			{
				crfDetail && <>
					
					<Stack spacing={1}>
					{
						crfFile && <Card sx={{marginBottom: '1rem'}}>
							<Box p={2}>
								<Typography variant="h5">
									File Upload { crfFile.content.required && <span style={{color: 'red'}}>*</span> } 
								</Typography>
								<Typography mb={1}>
									Attach the file to upload. (jpg, jpeg, png, pdf files under 5mb) - Up to 3 files can be attached.<br />
									{/* 업로드 할 파일을 첨부하세요. (5mb이하의 jpg, jpeg, png, pdf 파일) - 최대 3개 첨부가능 */}
								</Typography>
								<Box display="flex" gap={1} flexWrap="wrap">
									<CrfFileDropzone changefiles={
										(file) => {
											onChangeFile(file, 0)}
										}
										attchedFile={attchedFile[0]}
										changeExistfile={(file) => onChangeExistFile(file, 0)}
									/>
									<CrfFileDropzone changefiles={
										(file) => {
											onChangeFile(file, 1)}
										}
										attchedFile={attchedFile[1]}
										changeExistfile={(file) => onChangeExistFile(file, 1)}
									/>
									<CrfFileDropzone changefiles={
										(file) => onChangeFile(file, 2)
										}
										attchedFile={attchedFile[2]}
										changeExistfile={(file) => onChangeExistFile(file, 2)}
									/>
								</Box>
								{
									fileError && 
									<Box mt={1}>	
										<Typography color="error">{fileError}</Typography>
									</Box>
								}
							</Box>
						</Card>
					}
					{
						crfDetail && <Box mb={1} p="1rem 1rem 0 1rem">
						<Typography variant="h3">{crfDetail.crf_title}</Typography>
							{
								crfDetail.crf_description && <Typography variant="h6">{crfDetail.crf_description}</Typography>
							}
						</Box>
					}
					
					{
						crfJson && crfJson.length > 0 && crfJson.map((crf:CRFFormJson, index) => {
							return (
								<Box key={index} sx={{background: '#eeeeee', borderRadius: '4px'}}>
									<Box display="flex" sx={{width:'100%'}} flexDirection="row" flexWrap="wrap" gap={1} p={1}>
									{
										Object.keys(crf).map((key) => {
											console.log(crfJson)
											const items: ItemType[] = crf[key];
											return (
												<Box key={key} display="flex" flexDirection="column" flex="1" gap={1}>
													{
														items && items.map((item, index2) => {
															return (
																<Card key={index2} sx={item.itemType ==='Headline' ? {background: 'transparent', padding: 1, boxShadow: 'none'} : {padding: 1}}>
																	<InputItem item={item} onChange={changeValue} submitCheck={submitCheck} answerIndex={index} answerKey={key} itemIndex={index2} onError={errorCheck} />	
																</Card>
															)
														})
													}
												</Box>
											)
											
										})
									}
									</Box>
									
								</Box>
							)
						})
					}
					</Stack>
				</>
			}
			{/* <Button variant="contained" color="primary" onClick={handleSumbitCRF}>Submit</Button> */}
		</div>
	);
}

export default ECrfPreview;