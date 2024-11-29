import EditViewer from '@/components/eic/EditViewer';
import { StudyDetail } from '@/types/study';
import { Dialog } from '@mui/material';


interface EditEicProps {
    open: boolean;
    onClose: () => void;
    eicFile: any;
    studyDetail: StudyDetail;
    fetchStudyDetail: () => void;
}

const EditEic = ({ open, onClose, eicFile, studyDetail, fetchStudyDetail }: EditEicProps) => {
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
                <EditViewer eicFile={eicFile} onClose={onClose} studyDetail={studyDetail} fetchStudyDetail={fetchStudyDetail}/>
            </Dialog>
        </>
    );
};

export default EditEic;
