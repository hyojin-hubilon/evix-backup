import EditViewer from '@/components/eic/EditViewer';
import { Dialog } from '@mui/material';

interface StudyDetail {
    std_no: number;
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    disease: string;
    target_number: number;
    drug_code: string;
    drug_brand_name: string;
    drug_manufacturer_name: string;
}

interface EditEicProps {
    open: boolean;
    onClose: () => void;
    eicFile: any;
    studyDetail: StudyDetail;
}

const EditEic = ({ open, onClose, eicFile, studyDetail }: EditEicProps) => {
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
                <EditViewer eicFile={eicFile} onClose={onClose} studyDetail={studyDetail} />
            </Dialog>
        </>
    );
};

export default EditEic;
