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

type InviteConfirmDialogProps = {
    emails: string[];
    open: boolean;
    handleClose: () => void;
};
const InviteConfirmDialog = ({ emails, open, handleClose }: InviteConfirmDialogProps) => {
    const theme = useTheme();
    const { primary } = theme.palette;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="invited-dialog-title"
            aria-describedby="invited-dialog-description"
            maxWidth="xs"
        >
            <DialogTitle id="invited-dialog-title" variant="h5">
                초대메일 발송 완료
            </DialogTitle>
            <DialogContent>
                <Box minWidth="300px">
                    <Typography id="alert-dialog-description">
                        <span style={{ color: primary.main }}>{emails.join(', ')}</span> 로
                        초대메일이 발송되었습니다.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InviteConfirmDialog;
