import ecrfApi from "@/apis/ecrf";
import { CRFFormJson, ECrfDetail } from "@/types/ecrf";
import { useEffect, useState } from "react";
import { ItemType } from '../../../../types/ecrf';
import { Box, Card, Stack, Typography } from "@mui/material";

type ECrfPreviewType = {
	crfNo: number | null;
}
const ECrfPreview = ({crfNo} : ECrfPreviewType) => {
	const [crfDetail, setCrfDetail] = useState<ECrfDetail | null>(null);
	const [crfFile, setCrfFile] = useState<ItemType | null>(null)
	const [crfJson, setCrfJson] = useState<CRFFormJson[] | null>(null);
	
	const getCrfDetail = async (crfNo:number) => {
		const response = await ecrfApi.getCRF(crfNo);
		if(response.code === 200) {
			setCrfDetail(response.content);
			handleSetData(response.content.crf_form_json as CRFFormJson[]);
			setCrfFile(response.content.crf_form_json[0] as ItemType);
		}
	}

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
	}

	useEffect(() => {
		if(crfNo) getCrfDetail(crfNo);
	}, [crfNo]);

	return (
		<div>
			{
				crfDetail && <>
					<Typography variant="h3">{crfDetail.crf_title}</Typography>
					{
						crfDetail.crf_description && <Typography variant="h6">{crfDetail.crf_description}</Typography>
					}
					<Stack>
					{
						crfFile	&& <Card>{crfFile.itemType}</Card>
					}
					{
						crfJson && crfJson.map((crf:CRFFormJson, index) => {
							return (
								<Box key={index} display="flex" sx={{width:'100%', border: '1px solid black', padding: '10px'}}>
									{
										Object.keys(crf).map((key) => {
											const items: ItemType[] = crf[key];
											return (
												<Box display="flex" flexDirection="column" key={key}>
												{
													items && items.map((item, index2) => {
														return (
															<Card key={index2}>{item.itemType}</Card>
														)
													})
												}
												
												</Box>
											)
											
										})
									}
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