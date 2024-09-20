import userApi from "@/apis/user";
import { MyProfile } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface UserProfileContextType {
    userProfile: MyProfile | null;
	setUserProfile: React.Dispatch<React.SetStateAction<MyProfile | null>>;
}

export const UserProfileContext = createContext({} as UserProfileContextType);

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileContextProvider = ({ children }) => {
    const [ userProfile, setUserProfile ] = useState<MyProfile | null>(null);
	const value = { userProfile, setUserProfile };
	const { i18n } = useTranslation();

	const getMyProfile = async () => {
		const response = await userApi.getMyProfile();
		if (response.code === 200) {
			const user = response.content;

			setUserProfile(user);
			const lang = user.language === 'KO_KR' ? 'ko' : 'en';
			i18n.changeLanguage(lang);
		}
    };

	useEffect(() => {
		if(!userProfile) {
			getMyProfile();
		}
	}, [userProfile]);
	
	return <UserProfileContext.Provider value={value}>{ children }</UserProfileContext.Provider>;
};

