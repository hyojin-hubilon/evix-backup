import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import studyApi from '@/apis/study';
import { actionMessages } from '@/types/study';

type ActionType = 'delete' | 'pause' | 'done' | 'progression';

type StudyDeleteConfirmDialogProps = {
    open: boolean;
    handleClose: () => void;
    studyNo: number;
    onDeleteSuccess: () => void;
    action?: ActionType;
};

const StudyDeleteConfirmDialog = ({
    open,
    handleClose,
    studyNo,
    onDeleteSuccess,
    action = 'delete',
}: StudyDeleteConfirmDialogProps) => {
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleConfirmAction = async () => {
        try {
            if (action === 'delete') {
                await studyApi.deleteStudy({ std_no: studyNo });
            } else {
                await studyApi.updateStudyStatus({
                    std_no: studyNo,
                    std_status: `STD-${action.toUpperCase()}`,
                });
            }
            setSuccessDialogOpen(true);
        } catch (error) {
            console.error(`Failed to ${action} study:`, error);
        }
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
        handleClose();
        onDeleteSuccess();
    };

    const getSuccessMessage = () => {
        return `${actionMessages[action]}되었습니다.`;
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="study-action-dialog-title"
                aria-describedby="study-action-dialog-description"
                maxWidth="xs"
            >
                <DialogTitle id="study-action-dialog-title" variant="h5">
                    스터디 {actionMessages[action]}
                </DialogTitle>
                <DialogContent>
                    <Box minWidth="300px">
                        <Typography id="study-action-dialog-description">
                            Study를 {actionMessages[action]}하시겠습니까?
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        취소
                    </Button>
                    <Button
                        variant="contained"
                        color={action === 'delete' ? 'error' : 'primary'}
                        onClick={handleConfirmAction}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={successDialogOpen}
                onClose={handleSuccessDialogClose}
                aria-labelledby="study-success-dialog-title"
                aria-describedby="study-success-dialog-description"
                maxWidth="xs"
            >
                <DialogTitle id="study-success-dialog-title" variant="h5">
                    성공
                </DialogTitle>
                <DialogContent>
                    <Box minWidth="300px">
                        <Typography id="study-success-dialog-description">
                            {getSuccessMessage()}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleSuccessDialogClose}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default StudyDeleteConfirmDialog;
