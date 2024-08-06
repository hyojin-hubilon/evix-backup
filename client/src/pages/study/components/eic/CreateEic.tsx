import React from 'react';
import { Dialog } from '@mui/material';
import DesignerView from '@/components/eic/DesignerView';

type CreateEicProps = {
    open: boolean;
    onClose: () => void;
};
const CreateEic: React.FC<CreateEicProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
        >
            <DesignerView />
        </Dialog>
    );
};

export default CreateEic;
