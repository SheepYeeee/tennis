import request from '../../utils/request';

// 登入
export const login = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/login',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 註冊
export const register = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/register',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 驗證信箱
export const verifyEmail = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `anonymous/verifyEmail/checkEmail?token=${localStorage.getItem('token')}`,
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 忘記密碼(寄信)
export const forgetPassword = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/forgetPassword',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 重設密碼
export const updatePassword = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `anonymous/updatePassword/${payload.hash}`,
			data: payload.data
		});
		return data;
	} catch (e){
		return e;
	}
};

// 臉書登入
export const fbLogin = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/facebook',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// google登入
export const googleLogin = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/google',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// apple登入
export const appleLogin = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'anonymous/apple',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};
