import { MemberTempType } from '@/types/study';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type InviteConfirmDialogProps = {
    emails: string[];
    open: boolean;
    handleClose: () => void;
};
const InviteConfirmDialog = ({ emails, open, handleClose }: InviteConfirmDialogProps) => {
    const theme = useTheme();
    const { primary } = theme.palette;
	const { t, i18n} =  useTranslation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="invited-dialog-title"
            aria-describedby="invited-dialog-description"
            maxWidth="xs"
        >
            <DialogTitle id="invited-dialog-title" variant="h5">
				{t('study.invitation_email_sent')}
                {/* 초대메일 발송 완료 */}
            </DialogTitle>
            <DialogContent>
                <Box minWidth="300px">
                    <Typography id="alert-dialog-description">
						{
							i18n.language == 'en' ? <>
								An invitation email has been sent to <span style={{ color: primary.main }}>{emails.join(', ')}</span>
							</>
							:
							<>
								<span style={{ color: primary.main }}>{emails.join(', ')}</span> 로
								초대메일이 발송되었습니다.
							</>

						}
                        
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    {t('common.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InviteConfirmDialog;
