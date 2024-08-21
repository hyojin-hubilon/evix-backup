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
		// confirm({
		// 	title: '제목을 길게 적어보자 12345',
		// 	description: '설명을 길게 적어보자 블라블라 본인확인을 위해 비밀번호를 입력해주세요. 더 길게 적으면 어디까지 늘어가는가?',
		// 	variant: 'danger'
		// }).then(() => {

		// });
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
