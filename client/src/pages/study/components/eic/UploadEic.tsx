import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from 'react-dropzone';

type UploadDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: (file: File) => void;
};

const accept = {
    'application/json': ['.json'],
};

const UploadEic: React.FC<UploadDialogProps> = ({ open, onClose, onConfirm }) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const {
        getRootProps,
        getInputProps,
        open: openFileDialog,
    } = useDropzone({
        onDrop,
        accept: accept,
        maxSize: 5 * 1024 * 1024, // 5MB
        noClick: true,
    });

    const handleConfirm = () => {
        if (selectedFile) {
            onConfirm(selectedFile);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    height: '120vh',
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: 18 }}>
                Register electronic consent form
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ fontWeight: 'light', fontSize: 14 }}>
                    Upload the electronic consent form in PDF file format to apply functions such as
                    consent and signature.
                </Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: '3px dashed #CBD0DC',
                        borderRadius: '26px',
                        padding: '60px',
                        textAlign: 'center',
                        marginTop: '15%',
                        position: 'relative',
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUploadIcon sx={{ fontSize: 50 }} />
                    <Typography>
                        {selectedFile ? selectedFile.name : 'Choose a file or drag & drop it here'}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Please upload the (.json) file
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={openFileDialog}
                        sx={{
                            marginTop: '10px',
                            borderColor: '#4A3AFF',
                            color: '#4A3AFF',
                            '&:hover': {
                                borderColor: '#303f9f',
                                color: '#303f9f',
                            },
                        }}
                    >
                        Browse File
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ width: '50%', height: '40px', color: '#344054', borderColor: '#D0D5DD' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    disabled={!selectedFile}
                    sx={{ width: '50%', height: '40px' }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadEic;
