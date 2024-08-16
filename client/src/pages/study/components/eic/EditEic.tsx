import EditViewer from '@/components/eic/EditViewer';
import { Dialog } from '@mui/material';

interface EditEicProps {
    open: boolean;
    onClose: () => void;
    eicFile: any;
}

const EditEic = ({ open, onClose, eicFile }: EditEicProps) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="lg"
                sx={{ padding: '0 !important' }}
                scroll="body"
            >
                <EditViewer eicFile={eicFile} onClose={onClose}/>
            </Dialog>
        </>
    );
};

export default EditEic;
