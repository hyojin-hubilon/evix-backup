import { Box, IconButton, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { AttachmentList } from '@/types/eCrfInput';
import eCrfInputApi from '@/apis/eCrfInput';

const StyledDropzone = styled('div')`
	display: flex;
	flex: 1;
	border: 1px dashed #ddd;
	padding: 10px;

	border-radius: 8px;
	min-height: 80px;
`;

type CrfFileDropzoneType = {
	changefiles: (files: File | null) => void;
	attchedFile: AttachmentList | null;
	changeExistfile: (attachedFile: AttachmentList | null) => void;
}
const CrfFileDropzone = ({changefiles, attchedFile, changeExistfile} : CrfFileDropzoneType) => {
	const [myFile, setMyFile] = useState<File | null>(null);
	const [existFile, setExistFile] = useState<AttachmentList | null>(attchedFile ? attchedFile : null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles);
		changefiles(acceptedFiles[0]);
		setMyFile(acceptedFiles[0])
	}, [myFile])

	const {getRootProps, getInputProps} = useDropzone({
		onDrop, 
		maxSize: 5242880, 
		accept: {
			'image/png': [],
			'image/jpg': [],
			'image/jpeg': [],
			'application/pdf': []
		},
		multiple: false,
		noDrag: true,
	});

	
	const removeFile = () => {
		setMyFile(null);
		changefiles(null);
	}

	const removeAttchedFile = async (file_no:number) => {
		const resp = await eCrfInputApi.deleteECrfInputFile(file_no);
		if(resp.result) {
			setExistFile(null);
			changeExistfile(null);
		}
	}

	return (
		<StyledDropzone>
			{
				(myFile !== null || existFile !== null) ? 
				<Box display="flex" alignItems="center">
					{
						myFile && <>
							<Typography maxWidth="250px" sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
								{myFile.name}
							</Typography>
							<IconButton onClick={removeFile}><HighlightOffIcon /></IconButton>
						</>
					}
					{
						existFile && <>
							<Typography maxWidth="250px" sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
								{existFile.attachment_file_name}
							</Typography>
							<IconButton onClick={() => removeAttchedFile(existFile.case_report_form_input_attachment_file_no)}><HighlightOffIcon /></IconButton>
						</>
					}
					
					
				</Box>
				:
				<Box {...getRootProps()} width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{cursor: 'pointer'}}>
					<input {...getInputProps()} />
					<Box textAlign="center">
					<FileUploadOutlinedIcon  />
					<Typography variant="body1">						
						Click to select file
					</Typography>
					</Box>
				</Box>
				
			}
		</StyledDropzone>
	)
}

export default CrfFileDropzone;