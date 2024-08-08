import CreateEic from './CreateEic';
import UploadBasePdf from './UploadBasePdf';

type Props = {
    isUploadBasePdfOpen: boolean;
    handleCloseUploadBasePdf: () => void;
    handleConfirm: (file: File) => void;
    isCreateEicOpen: boolean;
    handleCloseCreateEic: () => void;
    basePdf: File | null;
    handleEicFile: (file: File) => void;
};

const EicParent: React.FC<Props> = ({
    isUploadBasePdfOpen,
    handleCloseUploadBasePdf,
    handleConfirm,
    isCreateEicOpen,
    handleCloseCreateEic,
    basePdf,
    handleEicFile,
}) => {
    return (
        <>
            <UploadBasePdf
                open={isUploadBasePdfOpen}
                onClose={handleCloseUploadBasePdf}
                onConfirm={handleConfirm}
            />
            <CreateEic
                open={isCreateEicOpen}
                onClose={handleCloseCreateEic}
                handleEicFile={handleEicFile}
                basePdf={basePdf}
            />
        </>
    );
};

export default EicParent;
