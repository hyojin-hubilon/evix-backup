import { ResCommonError } from '@/apis/axios-common';
import userApi from '@/apis/user';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';

type Props = {
    imageUrl: string;
    handleImageUrl: (url: string) => void;
};
const ProfileImage: React.FC<Props> = ({ imageUrl, handleImageUrl }) => {
	const confirm = useConfirmation();
    const handleUploadProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | undefined = event.target.files?.[0];
        if (!selectedFile) {
            return;
        }
        const formData = new FormData();
        formData.append('image_file', selectedFile);

        try {
            const { content } = await userApi.uploadProfileImage(formData);
            if (content) {
				confirm({description : '프로필 사진이 변경되었습니다.', variant : 'info'});   
                handleImageUrl(content);
            }
        } catch (error) {
            if (error instanceof ResCommonError) {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#bdbdbd',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button"
                type="file"
                onChange={handleUploadProfileImage}
            />
            <label htmlFor="upload-button">
                <Button variant="outlined" color="primary" component="span">
                    사진 변경
                </Button>
            </label>
        </>
    );
};

export default ProfileImage;
