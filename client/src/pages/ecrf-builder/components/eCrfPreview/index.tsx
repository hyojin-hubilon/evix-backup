import ecrfApi from "@/apis/ecrf";
import { CRFFormJson, ECrfDetail } from "@/types/ecrf";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ItemType } from '../../../../types/ecrf';
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import InputItem from "./InputItem";
import CrfFileDropzone from "./CrfFileDropZone";

type ECrfPreviewType = {
	crfNo: number | null;
}
const ECrfPreview = ({crfNo} : ECrfPreviewType) => {
	const [crfDetail, setCrfDetail] = useState<ECrfDetail | null>(null);
	const [crfFile, setCrfFile] = useState<ItemType | null>(null)
	const [crfJson, setCrfJson] = useState<CRFFormJson[] | null>(null);
	const [addedFiles, setAddedFiles] = useState<(File | null)[]>([null, null, null]);
	
	const getCrfDetail = useCallback(async (crfNo:number) => {
		const response = await ecrfApi.getCRF(crfNo);
		if(response.code === 200) {
			setCrfDetail(response.content);
			handleSetData(response.content.crf_form_json as CRFFormJson[]);
			if('itemType' in response.content.crf_form_json[0] && response.content.crf_form_json[0].itemType === 'File Input') {
				setCrfFile(response.content.crf_form_json[0]);
			}
			
		}
	}, []);

	const handleSetData = (data:CRFFormJson[]) => {
		const detail = data;
		console.log(detail, 'detail');

		let editJson : CRFFormJson[] = [];
		//첫번째에 파일인풋이 있는 경우
		if('itemType' in detail[0] && detail[0].itemType === 'File Input') {
			editJson = detail.slice(1);
		} else {
			editJson = detail;
		}

		setCrfJson(editJson);
		console.log(editJson);
	}

	useEffect(() => {
		if(crfNo) getCrfDetail(crfNo);
	}, [crfNo, getCrfDetail]);

	const changeValue = (item:ItemType) => {

	}

	const onChangeFile = (file: File | null, indexNum:number) => {
		const newFiles = [...addedFiles];
		newFiles.splice(indexNum, 1, file);
		setAddedFiles(newFiles);
	}

	useEffect(() => {
		console.log(addedFiles)
	}, [addedFiles])

	return (
		<div>
			{
				crfDetail && <>
					
					<Stack spacing={1}>
					{
						crfFile	&& <Card sx={{marginBottom: '1rem'}}>
								<Box p={2}>
									<Typography variant="h5">
										File Upload
									</Typography>
									<Typography mb={1}>
										Attach the file to upload. (jpg, jpeg, png, pdf files under 5mb) - Up to 3 files can be attached.<br />
										{/* 업로드 할 파일을 첨부하세요. (5mb이하의 jpg, jpeg, png, pdf 파일) - 최대 3개 첨부가능 */}
									</Typography>
									<Box display="flex" gap={1} flexWrap="wrap">
										<CrfFileDropzone changefiles={(file) => onChangeFile(file, 0)}/>
										<CrfFileDropzone changefiles={(file) => onChangeFile(file, 1)}/>
										<CrfFileDropzone changefiles={(file) => onChangeFile(file, 2)}/>
									</Box>
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
																		<InputItem item={item} onChange={changeValue} />	
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
			
		</div>
	);
}

export default ECrfPreview;