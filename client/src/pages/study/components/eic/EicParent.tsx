import CreateEic from './CreateEic';
import UploadBasePdf from './UploadBasePdf';

type Props = {
    isUploadBasePdfOpen: boolean;
    handleCloseUploadBasePdf: () => void;
    handleConfirm: (file: File) => void;
    isCreateEicOpen: boolean;
    handleCloseCreateEic: () => void;
    basePdfFile: File | null;
    handleEicFile: (file: File) => void;
};

const EicParent: React.FC<Props> = ({
    isUploadBasePdfOpen,
    handleCloseUploadBasePdf,
    handleConfirm,
    isCreateEicOpen,
    handleCloseCreateEic,
    basePdfFile,
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
                basePdfFile={basePdfFile}
            />
        </>
    );
};

export default EicParent;
