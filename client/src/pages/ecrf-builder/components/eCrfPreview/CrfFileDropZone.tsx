import { styled, Typography } from '@mui/material';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const StyledDropzone = styled('div')`
	display: block;
	border: 1px dashed #ddd;
	padding: 10px;
`;

type CrfFileDropzoneType = {
	changefiles: (files: File[]) => void;
}
const CrfFileDropzone = ({changefiles} : CrfFileDropzoneType) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles);
		changefiles(acceptedFiles);
	}, [])
	const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
		onDrop, 
		maxFiles: 3, 
		maxSize: 5242880, 
		accept: {
			'image/png': [],
			'image/jpg': [],
			'image/jpeg': [],
			'application/pdf': []
		},
		multiple: true,
	});

	const files = acceptedFiles.map(file => (
		<li key={file.name}>
		{file.name} - {file.size} bytes
		</li>
	));

	return (
		<StyledDropzone {...getRootProps()}>
			<input {...getInputProps()} />
			<Typography variant="body1">
				
				Drag &apos;n&apos; drop some files here, or click to select files.
				{/* 업로드 할 파일을 첨부하세요. (5mb이하의 jpg, jpeg, png, pdf 파일) - 최대 3개 첨부가능 */}

				<ul>{files}</ul>
			</Typography>
		</StyledDropzone>
	)
}

export default CrfFileDropzone;