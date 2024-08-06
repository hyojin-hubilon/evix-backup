import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

interface SurveyDeleteDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const SurveyDeleteDialog = ({ isOpen, handleClose, handleConfirm }: SurveyDeleteDialogProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" variant="h5">
                {'Survey 삭제'}
            </DialogTitle>
            <DialogContent>
                <Box minWidth="300px">
                    <Typography id="study-action-dialog-description">
                        Survey를 삭제 하시겠습니까?
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="contained" color="error" onClick={handleConfirm} autoFocus>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SurveyDeleteDialog;
