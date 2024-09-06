import studyApi from '@/apis/study';
import { MemberTempType } from '@/types/study';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type DeleteConfirmDialogProps = {
    member: MemberTempType;
    open: boolean;
    handleClose: () => void;
    studyNo: number;
    onDeleteSuccess: () => void; // 추가된 prop
};

const DeleteConfirmDialog = ({
    member,
    open,
    handleClose,
    studyNo,
    onDeleteSuccess,
}: DeleteConfirmDialogProps) => {
    const [mode, setMode] = useState<'delete' | 'confirmed'>('delete');
	const { t, i18n } = useTranslation();
	console.log(i18n)

    const handleConfirmDelete = async () => {
        setMode('confirmed');
        try {
            await studyApi.deleteStudyMember(studyNo, member.user_no);
            onDeleteSuccess(); // 부모 컴포넌트의 상태를 갱신
        } catch (error) {
            console.error('Failed to delete member:', error);
        }
    };

    useEffect(() => {
        if (!open) {
            setMode('delete'); // 다이얼로그가 닫힐 때 모드 초기화
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="member-delete-dialog-title"
            aria-describedby="member-delete-dialog-description"
            maxWidth="xs"
        >
            <DialogTitle id="member-delete-dialog-title" variant="h5">
				{t('study.delete_member')}
                {/* 멤버 삭제 */}
            </DialogTitle>
            <DialogContent>
                <Box minWidth="300px">
                    <Typography id="member-delete-dialog-description">
                        {mode === 'delete' ? (
                            <>
							{
								i18n.language === 'en' ? 
								<>
									{t('study.do_you_want_remove_01')}
									<b>
										{member.first_name} {member.last_name}
									</b>
									{t('study.do_you_want_remove_02')}
									</>
								:
								<>
									<b>
										{member.first_name} {member.last_name}
									</b>
									{t('study.do_you_want_remove_member')}
								</>
							}
                                
                            </>
                        ) : (
                            <>
                                <b>
                                    {member.first_name} {member.last_name}
                                </b>
                                {t('study.has_been_removed')}
                            </>
                        )}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                {mode === 'delete' ? (
                    <>
                        <Button variant="outlined" onClick={handleClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                            {t('common.confirm')}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="contained" color="primary" onClick={handleClose}>
						{t('common.confirm')}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
