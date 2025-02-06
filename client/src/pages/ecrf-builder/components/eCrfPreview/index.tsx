import ecrfApi from "@/apis/ecrf";
import { CRFFormJson, ECrfDetail, FileItemTypes, ItemContents } from "@/types/ecrf";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ItemType } from '../../../../types/ecrf';
import { Box, Button, Card, Input, Stack, Typography, Theme } from '@mui/material';
import InputItem, { ChangedItmeType } from "./InputItem";
import CrfFileDropzone from "./CrfFileDropZone";
import { Dayjs } from "dayjs";
import { Formik, Form, FieldArray, Field, FieldAttributes, FieldInputProps, FormikProps, setIn } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from "@mui/x-date-pickers";

type CrfSubmitType = {
	inspectDate: Dayjs | null;
	answers: CRFFormJson[];
}
type ECrfPreviewType = {
	crfNo: number | null;
}
const ECrfPreview = ({crfNo} : ECrfPreviewType) => {
	const [crfDetail, setCrfDetail] = useState<ECrfDetail | null>(null);
	const [crfFile, setCrfFile] = useState<ItemType | null>(null)
	const [crfJson, setCrfJson] = useState<CRFFormJson[] | null>(null);
	const [addedFiles, setAddedFiles] = useState<(File | null)[]>([null, null, null]);
	const [fileError, setFileError] = useState<string | null>(null);
	const [inspactDate, setInspactDate] = useState<Dayjs | null | undefined>(null);
	const [inspectDateError, setInspectDateError] = useState<string | null>(null);
	const [submitCheck, setSubmitCheck] = useState<boolean>(false);
	
	const getCrfDetail = useCallback(async (crfNo:number) => {
		const response = await ecrfApi.getCRF(crfNo);
		if(response.code === 200) {
			setCrfDetail(response.content);
			if('itemType' in response.content.crf_form_json[0] && response.content.crf_form_json[0].itemType === 'File Input') {
				setCrfFile(response.content.crf_form_json[0]);
			}
			handleSetData(response.content.crf_form_json as CRFFormJson[]);
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

		setCrfJson(editJson);
	}

	useEffect(() => {
		if(crfNo) getCrfDetail(crfNo);
	}, [crfNo, getCrfDetail]);

	const changeValue = ({changedItem, answerIndex, answerKey, itemIndex}:ChangedItmeType) => {
		console.log(changedItem);
		console.log(crfJson);

		setCrfJson((prev) => {
			const newJson = prev ? [...prev] : [];
			newJson[answerIndex][answerKey][itemIndex] = changedItem;
			return newJson;
		});
	}

	const onChangeFile = (file: File | null, indexNum:number) => {
		const newFiles = [...addedFiles];
		newFiles.splice(indexNum, 1, file);
		setAddedFiles(newFiles);
	}

	const fileRequiredCheck = () => {
		if(crfFile && crfFile.content.required && addedFiles.map(file => file !== null).filter(Boolean).length === 0) {
			setFileError('적어도 한개의 파일이 필요합니다.');
			return true;
		} 
		setFileError(null);
		return false;
	};

	useEffect(() => {
		fileRequiredCheck();
	}, [addedFiles]);

	const inspectDateValidate = () => {
		if (!inspactDate) {
			const error = '필수 입력사항입니다.';
			setInspectDateError(error);
			return true;
		}
		setInspectDateError(null);
		return false;
	}

	const handleSumbitCRF = () => {
		fileRequiredCheck();
		inspectDateValidate();		
	}		

	return (
		<div>
			
			<Card sx={{p:"10px 20px", mb:1}}>
				<Box display="flex" gap={2} alignItems="center">
					<Typography variant="h5">Inspect(Visit) Date <span style={{color: 'red'}}>*</span></Typography>
					<DatePicker 
						value={inspactDate}
						format="YYYY/MM/DD"
						onChange={(e) => {
							console.log(e?.format('YYYY/MM/DD'));
							//setFieldValue('inspectDate', e?.format('YYYY/MM/DD'));
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
						crfFile	&& <Card sx={{marginBottom: '1rem'}}>
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
									/>
									<CrfFileDropzone changefiles={
										(file) => {
											onChangeFile(file, 1)}
										}
									/>
									<CrfFileDropzone changefiles={
										(file) => {
											// setFieldValue(`files.files.2`, file ?  file : null);
											onChangeFile(file, 2)
										}
									}
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
					<Box mb={1} p="1rem 1rem 0 1rem">
						<Typography variant="h3">{crfDetail.crf_title}</Typography>
						{
							crfDetail.crf_description && <Typography variant="h6">{crfDetail.crf_description}</Typography>
						}
					</Box>
					{
						crfJson && crfJson.length > 0 && crfJson.map((crf:CRFFormJson, index) => {
							return (
								<Box key={index} sx={{background: '#eeeeee', borderRadius: '4px'}}>
									<Box display="flex" sx={{width:'100%'}} flexDirection="row" flexWrap="wrap" gap={1} p={1}>
									{
										Object.keys(crf).map((key) => {
											const items: ItemType[] = crf[key];
											return (
												<Box key={key} display="flex" flexDirection="column" flex="1" gap={1}>
														{
															items && items.map((item, index2) => {
																return (
																	<Card key={index2} sx={item.itemType ==='Headline' ? {background: 'transparent', padding: 1, boxShadow: 'none'} : {padding: 1}}>
																		<InputItem item={item} onChange={changeValue} submitCheck={submitCheck} answerIndex={index} answerKey={key} itemIndex={index2} />	
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
			<Button variant="contained" color="primary" onClick={handleSumbitCRF}>Submit</Button>
		</div>
	);
}

export default ECrfPreview;