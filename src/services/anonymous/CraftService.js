import request from '../../utils/request';

// 取得所有類別
export const types = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'craft/types'
		});
		return data;
	} catch (e){
		return e;
	}
};

// 取得單一專案
export const craft = async (payload) => {
	try {
		const { data } = await request({
			method: 'get',
			url: `craft/${payload}`
		});
		return data;
	} catch (e){
		return e;
	}
};

// 新增觀看次數
export const view = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `craft/view/${payload}`
		});
		return data;
	} catch (e){
		return e;
	}
};
