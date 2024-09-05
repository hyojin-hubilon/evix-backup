import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { t } from 'i18next';

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
                {t('study.delete_survey')}
            </DialogTitle>
            <DialogContent>
                <Box minWidth="300px">
                    <Typography id="study-action-dialog-description">
						{t('study.are_you_sure_delete')}
                        {/* Survey를 삭제 하시겠습니까? */}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    {t('common.cancel')}
                </Button>
                <Button variant="contained" color="error" onClick={handleConfirm} autoFocus>
					{t('common.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SurveyDeleteDialog;
