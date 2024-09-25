
import { t } from "i18next";
import Introduction from "./components/Introduction";
import onboardingImg01 from '@assets/images/onboarding/01.jpg';
import onboardingImg02 from '@assets/images/onboarding/02.jpg';
import onboardingImg03 from '@assets/images/onboarding/03.jpg';
import onboardingImg04 from '@assets/images/onboarding/04.jpg';
import onboardingImg05 from '@assets/images/onboarding/05.jpg';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import userApi from "@/apis/user";
import i18n from "@/i18n";
import { useNavigate } from "react-router-dom";

export type OnboardingContentsType = {
	title: string;
	sub: string[];
	imgUrl:string;
}

const Onboarding = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const navigate = useNavigate();
	const onboardingContents: OnboardingContentsType[] = [
		{
			title: t('onboarding.welcome_to_evix-dct'),
			sub: [
				t('onboarding.create_study'),
				t('onboarding.open_study')
			],
			imgUrl: onboardingImg01
		},
		{
			title: t('onboarding.create_surveys'),
			sub: [
				t('onboarding.we_provide_survey'),
				t('onboarding.we_provide_tools'),
				t('onboarding.see_patient_engagement'),
				t('onboarding.the_collected_data'),
			],
			imgUrl: onboardingImg02
		},
		{
			title: t('onboarding.increase_engagement'),
			sub: [
				t('onboarding.surveys_that_require'),
				t('onboarding.notifications_will_be_sent'),
				t('onboarding.participants_participate'),
			],
			imgUrl: onboardingImg03
		},
		{
			title: t('onboarding.invite_administrators'),
			sub: [
				t('onboarding.invite_managers'),
				t('onboarding.provides_effective')
			],
			imgUrl: onboardingImg04
		},
		{
			title: t('onboarding.provides_real-time'),
			sub: [
				t('onboarding.check_the_status'),
				t('onboarding.real-time_statistics')
			],
			imgUrl: onboardingImg05
		}
	]
	const handleClickNext = () => {
		setActiveIndex(activeIndex+1)
	}

	const handleSkipOrClose = () => {
		navigate('/dashboard')
	}

	const getUserSetting = async () => {
		const response = await userApi.getMyProfile();
		if (response.code === 200) {
			const user = response.content;
			const lang = user.language === 'KO_KR' ? 'ko' : 'en';
			i18n.changeLanguage(lang);
		}
	}

	useEffect(() => {
		getUserSetting();
	}, [])

	return (
		<Box sx={{position: 'fixed',
			left:0,
			top:0,
			width: '100vw',
			height: '100vh',
			zIndex: 1200
		}}>
			{
				onboardingContents.map((contents, index) => 
					<Box 
						key={index}
						sx={{
							position: 'fixed',
							opacity: activeIndex == index ? 1 : 0,
							transition: 'opacity 0.5s',
							zIndex: 12000
						}}>
						<Introduction
							contents={contents}
							next={handleClickNext}
							activeIndex={activeIndex}
							contentsLength={onboardingContents.length}
							skip={handleSkipOrClose}
							/>
					</Box>
					
				)
			}
		</Box>
		
	)
}

export default Onboarding;