import request from '../../utils/request';

// 取得會員資訊
export const memberInfo = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'member/memberInfo'
		});
		return data;
	} catch (e){
		return e;
	}
};

// 設定偏好設定
export const interestedType = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'member/interestedType',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 設定偏好設定
export const interestedType_PUT = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: 'member/interestedType',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 關注創作家
export const follow = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `member/follow/${payload}`
		});
		return data;
	} catch (e){
		return e;
	}
};

