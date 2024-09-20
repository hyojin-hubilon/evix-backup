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
import { actionMessages, actionMessagesEn, actionMessagesEnPast } from '@/types/study';
import { useTranslation } from 'react-i18next';

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
	const { t, i18n } = useTranslation();

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
		if(i18n.language === 'en') {
			return `It has been. ${actionMessagesEnPast[action]}.`;
		} else {
			return `${actionMessages[action]}되었습니다.`;
		}
        
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
                    { i18n.language == 'en' ? `${actionMessagesEn[action]} ${t('study.study')}` : t('study.study') + actionMessages[action]}
                </DialogTitle>
                <DialogContent>
                    <Box minWidth="300px">
                        <Typography id="study-action-dialog-description">
							{
								i18n.language == 'en' ?  
								<>Would you like to {actionMessagesEn[action].toLowerCase()} your study?</>
								:
								<>
								Study를 {actionMessages[action]}하시겠습니까?
								</>
							}
                            
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
						{t('common.cancel')}
                        {/* 취소 */}
                    </Button>
                    <Button
                        variant="contained"
                        color={action === 'delete' ? 'error' : 'primary'}
                        onClick={handleConfirmAction}
                    >
						{t('common.confirm')}
                        {/* 확인 */}
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
					{t('study.success')}
                    {/* 성공 */}
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
						{t('common.confirm')}
                        {/* 확인 */}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default StudyDeleteConfirmDialog;
