import { Box, Button, Typography } from "@mui/material";
import { FileInputBox, MainBox, VisuallyHiddenInput } from "./styles";

import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { ItemType } from "@/types/ecrf";

type AddFileInputType = {
	fileInput: ItemType,
	fileAddShow: (show:boolean) => void,
	editFileInput: () => void
}

const AddFileInput = ({fileInput, fileAddShow, editFileInput}:AddFileInputType) => {
	return (
		<MainBox sx={{mb: '0.5rem', p: '1rem'}}>
			<Box>
				<Box display="flex" alignItems="center" justifyContent="space-between" mb="0.5rem">
					<Typography variant="h5">File Input Area</Typography>
					<Box>
					<Button size="small" sx={{minWidth: '30px'}} color="secondary" onClick={() => fileAddShow(false)}>
						<DeleteIcon sx={{fontSize: '1.2rem'}}/>
					</Button>

					<Button size="small"  sx={{minWidth: '30px'}} color="secondary" onClick={() => editFileInput()}>
						<EditIcon sx={{fontSize: '1.2rem'}}/>
					</Button>
					</Box>
				</Box>
				
				<FileInputBox>
					<Box>
						<Box display="flex" mb={1}>
							<Typography variant="h5">{fileInput.content.title}</Typography>
							{ fileInput.content.required && <Typography sx={{fontSize: '0.7rem', color:'red'}}>* Required</Typography>}
						</Box>
						
						{
							fileInput.content.description && <Typography>{fileInput.content.description}</Typography>
						}
						<Button
							component="label"
							role={undefined}
							variant="contained"
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
							disabled={true}
						>
							Upload files
							<VisuallyHiddenInput
								type="file"
								onChange={(event) => console.log(event.target.files)}
								multiple
							/>
						</Button>
					</Box>
				</FileInputBox>
			</Box>
		</MainBox>
	);
}

export default AddFileInput;