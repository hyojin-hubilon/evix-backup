import { useEffect, useState } from 'react';
import SettingsMain from './components/SettingsMain';
import userApi from '@/apis/user';
import { ResCommonError } from '@/apis/axios-common';
import { MyProfile } from '@/types/user';
import SettingLoginForm from './components/SettingLoginForm';
import { useConfirmation } from '@/context/ConfirmDialogContext';

// TODO : 초대받은 study 목록, 업데이트 시 (privilege, language) 추가하기
const Settings = () => {
    const [loginIsSuccess, setLoginIsSucess] = useState<boolean>(false);
    const [myProfile, setMyProfile] = useState<MyProfile>({
        user_no: 0,
        email: '',
        first_name: '',
        last_name: '',
        mobile: '',
        company_name: '',
        job_title: '',
        industry: '',
        country: '',
        privilege: '',
        profile_image_url: '',
        profile_image_name: '',
        profile_image_origin_name: '',
        created_at: '',
        updated_user_no: 0,
        updated_at: '',
        last_login: '',
        active_yn: '',
        delete_yn: '',
        language: '',
        email_notification_yn: '',
        unauthorized_number: 0,
        study_number: 0,
        survey_number: 0,
    });

	const confirm = useConfirmation();

    const handleSuccessLogin = (status: boolean) => {
        setLoginIsSucess(status);
    };

    useEffect(() => {
		const getMyProfile = async () => {
            try {
                const { content } = await userApi.getMyProfile();
                if (content) {
                    setMyProfile(content);
                }
            } catch (error) {
                if (error instanceof ResCommonError) {
                    alert(error.message);
                }
            }
        };
        getMyProfile();
    }, []);

    return (
        <>
            {!loginIsSuccess ? (
                <SettingLoginForm myProfile={myProfile} handleLogin={handleSuccessLogin} />
            ) : (
                <SettingsMain myProfile={myProfile} />
            )}
        </>
    );
};
export default Settings;
