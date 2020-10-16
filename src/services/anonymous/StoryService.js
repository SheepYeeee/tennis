import request from '../../utils/request';

// 取得首頁story部分資訊
export const storyIndex = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'anonymousStory/storyIndex'
		});
		return data;
	} catch (e){
		return e;
	}
};

// 取得story資訊
export const getStorys = async (payload) => {
	try {
		const { data } = await request({
			method: 'get',
			url: `anonymousStory?${payload.type}=${payload.id}`
		});
		return data;
	} catch (e){
		return e;
	}
};

// 取得單一story
export const anonymousStory = async (payload) => {
	try {
		const { data } = await request({
			method: 'get',
			url: `anonymousStory/${payload}`
		});
		return data;
	} catch (e){
		return e;
	}
};

