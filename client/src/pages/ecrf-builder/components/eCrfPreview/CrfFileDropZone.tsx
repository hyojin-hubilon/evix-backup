import { Box, IconButton, styled, Typography } from '@mui/material';
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

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
}
const CrfFileDropzone = ({changefiles} : CrfFileDropzoneType) => {
	const [myFile, setMyFile] = useState<File | null>(null)

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
	
	return (
		<StyledDropzone>
			{
				myFile !== null ? 
				<Box display="flex" alignItems="center">
					<Typography maxWidth="250px" sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{myFile.name}</Typography>
					<IconButton onClick={removeFile}><HighlightOffIcon /></IconButton>
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