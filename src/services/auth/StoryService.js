import request from '../../utils/request';

// 取得story所有標籤
export const storyAllTag = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'story/storyAllTag'
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 新增story
export const create = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'story/create',
			data: payload
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 刪除story
export const delStory = async (payload) => {
	try {
		const { data } = await request({
			method: 'delete',
			url: `story/${payload}/delete`
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 按讚story
export const likeStroy = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `story/${payload}/like`,
			data: payload
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// story傳訊
export const storySendMessage = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `story/${payload.storyId}/sendMessage`,
			data: payload.data
		});
		return data;
	} catch (e){
        
		return e;
	}
};

