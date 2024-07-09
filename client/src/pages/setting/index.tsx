import { useEffect, useState } from 'react';
import SettingForm from './components/SettingForm';
import SettingsMain from './components/SettingsMain';
import userApi from '@/apis/user';
import { ResCommonError } from '@/apis/axios-common';
import { MyProfile } from '@/types/auth';

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
    });
    const handleSuccessLogin = (status: boolean) => {
        setLoginIsSucess(status);
    };

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const responseData = await userApi.getMyProfile();
                setMyProfile(responseData.content);
                console.log(responseData.content);
            } catch (error) {
                alert((error as ResCommonError).message);
            }
        };
        getMyProfile();
    }, []);

    return (
        <>
            {!loginIsSuccess ? (
                <SettingForm myProfile={myProfile} handleLogin={handleSuccessLogin}/>
            ) : (
                <SettingsMain myProfile={myProfile} />
            )}
        </>
    );
};
export default Settings;
