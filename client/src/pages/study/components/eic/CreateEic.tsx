import React from 'react';
import { Dialog } from '@mui/material';
import DesignerView from '@/components/eic/DesignerView';

type CreateEicProps = {
    open: boolean;
    onClose: () => void;
    basePdf: File | null;
    handleEicFile: (file: File) => void;
};
const CreateEic: React.FC<CreateEicProps> = ({ open, onClose, basePdf, handleEicFile }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DesignerView uploadBasePdf={basePdf} handleEicFile={handleEicFile} onClose={onClose}/>
        </Dialog>
    );
};

export default CreateEic;
