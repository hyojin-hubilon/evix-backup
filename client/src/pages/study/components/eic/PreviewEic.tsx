import Previewer from '@/components/eic/PreViewer';
import { Dialog } from '@mui/material';

interface PreviewEicProps {
    open: boolean;
    onClose: () => void;
    eicFile: any;
}

const PreviewEic = ({ open, onClose, eicFile }: PreviewEicProps) => {
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
                <Previewer eicFile={eicFile} onClose={onClose}/>
            </Dialog>
        </>
    );
};

export default PreviewEic;
