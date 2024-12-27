import { Box, Grid, OutlinedInput } from '@mui/material';
import ECrfBuilder from './components/ECrfBuilder';
import { useEffect, useState } from 'react';
import ecrfApi from '@/apis/ecrf';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { CRFFormJson, ECrfDetail, Idstype, ItemType } from '@/types/ecrf';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ECrf = () => {
	const [title, setTitle] = useState<string>('');
	const [desc, setDesc] = useState<string>('');

	const confirm = useConfirmation();

	const locations = useLocation();
	const parmas = useParams();
	const navigate = useNavigate();
		
	const [ crfNo, setCrfNo ] = useState<string | number | null>(null);
	const [ editorState, setEditorState ] = useState<'edit' | 'copy' | 'new' | null>(null); //edit, copy check
	const [ eCrfJson, setECrfJson ] = useState<Idstype[] | null>(null);	
	const [ existFileSet, setExistFileSet ] = useState<ItemType | null>(null);

	
	useEffect(() => {
		if((locations.pathname.startsWith('/e-crf/edit') && parmas.crf_no) || (locations.state == 'edit' && parmas.crf_no)) {
			setEditorState('edit');
			setCrfNo(Number(parmas.crf_no));
			getCopyingCrfDetail(parmas.crf_no);
			return;
		}

		if(locations.state == 'copy' && parmas.crf_no) {
			setEditorState('copy');
			getCopyingCrfDetail(parmas.crf_no);
			setCrfNo(null);
			return;
		}

		if(locations.state == 'new') {
			
			if(parmas.crf_no) {
				getCopyingCrfDetail(parmas.crf_no);
				setCrfNo(null);
				return;
			}
			
		}
	}, [])


	const getCopyingCrfDetail = async (crfNo:string) => {
		console.log(locations.state, 'stateCheck')
		try {
			const response = await ecrfApi.copyCrf(crfNo);
			if (response.result && response.code === 200) {				
				const eCrf = response.content;
				setCrfDetail(eCrf);	
			} 
		} catch (error) {
			console.error('Failed to fetch eCRF:', error);	
			confirm({
				description: 'Failed to fetch eCRF',
				variant: 'info'
			})
			.then(() => { 
				navigate('/e-crf');
			});
		}
	}

	const setCrfDetail = (eCrf:ECrfDetail) => {
		setTitle(eCrf.crf_title);
		setDesc(eCrf.crf_description);
		if(eCrf.crf_form_json) {
			const detail = eCrf.crf_form_json;
			if('itemType' in detail[0] && detail[0].itemType === 'File Input') {
				setExistFileSet(detail[0]);
			}

			//setECrfJson();
		}
		
	}
	

	const handlePostCrf = async (crf: CRFFormJson[]) => {
		const crfToJson = crf;

		const resp = await ecrfApi.postNewCRF({
			crf_title: title,
			crf_description: desc,
			crf_form_json : crfToJson
		});
		if(resp.code == 200) {
			void confirm({
				description: 'CRF가 저장되었습니다.'
			});

			return;
		}
	}

	const handleSaveCrf = (crf: CRFFormJson[]) => {
		void handlePostCrf(crf);
	}

	return (	
		<>
			<Grid container mb={1} spacing={1}>
				{/* <Grid item xs={2}>
					<Typography variant="h3" gutterBottom>
						eCRF Builder
					</Typography>
				</Grid> */}
				<Grid item xs={5}>
					<Box sx={{p: '1rem', background:'#fff', border: '1px solid #ddd', borderRadius:'5px'}}>
						<OutlinedInput size='small' placeholder='CRF Title' fullWidth sx={{mb: '0.5rem'}} value={title} onChange={(e) => setTitle(e.target.value)}/>
						<OutlinedInput size='small' placeholder='CRF Description' fullWidth value={desc} onChange={(e) => setDesc(e.target.value)}/>
					</Box>
				</Grid>
				<Grid item xs={4}>
					
				</Grid>
			</Grid>
			
			<ECrfBuilder saveCRF={(crf)=>handleSaveCrf(crf)} eCrfJson={eCrfJson} existFileSet={existFileSet ? existFileSet : null}/>
			
		</>	
		
	)
}

export default ECrf;