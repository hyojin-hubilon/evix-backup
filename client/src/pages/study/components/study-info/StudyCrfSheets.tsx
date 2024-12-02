import MainCard from "@/components/MainCard";
import { StudyCrfListRespone } from "@/types/ecrf";
import { StudyCrfSet } from "@/types/study";
import { Box, Button, Link, List, ListItem, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import { useEffect, useState, useCallback } from 'react';
import ECrfConnectDialog from "../study-new/ECrfConnectDialog";
import ecrfApi from "@/apis/ecrf";

type StudyCrfSheetsType = {
	stdNo: number;
	statusLabel: string;
}
const StudyCrfSheets = ({stdNo, statusLabel}: StudyCrfSheetsType) => {
	const theme = useTheme();

	const [isOpenCrf, setIsOpenCrf] = useState<boolean>(false);
	const [studyCrfSetList, setStudyCrfSetList] = useState<StudyCrfSet[]>([]);
	const [initialCrfSetList, setInitialCrfSetList] = useState<StudyCrfListRespone[]>([]);
	const handleCloseCrf = () => {
		setIsOpenCrf(false);
	}

	const getECRFList = useCallback(async () => {
		const reponse = await ecrfApi.getStudyCrfpair(stdNo);
		const crfList = reponse.content;
		setInitialCrfSetList(crfList);
	}, [stdNo]);

	
	const postNewCrfPair = async (crfList) => {
		const response = await ecrfApi.postCrfpair(crfList);
		console.log('new crf post');
		//api 변경예정
		if(response.code === 200) {
			getECRFList()
			console.log(response);
			
		}
	};

	useEffect(() => {
		getECRFList();
	}, [getECRFList])

	const saveNewCrfList = (crfList: StudyCrfSet[]) => {
		//postNewCrfPair(crfList);
	};
	
	return (
		<>
			<Box
				sx={{
					p: '1rem',
					bgcolor: theme.palette.grey[100],
					borderRadius: '4px',
					mb: '0.5rem',
				}}
			>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography variant="h5">eCRF Sheets</Typography>
					{(statusLabel === 'New' || statusLabel === 'Pause') && (
						<Button
							variant="outlined"
							onClick={() => setIsOpenCrf(true)}
						>
							Edit
						</Button>
					)}
				</Box>
				<List
					sx={{
						listStyle: 'disc',
						pl: '20px',
						'li': {
							display: 'list-item',
							pl: 0,
							pb: 0,
						},
					}}
				>
					{initialCrfSetList &&
						initialCrfSetList.length > 0 &&
						initialCrfSetList.map((crf) =>
							<ListItem
								key={crf.crf_no}
								sx={{ display: 'block' }}
							>
								<Link
									sx={{
										display: 'inline-block',
										marginRight: '0.5rem',
										cursor: 'pointer',
									}}
									// onClick={() =>
									// 	handleShowCrf(crf.crf_no)
									// }
								>
									{crf.crf_title}
								</Link>
							</ListItem>
						)}
				</List>
			</Box>


			<ECrfConnectDialog
                isOpen={isOpenCrf}
                handleClose={handleCloseCrf}
                setStudyCrfSetList={saveNewCrfList}
                initialCrfSetList={initialCrfSetList}
                mode="edit"
                studyNo={stdNo}
            />
		</>	
		
	)
}

export default StudyCrfSheets;