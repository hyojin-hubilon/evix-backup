import React from 'react';
import { Dialog } from '@mui/material';
import DesignerView from '@/components/eic/DesignerView';

type CreateEicProps = {
    open: boolean;
    onClose: () => void;
    basePdfFile: File | null;
    handleEicFile: (file: File) => void;
};
const CreateEic: React.FC<CreateEicProps> = ({ open, onClose, basePdfFile, handleEicFile }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" sx={{padding:'0 !important'}} scroll='body' aria-hidden="false" aria-modal="true">
            <DesignerView
                basePdfFile={basePdfFile}
                handleEicFile={handleEicFile}
                onClose={onClose}
            />
        </Dialog>
    );
};

export default CreateEic;
