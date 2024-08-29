import userApi from "@/apis/user";
import { MyProfile } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfileContextType {
    userProfile: MyProfile | null;
	setUserProfile: React.Dispatch<React.SetStateAction<MyProfile | null>>;
}

export const UserProfileContext = createContext({} as UserProfileContextType);

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileContextProvider = ({ children }) => {
    const [ userProfile, setUserProfile ] = useState<MyProfile | null>(null);
	const value = { userProfile, setUserProfile };

	const getMyProfile = async () => {
		const response = await userApi.getMyProfile();
		if (response.code === 200) {
			setUserProfile(response.content);
		}
    };

	useEffect(() => {
		if(!userProfile) {
			getMyProfile();
		}
	}, [userProfile]);
	
	return <UserProfileContext.Provider value={value}>{ children }</UserProfileContext.Provider>;
};

