import { Box, Container, Grid, OutlinedInput, Typography } from '@mui/material';
import ECrfBuilder from './components/ECrfBuilder';
import { useState } from 'react';
import ecrfApi from '@/apis/ecrf';
import { useConfirmation } from '@/context/ConfirmDialogContext';

const ECrf = () => {
	const [title, setTitle] = useState<string>('');
	const [desc, setDesc] = useState<string>('');

	const confirm = useConfirmation();

	const handlePostCrf = async (crf) => {

		const crfToJson = JSON.stringify(crf)

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

	const handleSaveCrf = (crf) => {
		void handlePostCrf(crf);
	}

	return (	
		<>
			<Grid container mb={1} spacing={1}>
				<Grid item xs={2}>
					<Typography variant="h3" gutterBottom>
						eCRF Builder
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Box sx={{p: '1rem', background:'#fff', border: '1px solid #ddd', borderRadius:'5px'}}>
						<OutlinedInput size='small' placeholder='CRF Title' fullWidth sx={{mb: '0.5rem'}} value={title} onChange={(e) => setTitle(e.target.value)}/>
						<OutlinedInput size='small' placeholder='CRF Description' fullWidth value={desc} onChange={(e) => setDesc(e.target.value)}/>
					</Box>
				</Grid>
				<Grid item xs={4}>
					
				</Grid>
			</Grid>
			
			<ECrfBuilder saveCRF={(crf)=>handleSaveCrf(crf)} />
			
		</>	
		
	)
}

export default ECrf;