import { GoogleLoginReqBody, LoginReponse, LoginReqBody } from '@/types/auth';
import { api } from '@utils/axios';

export async function postLogin({email, password} : LoginReqBody) {
	try {
		const res = await api<LoginReponse>('/auth/login', 'post', { email: email, password: password});
		console.log(res);
		return res;
	} catch(e:any) {
		throw new Error(e);
	}
}

export async function postGoogleLogin({email, sub} : GoogleLoginReqBody) {
	try {
		const res = await api<LoginReponse>('/auth/social_login', 'post', { email: email, sub: sub});
		console.log(res);
		return res;
	} catch(e:any) {
		throw new Error(e);
	}
}